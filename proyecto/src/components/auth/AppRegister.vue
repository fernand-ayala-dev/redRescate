<script>
import { register } from "../../service/authService.js";
import AppButton from "../AppButton.vue";
export default {
  name: "AppRegister",
  components: {AppButton},
  data() {
    return {
      user: {
        email: "",
        password: "",
      },

      loading: false,
      errorMessage:"",
    };
  },
  methods: {
    async handleRegister() {
       this.errorMessage = "";
      if (!this.user.email || !this.user.password) {
       this.errorMessage = "Por favor completa todos los campos.";
        return;
      }
      try {
        this.loading = true;
        await register(this.user.email, this.user.password);

        this.$router.push("/miPerfil");
      } catch (error) {
        console.log("error de registro");
      }
      this.loading = false;
    },
  },
};
</script>

<template>
  <div
    class="flex w-100 flex-col justify-center items-center mx-auto p-4 rounded-2xl bg-lime-800/35"
  >
    <div class="w-70">
      <img
        src="/logo-selva.png"
        alt="Red Rescate"
        class="mx-auto h-25 w-auto"
      />
      <p class="text-white p-4">Comunidad Red Rescate</p>
    </div>
     <div v-if="errorMessage" class="bg-red-600 rounded-md p-2 mt-2 text-white text-center text-sm">
        {{ errorMessage }}
      </div>
    <div class="w-80">
      <form action="#" @submit.prevent="handleRegister">
        <div class="mb-4">
          <label for="email" class="block mb-1">Email</label>
          <input
            type="email"
            id="email"
            class="w-full p-2 border bg-lime-100 border-gray-300 rounded hover:bg-amber-50 focus:bg-amber-100"
            v-model="user.email"
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block mb-1">Contraseña</label>
          <input
            type="password"
            id="password"
            class="w-full p-2 border bg-lime-100 border-gray-300 rounded hover:bg-amber-50 focus:bg-amber-100"
            v-model="user.password"
          />
        </div>
       
       <AppButton class="w-full">Registrarse</AppButton>
      
      </form>
    
    </div>
  </div>
</template>
