<script>
import {
  subscribeToAuthStateChanges,
  logout,
} from "../../service/authService.js";


export default {
  name: "AppNav",
  data() {
    return {
      user: {
        id: null,
        email: null,
      },
    };
  },
  methods: {
    handleLogout() {
      logout();

       this.$router.push('/');
      this.user.email='';
      this.user.password='';
    }

  
  },

  mounted() {
        subscribeToAuthStateChanges(userState => this.user = userState);

  },
};
</script>
<template>
  <nav class="h-15 flex items-center justify-between p-4 bg-lime-800">
   
    <div class="flex items-center gap-3">
      <img
        src="/logo-selva.png"
        alt="Logo Selva"
        class="h-[50px] w-auto object-contain"
      />
      <RouterLink to="/" class="text-2xl font-semibold text-white">
        RedRescate
      </RouterLink>
    </div>

   
    <ul class="mt-2 flex gap-4 text-white">
      <li>
        <RouterLink
          class="p-2 rounded-sm hover:bg-lime-600 focus:outline-2 focus:outline-offset-2 focus:outline-lime-500 focus:bg-lime-600 focus:text-amber-50"
          to="/"
        >
          Home
        </RouterLink>
      </li>

      <template v-if="user.id === null">
        <li>
          <RouterLink
            class="p-2 rounded-sm hover:bg-lime-600 focus:outline-2 focus:outline-offset-2 focus:outline-lime-500 focus:bg-lime-600 focus:text-amber-50"
            to="/iniciar"
          >
            Ingresar
          </RouterLink>
        </li>
        <li>
          <RouterLink
            class="p-2 rounded-sm hover:bg-lime-600 focus:outline-2 focus:outline-offset-2 focus:outline-lime-500 focus:bg-lime-600 focus:text-amber-50"
            to="/registrarse"
          >
            Registrarse
          </RouterLink>
        </li>
      </template>

      <template v-else>
        <li>
          <RouterLink
            class="p-2 rounded-sm hover:bg-lime-600 focus:outline-2 focus:outline-offset-2 focus:outline-lime-500 focus:bg-lime-600 focus:text-amber-50"
            to="/miPerfil"
          >
            Mi perfil
          </RouterLink>
        </li>
        <li>
          <RouterLink
            class="p-2 rounded-sm hover:bg-lime-600 focus:outline-2 focus:outline-offset-2 focus:outline-lime-500 focus:bg-lime-600 focus:text-amber-50"
            to="/publicaciones"
          >
            Muro
          </RouterLink>
        </li>
        <li>
          <form @submit.prevent="handleLogout">
            <button
              type="submit"
              class="p-2 rounded-sm bg-amber-300 text-lime-950 hover:bg-lime-600 focus:outline-2 focus:outline-offset-2 focus:outline-lime-500 focus:bg-lime-600 focus:text-amber-50"
            >
              {{ user.email }} (Cerrar sesión)
            </button>
          </form>
        </li>
      </template>
    </ul>
  </nav>
</template>
