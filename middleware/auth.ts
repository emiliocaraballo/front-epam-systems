import { defineNuxtRouteMiddleware } from 'nuxt/app'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

export default defineNuxtRouteMiddleware((to) => {
  // Only run on client-side
  if (process.server) return

  const authStore = useAuthStore()
  const router = useRouter()
  
  // Initialize auth state from localStorage
  authStore.initAuth()

  // Allow access to login page
  if (to.path === '/login') {
    // If already authenticated, redirect to home
    if (authStore.isAuthenticated) {
      return router.push('/')
    }
    return
  }

  // Check authentication for other pages
  if (!authStore.isAuthenticated) {
    return router.push('/login')
  }
})