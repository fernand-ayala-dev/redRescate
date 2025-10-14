<script>
import AppH1 from '../components/estilos/AppH1.vue';
import AppLoginForm from '../components/auth/AppLoginForm.vue';
export default {
  name: 'Login',
  components: {AppH1,AppLoginForm},
};
</script>

<template>
<AppH1 class="sr-only">Ingreso</AppH1>
<AppLoginForm/> 

</template>
