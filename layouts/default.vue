<script setup lang="ts">
import { navigateTo } from 'nuxt/app'
import { useAuthStore } from '../stores/auth'
import { LogIn, LogOut } from 'lucide-vue-next' 

const authStore = useAuthStore()

function handleLogout() {
  authStore.logout()
  navigateTo('/login')
}
</script>

<template>
  <div class="layout-container">
    <nav class="navbar">
      <div class="container">
        <NuxtLink to="/" class="logo">
          Reseña de libros
        </NuxtLink>

        <div class="nav-links">
          <!-- Link visible solo si está autenticado -->
          <NuxtLink 
            v-if="authStore.isAuthenticated" 
            to="/my-library" 
            class="nav-link library-link"
          >
            <span class="icon">📚</span>
            <span>Mi Biblioteca</span>
          </NuxtLink>

          <!-- Mostrar botón LOGIN si NO está autenticado -->
          <NuxtLink 
            v-if="!authStore.isAuthenticated" 
            to="/login" 
            class="nav-link"
          >
            <LogIn class="icon" />
            Iniciar Sesión
          </NuxtLink>

          <!-- Información del usuario y botón de logout -->
          <div v-if="authStore.isAuthenticated" class="user-section">
            <div class="user-info">
              <span class="user-email">{{ authStore.user?.name }}</span>
            </div>
            <button 
              class="nav-link logout" 
              @click="handleLogout"
            >
              <LogOut class="icon" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </nav>

    <main class="main-content">
      <slot />
    </main>
  </div>
</template>

<style lang="scss">
@use '../assets/styles/_variables.scss' as *;

:root {
  font-family: "Inter", "Roboto", "Helvetica Neue", Arial, sans-serif;
}
body{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  // background-color: $background-color;
}
.navbar {
  background-color: white;
  box-shadow: 0 2px 44px rgba(0, 0, 0, 0.918);
  padding: 15px 7px;
  border-bottom: 2px solid rgba(0, 0, 138, 0.149);

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    font-size: 1.5em;
    font-weight: bold;
    color: $primary-color;
    text-decoration: none;
  }

  .nav-links {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .nav-link {
    display: flex;
    align-items: center;
    gap: 6px;
    color: $secondary-color;
    text-decoration: none;
    font-weight: 500;
    padding: 8px 16px;
    border-radius: $border-radius;
    transition: background-color 0.3s;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 1em;

    &:hover {
      background-color: rgba($secondary-color, 0.1);
    }

    &.library-link {
      font-weight: 600;
      color: $primary-color;
      
      .icon {
        font-size: 1.2em;
        margin-right: 2px;
      }

      &:hover {
        background-color: rgba($primary-color, 0.1);
      }
    }

    &.logout {
      color: $error-color;
      padding: 8px 12px;

      &:hover {
        background-color: rgba($error-color, 0.1);
      }
    }
  }

  .user-section {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    border-radius: $border-radius;
    background-color: rgba($secondary-color, 0.05);
  }

  .user-info {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.25rem;
    padding-right: 1rem;
    border-right: 1px solid rgba($secondary-color, 0.2);

    .user-name {
      font-weight: 600;
      color: $primary-color;
      font-size: 0.9rem;
    }

    .user-email {
      color: $secondary-color;
      font-size: 0.8rem;
      opacity: 0.8;
    }
  }
}
.main-content {
  padding: 20px;
  background-color: $background-color;
  min-height: 81.5vh; 
}
</style>
