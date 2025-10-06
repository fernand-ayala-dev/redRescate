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

       this.$router.push('/iniciar');
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
  <nav class="flex items-center p-4 gap-8 bg-lime-200">
    <RouterLink class="text-xl" to="/">Red</RouterLink>

    <ul class="flex gap-4">
      <li class="">
        <RouterLink
          class="p-2 rounded-sm hover:bg-lime-600 focus:outline-2 focus:outline-offset-2 focus:outline-lime-500 focus:bg-lime-600 focus:text-amber-50"
          to="/"
          >Home</RouterLink
        >
      </li>
      <template v-if="user.id === null">
        <li class="">
          <RouterLink
            class="p-2 rounded-sm hover:bg-lime-600 focus:outline-2 focus:outline-offset-2 focus:outline-lime-500 focus:bg-lime-600 focus:text-amber-50"
            to="/iniciar"
            >Ingresar</RouterLink
          >
        </li>
        <li class="">
          <RouterLink
            class="p-2 rounded-sm hover:bg-lime-600 focus:outline-2 focus:outline-offset-2 focus:outline-lime-500 focus:bg-lime-600 focus:text-amber-50"
            to="/registrarse"
            >Registrarse</RouterLink
          >
        </li>
      </template>
      <template v-else>
        <li class="">
          <RouterLink
            class="p-2 rounded-sm hover:bg-lime-600 focus:outline-2 focus:outline-offset-2 focus:outline-lime-500 focus:bg-lime-600 focus:text-amber-50"
            to="/miPerfil"
            >Mi perfil</RouterLink
          >
        </li>
        <li class="">
          <RouterLink
            class="p-2 rounded-sm hover:bg-lime-600 focus:outline-2 focus:outline-offset-2 focus:outline-lime-500 focus:bg-lime-600 focus:text-amber-50"
            to="/publicar"
            >Publicar</RouterLink
          >
        </li>
        <li>
          <form action="#" @submit.prevent="handleLogout">
            <button type="submit">{{ user.email }} (Cerrar sesión)</button>
          </form>
        </li>
      </template>
    </ul>
  </nav>
</template>
