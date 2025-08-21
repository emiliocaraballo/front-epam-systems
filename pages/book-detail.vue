
<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

import { ref, onMounted, watch } from "vue"
import { useBookStore } from "@/stores/books"
import { useRouter } from "vue-router"


const bookStore = useBookStore()
const router = useRouter()
const review = ref("")
const rating = ref(0)
const isLoading = ref(false)

// Convertir imagen a base64
async function convertImageToBase64(url: string): Promise<string> {
  try {
    const response = await fetch(url)
    const blob = await response.blob()
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  } catch (error) {
    console.error("Error converting image to base64:", error)
    return ""
  }
}

async function saveBookToLibrary() {
  if (!bookStore.selectedBook || rating.value === 0) return
  
  isLoading.value = true
  
  try {
    // Convertir portada a base64
    let coverBase64 = ""
    if (bookStore.selectedBook.cover) {
      coverBase64 = await convertImageToBase64(bookStore.selectedBook.cover)
    }

    const bookToSave = {
      ...bookStore.selectedBook,
      review: review.value,
      rating: rating.value,
      cover: coverBase64,
      savedAt: new Date().toISOString()
    }

    await bookStore.saveToLibrary(bookToSave)
    
    // Mostrar mensaje de éxito
    
    
    // Redirigir a la página principal o a la biblioteca
    router.push("/")
    
  } catch (error) {
    console.error("Error saving book:", error)
    alert("Error al guardar el libro")
  } finally {
    isLoading.value = false
  }
}

function goBack() {
  router.back()
}

// Verificar que hay un libro seleccionado
onMounted(() => {
  if (!bookStore.selectedBook) {
    router.push("/")
  }
})
</script>

<template>
  <div class="book-detail-page" v-if="bookStore.selectedBook">
    <div class="container">
      <!-- Botón de volver -->
      <button class="back-button" @click="goBack">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Volver
      </button>

      <div class="book-detail-container">
        <!-- Información del libro -->
        <div class="book-info-section">
          <div class="book-cover-large">
            <img :src="bookStore.selectedBook.cover || '/img/default-book-cover.svg'" :alt="bookStore.selectedBook.title" />
          </div>
          
          <div class="book-details">
            <h1 class="book-title"> {{ bookStore.selectedBook.title }}</h1>
            
            <div class="detail-row" v-if="bookStore.selectedBook.author">
              <span class="label">Autor:</span>
              <span class="value"> {{ bookStore.selectedBook.author }}</span>
            </div>
            
            <div class="detail-row" v-if="bookStore.selectedBook.publishYear">
              <span class="label">Año de publicación: </span>
              <span class="value"> {{ bookStore.selectedBook.publishYear }}</span>
            </div>
            
            <!-- <div class="detail-row" v-if="bookStore.selectedBook.publisher">
              <span class="label">Editorial:</span>
              <span class="value">{{ bookStore.selectedBook.publisher }}</span>
            </div>
            
            <div class="detail-row" v-if="bookStore.selectedBook.pages">
              <span class="label">Páginas:</span>
              <span class="value">{{ bookStore.selectedBook.pages }}</span>
            </div> -->
          </div>
        </div>

        <!-- Formulario de reseña y calificación -->
        <div class="review-section">
          <h2>Agregar reseña y calificación</h2>
          
          <!-- Calificación con estrellas -->
          <div class="rating-container">
            <span class="rating-label">Calificación:</span>
            <div class="stars">
              <span 
                v-for="star in 5" 
                :key="star" 
                class="star"
                :class="{ filled: star <= rating }"
                @click="rating = star"
              >
                ★
              </span>
            </div>
            <span class="rating-value">{{ rating }}/5</span>
          </div>

          <!-- Campo de reseña -->
          <div class="review-container">
            <label for="review" class="review-label">Reseña (máximo 500 caracteres):</label>
            <textarea
              id="review"
              v-model="review"
              class="review-textarea"
              placeholder="Escribe tu reseña sobre este libro..."
              maxlength="500"
              rows="5"
            ></textarea>
            <div class="character-count">{{ review.length }}/500 caracteres</div>
          </div>

          <!-- Botón de guardar -->
          <button 
            class="save-button" 
            @click="saveBookToLibrary"
            :disabled="rating === 0 || isLoading"
          >
            <span v-if="isLoading">Guardando...</span>
            <span v-else>Guardar en Mi Biblioteca</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "../assets/styles/_variables.scss" as *;
@use "../assets/styles/_buttons.scss" as *;

.book-detail-page {
  padding: 2rem 1rem;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  border: 2px solid $primary-color;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  color: $primary-color;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 2rem;
  transition: all 0.2s ease;
  
  &:hover {
    background: $primary-color;
    color: white;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  svg {
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: translateX(-2px);
  }
}

.book-detail-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

.book-info-section {
  .book-cover-large {
    margin-bottom: 1.5rem;
    
    img {
      width: 100%;
      max-width: 300px;
      height: auto;
      border-radius: 12px;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }
  }
  
  .book-title {
    font-size: 2rem;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 1.5rem;
    line-height: 1.2;
  }
}

.detail-row {
  display: flex;
  margin-bottom: 1rem;
  
  .label {
    font-weight: 600;
    color: #4a5568;
    min-width: 150px;
  }
  
  .value {
    color: #718096;
  }
}

.review-section {
  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 1.5rem;
  }
}

.rating-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  
  .rating-label {
    font-weight: 600;
    color: #4a5568;
  }
  
  .stars {
    display: flex;
    gap: 0.25rem;
  }
  
  .star {
    font-size: 2rem;
    color: #e2e8f0;
    cursor: pointer;
    transition: color 0.2s ease;
    
    &.filled {
      color: #f6ad55;
    }
    
    &:hover {
      color: #f6ad55;
    }
  }
  
  .rating-value {
    color: #718096;
    font-weight: 600;
  }
}

.review-container {
  margin-bottom: 2rem;
  
  .review-label {
    display: block;
    font-weight: 600;
    color: #4a5568;
    margin-bottom: 0.5rem;
  }
  
  .review-textarea {
    width: 100%;
    padding: 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    resize: vertical;
    font-family: inherit;
    font-size: 1rem;
    transition: border-color 0.2s ease;
    
    &:focus {
      outline: none;
      border-color: $primary-color;
      box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
    }
  }
  
  .character-count {
    text-align: right;
    font-size: 0.875rem;
    color: #a0aec0;
    margin-top: 0.5rem;
  }
}

.save-button {
  width: 100%;
  background: $primary-color;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    background: color.adjust($primary-color, $lightness: -10%);
    transform: translateY(-2px);
  }
  
  &:disabled {
    background: #cbd5e0;
    cursor: not-allowed;
    transform: none;
  }
}

@media (max-width: 768px) {
  .book-detail-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .book-info-section {
    .book-cover-large img {
      max-width: 100%;
    }
  }
  
  .detail-row {
    flex-direction: column;
    gap: 0.25rem;
    
    .label {
      min-width: auto;
    }
  }
  
  .rating-container {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>