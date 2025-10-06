<script>
import {login} from "../../service/authService.js"
export default {
  name: "ApploginForm",
  data() {
    return {
      user: {
        email: "",
        password: "",
        user: null,
      },

      loading: false,
    };
  },
  methods: {
    async handleSubmit() {
      try {
        this.loading=true;
        await login(this.user.email, this.user.password);
        this.$router.push('/miPerfil');
        
      } catch (error) {
        console.log("error de registro")
      }
      this.loading=false;
    },

  },
};
</script>

<template>
  <form action="#" @submit.prevent="handleSubmit">
    <div class="mb-4">
      <label for="email" class="block mb-1">Email</label>
      <input
        type="email"
        id="email"
        class="w-full p-2 border border-gray-300 rounded"
        v-model="user.email"
      />
    </div>
    <div class="mb-4">
      <label for="password" class="block mb-1">Contraseña</label>
      <input
        type="password"
        id="password"
        class="w-full p-2 border border-gray-300 rounded"
        v-model="user.password"
      />
    </div>

    <button
      type="submit"
      class="transition px-4 py-2 rounded cursor-pointer bg-blue-600 hover:bg-blue-500 focus:bg-blue-500 active:bg-blue-700 text-white"
    >
      Ingresar
    </button>
  </form>
</template>
