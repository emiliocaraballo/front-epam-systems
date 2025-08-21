<template>
  <div class="library-page">
    <!-- Mensaje de éxito -->
    <div v-if="showSuccess" class="success-message">
      <span class="success-icon">✓</span>
      {{ successMessage }}
    </div>

    <div class="container">
      <div class="library-header">
        <div class="header-content">
          <h1><span class="icon">📚</span> Mi Biblioteca</h1>
          <NuxtLink to="/" class="button back-button">
            <span class="button-icon">←</span> Volver al Buscador
          </NuxtLink>
        </div>
      </div>

      <div class="filters-section">
        <h2>Filtrar y ordenar</h2>
        <div class="filters">
          <div class="form-row">
            <div class="form-group">
              <label for="title">Título</label>
              <input
                id="title"
                v-model="filters.title"
                type="text"
                placeholder="Buscar por título"
                @input="applyFilters"
                class="filter-input"
              />
            </div>

            <div class="form-group">
              <label for="author">Autor</label>
              <input
                id="author"
                v-model="filters.author"
                type="text"
                placeholder="Buscar por autor"
                @input="applyFilters"
                class="filter-input"
              />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="rating">Ordenar por Calificación</label>
              <select
                id="rating"
                v-model="filters.sortByRating"
                @change="applyFilters"
                class="filter-select"
              >
                <option value="">Sin orden</option>
                <option value="asc">Menor a Mayor</option>
                <option value="desc">Mayor a Menor</option>
              </select>
            </div>

            <div class="form-group checkbox-group">
              <label class="checkbox-label">
                <input
                  v-model="filters.excludeNoReview"
                  type="checkbox"
                  @change="applyFilters"
                  class="checkbox-input"
                />
                <span class="checkmark"></span>
                Excluir libros sin review
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Estado de carga -->
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Cargando tu biblioteca...</p>
      </div>

      <!-- Mensaje de error -->
      <div v-else-if="error" class="error-state">
        <span class="error-icon">⚠️</span>
        <p>{{ error }}</p>
        <button @click="loadLibrary" class="button retry-button">Reintentar</button>
      </div>

      <!-- Biblioteca vacía -->
      <div v-else-if="myLibrary.length === 0" class="empty-state">
        <div class="empty-icon">📖</div>
        <h3>Tu biblioteca está vacía</h3>
        <p>Comienza agregando libros desde el buscador</p>
        <NuxtLink to="/" class="button primary">Explorar libros</NuxtLink>
      </div>

      <!-- Grid de libros -->
      <div v-else class="book-grid-container">
        <div class="results-info">
          <p>Mostrando {{ myLibrary.length }} libro(s)</p>
          <button v-if="hasFilters" @click="clearFilters" class="clear-filters">
            Limpiar filtros
          </button>
        </div>

        <div class="book-grid">
          <div
            v-for="book in myLibrary"
            :key="book._id"
            class="book-card"
          >
            <div class="card-content">
              <div class="cover-container">
                <img
                  v-if="book.cover"
                  :src="book.cover"
                  :alt="book.title"
                  class="book-cover"
                />
                <div v-else class="cover-placeholder">
                  <span class="placeholder-icon">📚</span>
                </div>
                <div class="book-rating-badge" v-if="book.rating">
                  {{ book.rating }}/5
                </div>
              </div>
              
              <div class="book-info">
                <h3 class="book-title">{{ book.title }}</h3>
                <p class="book-author">{{ book.author }}</p>
                
                <div class="rating-section" v-if="book.rating">
                  <div class="rating">
                    <span
                      v-for="i in 5"
                      :key="i"
                      class="star"
                      :class="{ active: i <= (book.rating || 0) }"
                    >
                      ★
                    </span>
                  </div>
                </div>
                <div v-else class="no-rating">
                  <span class="no-rating-text">Sin calificación</span>
                </div>
                
                <div class="review-section" v-if="book.review">
                  <p class="review-label">Reseña:</p>
                  <p class="review-text">{{ book.review }}</p>
                </div>
                <div v-else class="no-review">
                  <span class="no-review-text">Sin reseña</span>
                </div>
                
                <div class="actions">
                  <button class="button edit-button" @click="editBook(book)">
                    <span class="button-icon">✏️</span> Editar
                  </button>
                  <button class="button danger-button" @click="handleDelete(book)">
                    <span class="button-icon">🗑️</span> Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal de edición -->
      <EditBookModal
        v-if="selectedBook"
        :book="selectedBook"
        @close="selectedBook = null"
        @saved="handleBookUpdated"
      />

      <!-- Modal de confirmación para eliminar -->
      <ConfirmDialog
        :show="showDeleteConfirm"
        title="Confirmar eliminación"
        :message="deleteMessage"
        @confirm="confirmDelete"
        @cancel="showDeleteConfirm = false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useBookStore } from '../stores/books'
