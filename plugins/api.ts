import { defineNuxtPlugin } from 'nuxt/app'
import { useApi } from '../composables/useApi'
import { useAuthStore } from '../stores/auth'

export default defineNuxtPlugin((nuxtApp) => {
  // Initialize auth state when the app starts
  if (process.client) {
    // Wait for the app to be mounted to ensure client-side only code
    nuxtApp.vueApp.mixin({
      mounted() {
        const authStore = useAuthStore()
        // Only initialize if not already authenticated
        if (!authStore.isAuthenticated) {
          authStore.initAuth()
        }
      }
    })
  }

  return {
    provide: {
      api: useApi()
    }
  }
})
