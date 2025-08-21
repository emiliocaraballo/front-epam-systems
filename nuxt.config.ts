import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  experimental: {
    payloadExtraction: false
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "sass:color";'
        }
      }
    }
  },

  nitro: {
    compatibilityDate: '2025-08-21'
  },

  modules: ['@pinia/nuxt'],

  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:3111/api/v1'
    }
  },

  typescript: {
    strict: false,
    typeCheck: false
  },

  build: {
    transpile: ['@pinia/nuxt']
  },

  app: {
    head: {
      title: 'Reseña de libros',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },

  compatibilityDate: '2025-08-21'
})