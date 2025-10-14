<script>
import AppH1 from "../components/estilos/AppH1.vue";

import AppProfileForm from "../components/profile/AppMyProfileForm.vue";

export default {
  name: "MyProfile",
  components: { AppH1 , AppProfileForm},

};
</script>

<template>
  <AppH1 class="sr-only">Mi perfil</AppH1>
<AppProfileForm/>

</template>
