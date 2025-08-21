<template>
  <div class="book-details-modal">
    <!-- Mensaje de éxito -->
    <div v-if="showSuccess" class="success-message">
      <span class="success-icon">✓</span>
      {{ successMessage }}
    </div>

    <div class="modal-content">
      <button class="close-button" @click="$emit('close')">&times;</button>
      
      <div class="book-details">
        <img
          v-if="book.cover"
          :src="book.cover"
          :alt="book.title"
          class="book-cover"
        />
        <div class="book-info">
          <h2>{{ book.title }}</h2>
          <p class="author">{{ book.author }}</p>
          <p v-if="book.publishYear" class="year">{{ book.publishYear }}</p>
          
          <div class="rating-section">
            <h3>Calificación</h3>
            <div class="rating">
              <span
                v-for="i in 5"
                :key="i"
                class="star"
                :class="{ active: i <= rating }"
                @click="rating = i"
              >
                ★
              </span>
            </div>
          </div>
          
          <div class="review-section">
            <h3>Review</h3>
            <textarea
              v-model="review"
              class="review-textarea"
              placeholder="Escribe tu review (máximo 500 caracteres)"
              maxlength="500"
            ></textarea>
            <p class="char-count">{{ review.length }}/500</p>
          </div>
          
          <div class="button-group">
            <button class="save-button" @click="saveBook">
              Guardar en Mi Biblioteca
            </button>
            <button class="delete-button" @click="handleDelete">
              Eliminar de Mi Biblioteca
            </button>
          </div>

          <ConfirmDialog
            :show="showDeleteConfirm"
            title="Confirmar eliminación"
            message="¿Estás seguro de que deseas eliminar este libro de tu biblioteca? Esta acción no se puede deshacer."
            @confirm="confirmDelete"
            @cancel="showDeleteConfirm = false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useBookStore } from '../stores/books'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import ConfirmDialog from './ConfirmDialog.vue'

const props = defineProps({
  book: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'saved'])

const store = useBookStore()
const authStore = useAuthStore()
const router = useRouter()
const rating = ref(0)
const review = ref('')
const showDeleteConfirm = ref(false)
const showSuccess = ref(false)
const successMessage = ref('')

function showSuccessMessage(message: string) {
  successMessage.value = message
  showSuccess.value = true
  setTimeout(() => {
    showSuccess.value = false
    successMessage.value = ''
  }, 4000)
}

function checkAuth() {
  if (!authStore.isAuthenticated) {
    emit('close')
    router.push('/login')
    return false
  }
  return true
}

async function handleDelete() {
  if (!checkAuth()) return;
  showDeleteConfirm.value = true
}

async function confirmDelete() {
  try {
    await store.deleteBook(props.book._id)
    emit('close')
  } catch (error) {
    console.error('Error deleting book:', error)
  }
}

async function saveBook() {
  if (!checkAuth()) return;

  try {
    const bookData = {
      title: props.book.title,
      author: props.book.author,
      publishYear: props.book.publishYear,
      cover: props.book.cover,
      rating: rating.value,
      review: review.value,
      openLibraryId: props.book.openLibraryId
    }

    await store.saveToLibrary(bookData)
    showSuccessMessage('Libro guardado exitosamente en tu biblioteca')
    // Esperar 3 segundos antes de cerrar para que se vea el mensaje
    setTimeout(() => {
      emit('saved')
    }, 3000)
  } catch (error) {
    console.error('Error saving book:', error)
  }
}
</script>

<style scoped lang="scss">
.book-details-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
}

.book-details {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.book-cover {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.book-info {
  h2 {
    margin-bottom: 10px;
  }

  .author, .year {
    color: #666;
    margin-bottom: 5px;
  }
}

.rating-section, .review-section {
  margin-top: 20px;

  h3 {
    margin-bottom: 10px;
  }
}

.char-count {
  text-align: right;
  color: #666;
  font-size: 0.9em;
  margin-top: 5px;
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.save-button, .delete-button {
  flex: 1;
  padding: 0.75rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  font-size: 1rem;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
}

.save-button {
  background-color: #007bff;
  color: white;

  &:hover:not(:disabled) {
    background-color: #0056b3;
  }
}

.delete-button {
  background-color: #dc3545;
  color: white;

  &:hover:not(:disabled) {
    background-color: #c82333;
  }
}

.success-message {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #2ecc71;
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1100;
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
</style>