import { storeToRefs } from 'pinia'
// @ts-ignore
import ConfirmDialog from '../components/ConfirmDialog.vue'

const store = useBookStore()
const selectedBook = ref(null)
const bookToDelete = ref<any>(null)
const showDeleteConfirm = ref(false)
const showSuccess = ref(false)
const successMessage = ref('')

// Función para mostrar mensaje de éxito
function showSuccessMessage(message: string) {
  successMessage.value = message
  showSuccess.value = true
  setTimeout(() => {
    showSuccess.value = false
    successMessage.value = ''
  }, 3000)
}

const filters = ref({
  title: '',
  author: '',
  excludeNoReview: false,
  sortByRating: ''
})

const { myLibrary, loading, error } = storeToRefs(store)

// Computed para verificar si hay filtros aplicados
const hasFilters = computed(() => {
  return filters.value.title !== '' || 
         filters.value.author !== '' || 
         filters.value.excludeNoReview || 
         filters.value.sortByRating !== ''
})

const deleteMessage = computed(() => {
  if (!bookToDelete.value) return ''
  return `¿Estás seguro de que deseas eliminar el libro "${bookToDelete.value.title}" de tu biblioteca?`
})

onMounted(() => {
  loadLibrary()
})

async function loadLibrary() {
  await store.getMyLibrary()
}

async function applyFilters() {
  await store.getMyLibrary(filters.value as any)
}

function clearFilters() {
  filters.value = {
    title: '',
    author: '',
    excludeNoReview: false,
    sortByRating: ''
  }
  applyFilters()
}

function editBook(book: any) {
  selectedBook.value = book
}

function handleDelete(book: any) {
  bookToDelete.value = book
  showDeleteConfirm.value = true
}

async function confirmDelete() {
  if (!bookToDelete.value) return
  
  try {
    await store.deleteBook(bookToDelete.value._id)
    await loadLibrary()
    showDeleteConfirm.value = false
    showSuccessMessage('Libro eliminado exitosamente')
    bookToDelete.value = null
  } catch (error) {
    console.error('Error al eliminar el libro:', error)
  }
}

async function handleBookUpdated() {
  selectedBook.value = null
  await loadLibrary()
  showSuccessMessage('Libro actualizado exitosamente')
}
</script>

<style scoped lang="scss">
@use "../assets/styles/_variables.scss" as *;

.success-message {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: $success-color;
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  animation: slideIn 0.3s ease-out;

  .success-icon {
    font-size: 1.25rem;
    font-weight: bold;
  }
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}


.container {
  max-width: 1200px;
  margin: 0 auto;
}

.library-header {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  h1 {
    margin: 0;
    color: #2d3748;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.8rem;
    
    .icon {
      font-size: 2rem;
    }
  }
}

.filters-section {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
  
  h2 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: #4a5568;
    font-size: 1.2rem;
  }
}

.filters {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
  position: relative;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #4a5568;
  }
}

.filter-input, .filter-select {
  width: 100%;
  padding: 0.85rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  box-sizing: border-box;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: $primary-color;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.34);
  }
}

