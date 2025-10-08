<script>
import AppH1 from "../components/AppH1.vue";
import AppRegister from "../components/auth/AppRegister.vue";

export default {
  name: "Register",
  components: { AppH1, AppRegister },
};
</script>
<template>
  <AppH1>Register</AppH1>
  <p class="m-1 p-2 text-center text-2xl font-semibold text-red-700">Para poder acceder a la comunidad debe Registrarse!</p>
  <AppRegister></AppRegister>
</template>
