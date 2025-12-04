<script>
import { login } from "../../service/authService.js";
import AppButton from "../estilos/AppButton.vue";
import AppH2 from "../estilos/AppH2.vue";
export default {
  name: "ApploginForm",
  components: { AppButton, AppH2 },
  data() {
    return {
      user: {
        email: "",
        password: "",
      },

      errorMessage: "",
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
   
    this.errorMessage = "Email o contraseña incorrectos.";
    console.log("Error al iniciar sesión:", error);
  }
},

  },
};
</script>

<template>
 <div class="h-screen flex items-center justify-center px-4 p-6 bg-[url('/banner.jpg')] bg-cover bg-no-repeat bg-top">

  
  <section
  class="flex w-full max-w-md flex-col justify-center mx-auto items-center p-4 rounded-2xl bg-lime-700/55"
>

    <div class="w-70">
      <img
        src="/logo-selva.png"
        alt="Logo red rescate"
        class="mx-auto h-25 w-auto"
      />
      <AppH2 class="text-center text-2xl font-bold text-white">
        Ingresá a tu cuenta
      </AppH2>
    </div>

    <div
      v-if="errorMessage"
      class="bg-red-600 rounded-md p-2 mt-2 text-white text-center text-sm"    >
      {{ errorMessage }}
    </div>

    <div class="w-80">
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
        </div>

        <div class="mt-2 text-center">
          <p class="text-white p-2">
            Si no tenés usuario,
            <RouterLink
              to="/registrarse"
              class="hover:underline underline-offset-4 decoration-white"
            >
              registrate
            </RouterLink>
          </p>
        </div>
      </form>
    </div>
  </section>
</div>

</template>
