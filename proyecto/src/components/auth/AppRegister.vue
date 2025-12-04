<script>
import { register } from "../../service/authService.js";
import AppButton from "../estilos/AppButton.vue";
import AppH2 from "../estilos/AppH2.vue";
export default {
  name: "AppRegister",
  components: { AppButton, AppH2 },
  data() {
    return {
      user: {
        email: "",
        password: "",
      },

      loading: false,
      errorMessage: "",
    };
  },
  methods: {
async handleRegister() {
  this.errorMessage = "";

  if (!this.user.email || !this.user.password) {
    this.errorMessage = "Por favor completa todos los campos.";
    return;
  }

  this.loading = true;

  try {
    const result = await register(this.user.email, this.user.password);

    if (!result.ok) {
      this.errorMessage = result.message;
      return;
    }

    this.$router.push("/mi_perfil");

  } catch (error) {
    console.error("Error al registrar usuario:", error);
    this.errorMessage = "Error inesperado al registrarse.";
  } finally {
    this.loading = false;
  }
}

  },
};
</script>

<template>
  <section
    class="flex w-100 flex-col my-5 justify-center items-center mx-auto p-4 rounded-2xl bg-lime-800/35"
  >
    <div class="w-70">
      <img
        src="/logo-selva.png"
        alt="Red Rescate"
        class="mx-auto h-25 w-auto"
      />
      <AppH2 class="text-center text-2xl font-bold text-white">
        Comunidad Red Rescate
      </AppH2>
    </div>
    <div
      v-if="errorMessage"
      class="bg-red-600 rounded-md p-2 mt-2 text-white text-center text-sm"
    >
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
        <AppButton class="w-full" :disabled="loading">
          {{ loading ? "Registrando..." : "Registrarse" }}
        </AppButton>
      </form>
    </div>
  </section>
</template>
