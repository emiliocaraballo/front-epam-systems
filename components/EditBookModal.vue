<template>
  <div class="edit-modal">
    <div class="modal-content">
      <button class="close-button" @click="$emit('close')">&times;</button>
      
      <div class="edit-form">
        <h2>Editar Libro</h2>
        
        <div class="book-info">
          <h3>{{ book.title }}</h3>
          <p>{{ book.author }}</p>
        </div>
        
        <div class="rating-section">
          <h4>Calificación</h4>
          <div class="rating">
            <span
              v-for="i in 5"
              :key="i"
              class="star"
              :class="{ 
                active: i <= rating,
                'hover-active': i <= hoverRating 
              }"
              @click="setRating(i)"
              @mouseover="hoverRating = i"
              @mouseleave="hoverRating = 0"
            >
              ★
            </span>
            <span class="rating-text" v-if="rating > 0">
              {{ getRatingText(rating) }}
            </span>
          </div>
        </div>
        
        <div class="review-section">
          <h4>Review</h4>
          <textarea
            v-model="review"
            class="review-textarea"
            placeholder="Escribe tu review (máximo 500 caracteres)"
            maxlength="500"
          ></textarea>
          <p class="char-count">{{ review.length }}/500</p>
        </div>
        
        <div class="validation-message" v-if="!isValid && !error">
          {{ validationMessage }}
        </div>

        <div class="error-message" v-if="error">
          {{ error }}
        </div>

        <div class="success-message" v-if="showSuccess">
          ¡Cambios guardados exitosamente!
        </div>

        <button 
          class="save-button" 
          @click="saveChanges"
          :disabled="loading || (!isValid && !error)"
        >
          <span v-if="loading">Guardando...</span>
          <span v-else>Guardar Cambios</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useBookStore } from '../stores/books'

const props = defineProps({
  book: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'saved'])

const store = useBookStore()
const rating = ref(props.book.rating || 0)
const hoverRating = ref(0)
const review = ref(props.book.review || '')
const loading = ref(false)
const error = ref('')
const showSuccess = ref(false)

// Validación reactiva
const isValid = computed(() => {
  return rating.value > 0 && review.value.trim().length >= 10
})

// Mensaje de validación
const validationMessage = computed(() => {
  if (rating.value === 0) return 'Debes seleccionar una calificación'
  if (review.value.trim().length < 10) return 'La review debe tener al menos 10 caracteres'
  return ''
})

function setRating(value: number) {
  rating.value = value
}

function getRatingText(value: number): string {
  const texts = {
    1: 'Malo',
    2: 'Regular',
    3: 'Bueno',
    4: 'Muy bueno',
    5: 'Excelente'
  }
  return texts[value as keyof typeof texts] || ''
}

async function saveChanges() {
  error.value = ''
  showSuccess.value = false
  
  if (!isValid.value) {
    error.value = validationMessage.value
    return
  }

  loading.value = true
  try {
    await store.updateBook(props.book._id, review.value, rating.value)
    showSuccess.value = true
    // Esperar un momento para mostrar el mensaje de éxito antes de cerrar
    setTimeout(() => {
      emit('saved')
      emit('close')
    }, 1000)
  } catch (err: any) {
    error.value = err?.message || 'Error al actualizar el libro'
    console.error('Error updating book:', err)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
@use '../assets/styles/_variables.scss' as *;
@use '../assets/styles/_buttons.scss' as *;

.edit-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(3px);
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f0f0f0;
    color: #333;
  }
}

.edit-form {
  h2 {
    margin-bottom: 1.5rem;
    color: #333;
    font-size: 1.75rem;
  }

  .book-info {
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 2px solid #f0f0f0;

    h3 {
      margin-bottom: 0.5rem;
      color: #333;
      font-size: 1.25rem;
    }

    p {
      color: #666;
      font-size: 1rem;
    }
  }
}

.rating-section, .review-section {
  margin-top: 1.5rem;

  h4 {
    margin-bottom: 1rem;
    color: #444;
    font-size: 1.1rem;
  }
}

.rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;

  .star {
    font-size: 1.75rem;
    cursor: pointer;
    color: #ddd;
    transition: all 0.2s ease;
    user-select: none;

    &.active {
      color: #ffd700;
    }

    &.hover-active {
      color: #ffeb3b;
      transform: scale(1.1);
    }

    &:hover {
      transform: scale(1.1);
    }
  }

  .rating-text {
    margin-left: 1rem;
    font-size: 0.9rem;
    color: #666;
    font-weight: 500;
  }
}

.review-textarea {
  width: 100%;
  min-height: 120px;
  padding: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  resize: vertical;
  font-family: inherit;
  font-size: 1rem;
  line-height: 1.5;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
}

.char-count {
  text-align: right;
  color: #666;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.validation-message {
  background-color: #fff8e1;
  color: #856404;
  padding: 0.75rem;
  border-radius: 6px;
  margin-top: 1rem;
  font-size: 0.9rem;
  border: 1px solid #ffeeba;
}

.error-message {
  background-color: #fff2f2;
  color: #dc3545;
  padding: 0.75rem;
  border-radius: 6px;
  margin-top: 1rem;
  font-size: 0.9rem;
  border: 1px solid #ffcdd2;
}

.success-message {
  background-color: #f0fff4;
  color: #28a745;
  padding: 0.75rem;
  border-radius: 6px;
  margin-top: 1rem;
  font-size: 0.9rem;
  border: 1px solid #c3e6cb;
  text-align: center;
  font-weight: 500;
}

.save-button {
  margin-top: 1.5rem;
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
  display: flex;
  justify-content: center;
  align-items: center;
  
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
</style>
