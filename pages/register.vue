<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { navigateTo } from "nuxt/app";

const authStore = useAuthStore();

const name = ref("");
const lastname = ref("");
const email = ref("");
const username = ref("");
const password = ref("");
const confirmPassword = ref("");


const localError = ref("");

const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const handleRegister = async () => {
  localError.value = "";


  if (!name.value || !lastname.value || !email.value || !username.value || !password.value) {
    localError.value = "Todos los campos son obligatorios";
    return;
  }

  if (!validateEmail(email.value)) {
    localError.value = "Por favor ingresa un correo electrónico válido";
    return;
  }

  if (password.value.length < 6) {
    localError.value = "La contraseña debe tener al menos 6 caracteres";
    return;
  }

  if (password.value !== confirmPassword.value) {
    localError.value = "Las contraseñas no coinciden";
    return;
  }

  try {
    await authStore.register(
      name.value,
      lastname.value,
      email.value,
      username.value,
      password.value
    );
   
    return navigateTo("/");
  } catch (error) {
    console.error("Error en el registro:", error);
  }
};
</script>

<template>
  <div class="register-page">
    <div class="register-container">
      <div class="header">
        <h2 class="title">Crear cuenta</h2>
        <p class="subtitle">Únete a nuestra comunidad</p>
      </div>

      <form @submit.prevent="handleRegister" class="form">
        <div class="form-row">
          <div class="form-group">
            <label for="name">Nombre</label>
            <input 
              id="name" 
              v-model="name" 
              type="text" 
              required 
              placeholder="Tu nombre"
            />
          </div>

          <div class="form-group">
            <label for="lastname">Apellido</label>
            <input 
              id="lastname" 
              v-model="lastname" 
              type="text" 
              required 
              placeholder="Tu apellido"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="username">Usuario</label>
          <input 
            id="username" 
            v-model="username" 
            type="text" 
            required 
            placeholder="Nombre de usuario"
          />
        </div>

        <div class="form-group">
          <label for="email">Correo electrónico</label>
          <input 
            id="email" 
            v-model="email" 
            type="email" 
            required 
            placeholder="correo@ejemplo.com"
          />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="password">Contraseña</label>
            <input 
              id="password" 
              v-model="password" 
              type="password" 
              required 
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          <div class="form-group">
            <label for="confirmPassword">Confirmar contraseña</label>
            <input 
              id="confirmPassword" 
              v-model="confirmPassword" 
              type="password" 
              required 
              placeholder="Repite tu contraseña"
            />
          </div>
        </div>

        <!-- Errores -->
        <div v-if="localError || authStore.error" class="error-container">
          <p v-if="localError" class="error">{{ localError }}</p>
          <p v-if="authStore.error" class="error">{{ authStore.error }}</p>
        </div>

        <!-- Botón con loading -->
        <button type="submit" :disabled="authStore.loading" class="submit-btn">
          {{ authStore.loading ? "Registrando..." : "Crear cuenta" }}
          <span v-if="!authStore.loading" class="icon">→</span>
        </button>
      </form>

      <div class="login-redirect">
        <p>¿Ya tienes una cuenta? <NuxtLink to="/login" class="login-link">Iniciar sesión</NuxtLink></p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "../assets/styles/_variables.scss" as *;



.register-container {
  width: 100%;
  max-width: 500px;
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

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
}


.form-group {
  margin-bottom: 1.5rem;
  position: relative;
  padding: 0 4px;
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
      // border-color: $primary-color;
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
}

button:disabled {
  background-color: #93c5fd;
  cursor: not-allowed;
  transform: none !important;
}

.icon {
  font-weight: 700;
}

.login-redirect {
  text-align: center;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;

  p {
    margin: 0;
    color: #718096;
  }
}

.login-link {
  color: $primary-color;
  text-decoration: none;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
}
</style>