.checkbox-group {
  margin-top: 1.75rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  padding-left: 2rem;
  
  .checkbox-input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    
    &:checked ~ .checkmark:after {
      display: block;
    }
  }
  
  .checkmark {
    position: absolute;
    left: 0;
    height: 1.2rem;
    width: 1.2rem;
    background-color: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    
    &:after {
      content: "";
      position: absolute;
      display: none;
      left: 6px;
      top: 2px;
      width: 4px;
      height: 8px;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
  }
  
  .checkbox-input:checked ~ .checkmark {
    background-color: $primary-color;
    border-color: $primary-color;
  }
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  
  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #e2e8f0;
    border-top: 4px solid $primary-color;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }
  
  p {
    margin: 0;
    color: #718096;
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  text-align: center;
  
  .error-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  p {
    margin: 0 0 1.5rem;
    color: #e53e3e;
  }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  text-align: center;
  
  .empty-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  h3 {
    margin: 0 0 0.5rem;
    color: #2d3748;
  }
  
  p {
    margin: 0 0 1.5rem;
    color: #718096;
  }
}

.book-grid-container {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.results-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
  
  p {
    margin: 0;
    color: #718096;
    font-weight: 500;
  }
}

.clear-filters {
  background: none;
  border: none;
  color: $primary-color;
  cursor: pointer;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  
  &:hover {
    background-color: #ebf4ff;
  }
}

.book-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.book-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s, box-shadow 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  }
}

.card-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.cover-container {
  height: 200px;
  overflow: hidden;
  position: relative;
  
  .book-cover {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .cover-placeholder {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f7fafc;
    
    .placeholder-icon {
      font-size: 3rem;
      opacity: 0.5;
    }
  }
  
  .book-rating-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(255, 255, 255, 0.9);
    padding: 0.25rem 0.5rem;
    border-radius: 20px;
    font-weight: bold;
    color: $primary-color;
    font-size: 0.8rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
}

.book-info {
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.book-title {
  margin: 0 0 0.5rem;
  color: #2d3748;
  font-size: 1.2rem;
  line-height: 1.4;
}

.book-author {
  margin: 0 0 1rem;
  color: #718096;
  font-style: italic;
}

.rating-section {
  margin-bottom: 1rem;
}

.rating {
  display: flex;
  
  .star {
    color: #e2e8f0;
    font-size: 1.2rem;
    
    &.active {
      color: #f6ad55;
    }
  }
}

.no-rating, .no-review {
  margin-bottom: 1rem;
  
  .no-rating-text, .no-review-text {
    color: #a0aec0;
    font-style: italic;
  }
}

.review-section {
  margin-bottom: 1rem;
  flex-grow: 1;
  
  .review-label {
    font-weight: 500;
    margin: 0 0 0.25rem;
    color: #4a5568;
    font-size: 0.9rem;
  }
  
  .review-text {
    margin: 0;
    color: #718096;
    line-height: 1.5;
    font-size: 0.95rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

.actions {
  display: flex;
  gap: 0.75rem;
  margin-top: auto;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  text-decoration: none;
  gap: 0.5rem;
  
  &.back-button {
  background-color: $primary-color;
  color: white;
    
    &:hover {
    background-color: color.adjust($primary-color, $lightness: -10%);
    }
  }
  
  &.primary {
    background: $primary-color;
    color: white;
    
    &:hover {
      background: color.adjust($primary-color, $lightness: -10%);
    }
  }
  
  &.edit-button {
    background: $secondary-color;
    color: white;
    flex: 1;
    
    &:hover {
      background: color.adjust($secondary-color, $lightness: -10%);
      transform: translateY(-1px);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  }
  
  &.danger-button {
    background: $error-color;
    color: white;
    flex: 1;
    
    &:hover {
      background: color.adjust($error-color, $lightness: -10%);
      transform: translateY(-1px);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  }
  
  &.retry-button {
    background: $primary-color;
    color: white;
    
    &:hover {
      background: color.adjust($primary-color, $lightness: -10%);
    }
  }
}

.button-icon {
  font-size: 1rem;
}

// Responsive adjustments
@media (max-width: 768px) {
  .library-header .header-content {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .filters {
    grid-template-columns: 1fr;
  }
  
  .book-grid {
    grid-template-columns: 1fr;
  }
  
  .results-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>