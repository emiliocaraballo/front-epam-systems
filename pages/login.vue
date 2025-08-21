<script setup lang="ts">
definePageMeta({
  layout: "default",
});

import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { navigateTo } from "nuxt/app";


const authStore = useAuthStore();

const username = ref("");
const password = ref("");
const localError = ref("");

async function handleLogin() {
  localError.value = "";
  try {
    await authStore.login(username.value, password.value);
    return navigateTo("/");
  } catch (err) {
    localError.value = authStore.error || "Usuario o contraseña incorrectos";
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-container">
      <div class="header">
        <h2 class="title">Iniciar sesión</h2>
        <p class="subtitle">Bienvenido de vuelta</p>
      </div>

      <form @submit.prevent="handleLogin" class="form">
        <div class="form-group">
          <label for="username">Nombre de usuario</label>
          <input
            id="username"
            v-model="username"
            type="text"
            required
            placeholder="Ingresa tu nombre de usuario"
          />
        </div>

        <div class="form-group">
          <label for="password">Contraseña</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            placeholder="Ingresa tu contraseña"
          />
        </div>

        <div v-if="localError || authStore.error" class="error-container">
          <p v-if="localError" class="error">{{ localError }}</p>
          <p v-if="authStore.error" class="error">{{ authStore.error }}</p>
        </div>

        <button type="submit" class="submit-btn" :disabled="authStore.loading">
          {{ authStore.loading ? "Ingresando..." : "Iniciar Sesión" }}
          <span v-if="!authStore.loading" class="icon">→</span>
        </button>
      </form>

      <div class="register-redirect">
        <p>¿No tienes cuenta? <NuxtLink to="/register" class="register-link">Regístrate aquí</NuxtLink></p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "../assets/styles/_variables.scss" as *;

.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-container {
  width: 100%;
  max-width: 400px;
  margin: 2rem auto;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  background: white;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
  }
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.title {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  color: #2d3748;
  font-weight: 700;
}

.subtitle {
  color: #718096;
  margin-bottom: 0;
}

.form {
  margin-top: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
  position: relative;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #4a5568;
  }

  input {
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

    &::placeholder {
      color: #a0aec0;
    }
  }
}

.error-container {
  background-color: #fed7d7;
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.error {
  color: #c53030;
  font-size: 0.9rem;
  margin: 0;
  text-align: center;
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background-color: $primary-color;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover:not(:disabled) {
    background-color: color.adjust($primary-color, $lightness: -10%);
    transform: translateY(-2px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    background-color: #93c5fd;
    cursor: not-allowed;
    transform: none !important;
  }
}

.icon {
  font-weight: 700;
}

.register-redirect {
  text-align: center;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;

  p {
    margin: 0;
    color: #718096;
  }
}

.register-link {
  color: $primary-color;
  text-decoration: none;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
}

/* Responsive */
@media (max-width: 500px) {
  .login-container {
    padding: 2rem;
    margin: 1rem;
  }
  
  .title {
    font-size: 1.5rem;
  }
}
</style>