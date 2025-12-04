<script>
import AppH1 from '../components/estilos/AppH1.vue';
import AppEditProfile from '../components/profile/AppEditProfile.vue';

export default {
  name: 'Login',
  components: {AppH1 , AppEditProfile},
};
</script>

<template>
<AppH1 class="sr-only">Actualizar mi perfil</AppH1>

<AppEditProfile></AppEditProfile>
</template>
