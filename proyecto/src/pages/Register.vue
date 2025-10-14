<script>
import AppH1 from "../components/estilos/AppH1.vue";
import AppRegister from "../components/auth/AppRegister.vue";

export default {
  name: "Register",
  components: { AppH1, AppRegister },
};
</script>
<template>
  <AppH1 class="sr-only">Registrarme</AppH1>
  <p class="mt-5 mb-3 p-3 text-center text-2xl font-semibold text-lime-700">Para poder acceder a la comunidad debe Registrarse!</p>
  <AppRegister></AppRegister>
</template>
