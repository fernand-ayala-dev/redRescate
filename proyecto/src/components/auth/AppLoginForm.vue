<script>
import { login } from "../../service/authService.js";
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
        this.loading = true;
        await login(this.user.email, this.user.password);
        this.$router.push("/publicaciones");
      } catch (error) {
        this.$router.push("/registrarse")
        console.log("error de registro");
      }
      this.loading = false;
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
    <div class="flex flex-wrap gap-3">
      <button
        type="submit"
        class="inline-block px-5 py-3 bg-lime-600 text-white rounded-lg shadow hover:bg-lime-900 transition"
      >
        Ingresar
      </button>

      <RouterLink
        to="/registrarse"
        class="inline-block px-5 py-3 bg-lime-600 text-white rounded-lg shadow hover:bg-lime-900 transition"
      >
        Registrate
      </RouterLink>
    </div>
  </form>
</template>
