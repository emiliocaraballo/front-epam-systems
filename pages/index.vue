<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

import { onMounted, ref } from "vue"
import { useBookStore } from "@/stores/books"
import { useRouter } from "vue-router"
import { useAuthStore } from '../stores/auth'
import Swal from 'sweetalert2'


const authStore = useAuthStore()
const bookStore = useBookStore()
const query = ref("")
const router = useRouter()

async function handleSearch() {
  if (!query.value.trim()) return
  await bookStore.searchBooks(query.value)
  await bookStore.getRecentSearches()
}
async function deleteSearch(searchTerm: string) {
  await bookStore.deleteSearch(searchTerm)
  await bookStore.getRecentSearches() 
}

async function goToDetail(book: any) {
  
  if(authStore.isAuthenticated) {
    bookStore.setSelectedBook(book)
    router.push({ path: `/book-detail` })
    
  } else {
    const result = await Swal.fire({
     title: '¿Confirmar acción?',
      text: "Para poder ver los detalles del libro, debes iniciar sesión.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, continuar'
    });

    if (result.isConfirmed) {
      router.push({ path: '/login' })
    }
    
  }
}

function clearRecentSearches() {
  // Implementar lógica para limpiar búsquedas recientes si es necesario
}

onMounted(() => {
  bookStore.getRecentSearches()
})
</script>

<template>
  <div class="search-page">
    <div class="search-container">
      <!-- Header -->
      <div class="header">
        <h1 class="title">Reseñas de Libros</h1>
        <p class="subtitle">Descubre y explora miles de libros</p>
      </div>

      <!-- Buscador -->
      <div class="search-box">
        <div class="search-input-container">
          <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            v-model="query"
            type="text"
            class="search-input"
            placeholder="Escribe el título, autor o género de un libro..."
            @keyup.enter="handleSearch"
          />
          <button class="search-button" @click="handleSearch" :disabled="!query.trim()">
            Buscar
          </button>
        </div>
      </div>

      <!-- Últimas búsquedas -->
      <div v-if="bookStore.recentSearches.length" class="recent-searches-section">
        <div class="section-header">
          <h3>Búsquedas recientes</h3>
          <!-- <button class="clear-button" @click="clearRecentSearches">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 6h18"></path>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
            </svg>
            Limpiar
          </button> -->
        </div>
        <div class="tags-container">
          <span
            v-for="(search, index) in bookStore.recentSearches.slice(0, 8)"
            :key="index"
            class="search-tag"
            @click="query = search; handleSearch()"
          >
            {{ search }}
            <span class="tag-close"  @click.stop="deleteSearch(search)">
              &times;
            </span>
          </span>
        </div>
      </div>

      <!-- Loader -->
      <div v-if="bookStore.loading" class="loading-section">
        <div class="loader"></div>
        <p>Buscando libros...</p>
      </div>

      <!-- Mensaje de error -->
      <div v-if="bookStore.error" class="error-message">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <p>{{ bookStore.error }}</p>
      </div>

      <!-- Resultados -->
      <div v-if="bookStore.searchResults.length" class="results-section">
        <div class="section-header">
          <h3>Resultados de búsqueda</h3>
          <span class="results-count">{{ bookStore.searchResults.length }} libros encontrados</span>
        </div>
        <div class="books-grid">
          <div
            v-for="book in bookStore.searchResults"
            :key="book.openLibraryId"
            class="book-card"
            @click="goToDetail(book)"
          >
            <div class="book-cover">
              <img :src="book.cover || '/img/default-book-cover.svg'" alt="Portada del libro" />
              <div class="book-overlay">
                <span>Ver detalles</span>
              </div>
            </div>
            <div class="book-info">
              <h4 class="book-title">{{ book.title }}</h4>
              <p class="book-author" v-if="book.author">{{ book.author }}</p>
              <p class="book-year" v-if="book.publishYear">{{ book.publishYear }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Estado vacío -->
      <div v-if="!bookStore.loading && !bookStore.searchResults.length && !bookStore.error" class="empty-state">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
        </svg>
        <h3>Comienza a explorar libros</h3>
        <p>Busca por título, autor o género para descubrir nuevos libros.</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "../assets/styles/_variables.scss" as *;


.search-page {
  // min-height: 100vh;
  // background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
  // padding: 2rem 1rem;
  display: flex;
  justify-content: center;
}

.search-container {
  width: 100%;
  max-width: 1200px;
}

.header {
  text-align: center;
  margin-bottom: 2.5rem;
  
  .title {
    font-size: 2.5rem;
    font-weight: 800;
    color: #2d3748;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, $primary-color 0%, color.adjust($primary-color, $lightness: -15%) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .subtitle {
    font-size: 1.1rem;
    color: #718096;
    font-weight: 400;
  }
}

.search-box {
  margin-bottom: 2.5rem;
}

.search-input-container {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 12px;
  padding: 0.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  max-width: 700px;
  margin: 0 auto;
  
  &:focus-within {
    border-color: $primary-color;
    box-shadow: 0 4px 20px rgba(66, 153, 225, 0.2);
  }
}

.search-icon {
  width: 20px;
  height: 20px;
  color: #a0aec0;
  margin: 0 0.75rem;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  padding: 0.85rem 0;
  font-size: 1rem;
  color: #2d3748;
  
  &::placeholder {
    color: #a0aec0;
  }
}

.search-button {
  background: $primary-color;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    background: color.adjust($primary-color, $lightness: -8%);
    transform: translateY(-1px);
  }
  
  &:disabled {
    background: #cbd5e0;
    cursor: not-allowed;
  }
}

