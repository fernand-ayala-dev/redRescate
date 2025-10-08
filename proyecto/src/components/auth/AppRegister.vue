<script>
import {register} from "../../service/authService.js"
export default {
  name: "AppRegister",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },

      loading: false,
    };
  },
  methods: {
    async handleRegister() {
       if (!this.user.email || !this.user.password) {
      alert("Por favor, completa todos los campos antes de registrarte.");
      return;
    }
      try {
        this.loading=true;
        await register(this.user.email, this.user.password);

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
  <form action="#" @submit.prevent="handleRegister">
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
      Enviar
    </button>
  </form>
</template>
