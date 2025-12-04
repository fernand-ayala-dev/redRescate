<script>
import {
  subscribeToAuthStateChanges,
  logout,
} from "../../service/authService.js";
import { getFileURL } from "../../service/storage.js";

export default {
  name: "AppNav",
  data() {
    return {
      user: {
        id: null,
        email: null,
        avatar: null,
        display_name: null
        
      },
    };
  },
  methods: {
    getFileURL,
    handleLogout() {
      logout();

      this.$router.push("/");
      this.user.email = "";
      this.user.password = "";
    },
  },

  mounted() {
    subscribeToAuthStateChanges((userState) => (this.user = userState));
  },
};
</script>
<template>
  <nav
    class="relative bg-lime-800 backdrop-blur-md after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10"
  >
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <div class="flex items-center gap-3">
          <img
            src="/logo-selva.png"
            alt="Logo Selva"
            class="h-10 w-auto object-contain"
          />
          <RouterLink to="/" class="text-2xl font-semibold text-white">
            RedRescate
          </RouterLink>
        </div>
        <ul class="flex items-center space-x-4 text-white">
          <li>
            <RouterLink
              to="/"
              class="rounded-md px-3 py-2 text-lg font-medium hover:bg-lime-600"
            >
              Home
            </RouterLink>
          </li>
          <template v-if="!user.id">
            <li>
              <RouterLink
                to="/iniciar"
                class="rounded-md px-3 py-2 text-lg font-medium hover:bg-lime-600"
              >
                Ingresar
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/registrarse"
                class="rounded-md px-3 py-2 text-lg font-medium hover:bg-lime-600"
              >
                Registrarse
              </RouterLink>
            </li>
          </template>

          <template v-else>
            <li>
              <RouterLink
                to="/mi_perfil"
                class="rounded-md px-3 py-2 text-lg font-medium hover:bg-lime-600"
              >
                Mi perfil
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/publicaciones"
                class="rounded-md px-3 py-2 text-lg font-medium hover:bg-lime-600"
              >
                Muro
              </RouterLink>
            </li>
            <li>
              <RouterLink
                v-if="user"
                :to="`/chats/${user.id}`"
                class="rounded-md px-3 py-2 text-lg font-medium hover:bg-lime-600"
              >
                Ir al chat
              </RouterLink>
            </li>

            <li>
              <form @submit.prevent="handleLogout">
                <button
                  type="submit"
                  class="flex items-center gap-2 rounded-md bg-amber-300 px-3 py-2 text-sm font-medium text-lime-950 hover:bg-lime-600 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-amber-400"
                >
                  <img
                    :src="
                      user.avatar
                        ? getFileURL(user.avatar)
                        : '/avatar-de-usuario.png'
                    "
                    alt="avatar"
                    class="h-8 w-8 rounded-full border border-lime-200 object-cover"
                  />
                  {{ user.display_name || user.email }} | Cerrar sesión
                </button>
              </form>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>
