<script>
import AppH1 from "../components/AppH1.vue";

import AppProfileForm from "../components/profile/AppProfileForm.vue";

export default {
  name: "Profile",
  components: { AppH1 , AppProfileForm},

};
</script>

<template>
  <AppH1 class="sr-only">Mi perfil</AppH1>
<AppProfileForm/>

</template>