.recent-searches-section {
  margin-bottom: 2.5rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  
  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #2d3748;
  }
}

.clear-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #718096;
  font-size: 0.875rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  transition: all 0.2s ease;
  
  &:hover {
    color: #e53e3e;
    background: #fed7d7;
  }
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.search-tag {
  display: inline-flex;
  align-items: center;
  background: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  
  &:hover {
    background: $primary-color;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(66, 153, 225, 0.3);
  }
}

.tag-close {
  margin-left: 0.5rem;
  padding: 0.1rem;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: bold;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
}

.loading-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  color: #718096;
}

.loader {
  width: 40px;
  height: 40px;
  border: 3px solid #e2e8f0;
  border-top: 3px solid $primary-color;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-message {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background: #fed7d7;
  color: #c53030;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  margin: 2rem 0;
}

.results-section {
  margin-top: 2rem;
}

.results-count {
  font-size: 0.875rem;
  color: #718096;
}

.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.book-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.07);
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    
    .book-overlay {
      opacity: 1;
    }
  }
}

.book-cover {
  position: relative;
  height: 250px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
}

.book-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(66, 153, 225, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  span {
    color: white;
    font-weight: 600;
    text-align: center;
    padding: 0.5rem 1rem;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 20px;
  }
}

.book-info {
  padding: 1rem;
  
  .book-title {
    font-size: 1rem;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 0.5rem;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .book-author {
    font-size: 0.875rem;
    color: #718096;
    margin-bottom: 0.25rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .book-year {
    font-size: 0.75rem;
    color: #a0aec0;
  }
}

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: #718096;
  
  svg {
    margin-bottom: 1rem;
    color: #cbd5e0;
  }
  
  h3 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    color: #4a5568;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .header .title {
    font-size: 2rem;
  }
  
  .books-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }
  
  .book-cover {
    height: 200px;
  }
  
  .search-input-container {
    flex-direction: column;
    padding: 0;
    overflow: hidden;
    
    .search-icon {
      display: none;
    }
    
    .search-input {
      padding: 1rem;
      width: 100%;
      border-bottom: 1px solid #e2e8f0;
    }
    
    .search-button {
      width: 100%;
      border-radius: 0;
      padding: 1rem;
    }
  }
}

@media (max-width: 480px) {
  .search-page {
    padding: 1rem 0.5rem;
  }
  
  .header {
    margin-bottom: 2rem;
    
    .title {
      font-size: 1.75rem;
    }
  }
  
  .books-grid {
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  }
  
  .book-cover {
    height: 180px;
  }
}
</style>