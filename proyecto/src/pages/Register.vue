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
  <AppRegister></AppRegister>
</template>
