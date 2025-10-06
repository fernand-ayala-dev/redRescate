<script>
import { subscribeToAuthStateChanges } from "../../service/authService";

import AppH1 from "../AppH1.vue";

export default {
  name: "AppProfileForm",
  components: { AppH1 },
  data() {
    return {
      user: {
        id: null,
        email: null,
        display_name: null,
        biografia: null,
        avatar: null,
      },
    };
  },

  mounted() {
    subscribeToAuthStateChanges(userState => this.user = userState);
  }
};
</script>

<template>
    <RouterLink to="/miPerfil/editar" class="mb-4 text-blue-700 underline">Editar</RouterLink>
  <section class="bg-white rounded-xl shadow-md p-6 border border-gray-200">
    <AppH1>Mi perfil</AppH1>
    <div class="flex items-center gap-4 mb-6">
      <div>
       <img
          :src="user.avatar ?? 'https://via.placeholder.com/80'"
          alt="Avatar"
          class="w-35 h-35 rounded-full object-cover border"
        />
        <h2 class="text-xl font-semibold text-gray-800">
          {{ user.display_name ?? "Sin especificar..." }}
        </h2>
        <p class="text-sm text-gray-500"></p>
      </div>
    </div>

    <!-- Biografía -->
    <div>
      <h3 class="text-lg font-medium text-gray-700 mb-2">Biografía</h3>
      <p class="text-gray-400 italic">
        {{ user.biografia ?? "Sin especificar..." }}
      </p>
    </div>
  </section>
</template>
