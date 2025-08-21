<template>
  <div class="confirm-dialog" v-if="show">
    <div class="dialog-content">
      <h3>{{ title }}</h3>
      <p>{{ message }}</p>
      <div class="dialog-actions">
        <button class="cancel-button" @click="$emit('cancel')">
          Cancelar
        </button>
        <button class="confirm-button" @click="$emit('confirm')">
          Confirmar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Definir props y emits
const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['confirm', 'cancel'])
</script>

<style scoped lang="scss">
.confirm-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  backdrop-filter: blur(3px);
}

.dialog-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  text-align: center;

  h3 {
    margin-bottom: 1rem;
    color: #333;
    font-size: 1.5rem;
  }

  p {
    margin-bottom: 1.5rem;
    color: #666;
    line-height: 1.5;
  }
}

.dialog-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;

  button {
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
    font-size: 1rem;

    &:hover {
      transform: translateY(-1px);
    }
  }
}

.cancel-button {
  background-color: #f8f9fa;
  color: #333;
  border: 1px solid #dee2e6;

  &:hover {
    background-color: #e9ecef;
  }
}

.confirm-button {
  background-color: #dc3545;
  color: white;

  &:hover {
    background-color: #c82333;
  }
}
</style>
