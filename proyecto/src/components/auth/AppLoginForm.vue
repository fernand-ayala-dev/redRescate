<script>
import { login } from "../../service/authService.js";
import AppButton from "../AppButton.vue";
import AppH2 from "../AppH2.vue";
export default {
  name: "ApploginForm",
  components: {AppButton},
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    
      errorMessage:"",
    };
  },
  methods: {
    async handleSubmit() {
       this.errorMessage = "";
      if (!this.user.email || !this.user.password) {
       this.errorMessage = "Por favor completa todos los campos.";
        return;
      }
      try {
       
        await login(this.user.email, this.user.password);
        this.$router.push("/publicaciones");
      } catch (error) {
        this.$router.push("/registrarse");
        console.log("error de registro");
      }
      
    },
  },
};
</script>

<template>
  <div class="flex w-100 flex-col justify-center items-center mx-auto p-4 rounded-2xl bg-lime-800/35">
    <div class="w-70">
      <img
        src="/logo-selva.png"
        alt="Logo red rescate"
        class="mx-auto h-30 w-auto"
      />
      <AppH2
        class="mt-10 text-center text-2xl font-bold tracking-tight text-white"
      >
        Ingresá a tu cuenta
      </AppH2>
    </div>
      <div v-if="errorMessage" class="bg-red-600 rounded-md p-2 mt-2 text-white text-center text-sm">
        {{ errorMessage }}
      </div>
    <div class="mt-10 w-80">
      <form action="#" @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="email" class="block mb-1">Email</label>
          <input
            type="email"
            id="email"
            placeholder="tuemail@xxxx"
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
        <div class="flex flex-col gap-3">
         <AppButton class="w-full">Ingresar</AppButton>
          <RouterLink
            to="/registrarse"
            class="w-full inline-block px-5 py-3 bg-lime-600 text-center text-white rounded-lg shadow hover:bg-lime-900 transition"
          >
            Registrate
          </RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>
