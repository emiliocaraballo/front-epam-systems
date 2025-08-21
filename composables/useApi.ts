import { useRuntimeConfig, useRouter } from 'nuxt/app'
import { useAuthStore } from '../stores/auth'

export function useApi() {
  const config = useRuntimeConfig()
  const authStore = useAuthStore()

  const getHeaders = () => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    }
    
    if (authStore.token) {
      headers['Authorization'] = `Bearer ${authStore.token}`
    }

    return headers
  }

  const fetchWithAuth = async <T>(
    endpoint: string,
    options: RequestInit & { body?: any } = {}
  ): Promise<T> => {
    const url = `${config.public.apiBase}${endpoint}`
    const headers = {
      ...getHeaders(),
      ...options.headers
    }

    try {
      // Asegurarse de que el body sea un string JSON válido
      let processedBody = options.body
      if (processedBody && typeof processedBody === 'object') {
        processedBody = JSON.stringify(processedBody)
      }

      const response = await fetch(url, {
        ...options,
        headers,
        body: processedBody
      })

      if (!response.ok) {
        // Interceptar error 403 y hacer logout automático
        if (response.status === 403) {
          await authStore.logout();
          const router = useRouter();
          router.push('/login');
        }
        const error = new Error(`HTTP error! status: ${response.status}`);
        (error as any).response = response;
        throw error;
      }

      return await response.json()
    } catch (error: any) {
      console.error('API Error:', error)
      throw error
    }
  }

  return {
    fetchWithAuth
  }
}