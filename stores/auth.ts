// stores/auth.ts
import { useRuntimeConfig } from "nuxt/app";
import { defineStore } from "pinia";

interface User {
  _id: string;
  name: string;
  lastname: string;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
    token: null,
    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    async login(username: string, password: string) {
      this.loading = true;
      this.error = null;
      try {
        const config = useRuntimeConfig();
        const response = await $fetch<{ user: User; token: string }>(
          `${config.public.apiBase}/auth/login`,
          {
            method: "POST",
            body: { username, password },
          }
        );

        this.token = response.token;
        localStorage.setItem("token", response.token);
        
        // Cargar el perfil después de obtener el token
        await this.initAuth();
      } catch (err: any) {
        this.error = err?.data?.message || "Error al iniciar sesión";
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async register(name: string, lastname: string, email: string, username: string, password: string) {
      this.loading = true;
      this.error = null;
      try {
        const config = useRuntimeConfig();
        const response = await $fetch<{ user: User; token: string }>(
          `${config.public.apiBase}/auth/register`,
          {
            method: "POST",
            body: { name, lastname, email, username, password },
          }
        );

        this.user = response.user;
        this.token = response.token;
        localStorage.setItem("token", response.token);
      } catch (err: any) {
        this.error = err?.data?.message || "Error al registrarse";
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("token");
    },

    async initAuth() {
      const token = localStorage.getItem("token");
      if (!token) return;

      this.token = token;
      this.loading = true;

      try {
        const config = useRuntimeConfig();
        const profile = await $fetch<User>(`${config.public.apiBase}/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.user = profile;
      } catch (err: any) {
        console.error("Error cargando perfil:", err);
        // Solo hacer logout si el error es de autenticación
        if (err?.response?.status === 401) {
          this.logout();
        } 
      } finally {
        this.loading = false;
      }
    },

    loadTokenFromStorage() {
      const token = localStorage.getItem("token");
      if (token) {
        this.token = token;
        // opcional: aquí podrías pedir el perfil al backend
      }
    },
  },
});
