<script>
import {
  fechtAllUserProfiles,
  
} from "../../service/userService.js";
import AppLoaders from "../estilos/AppLoaders.vue";

export default {
  name: "AppListUser",
  components: { AppLoaders },

  props: {
    selectMode: { type: Boolean, default: false }, 
    
  },

  data() {
    return {
      users: [],
      loading: false,
    };
  },

  async mounted() {
    this.loading = true;
    this.users = await fechtAllUserProfiles();
    this.loading = false;
  },

  methods: {
    handleClick(user) {
      if (this.selectMode) {
      
        this.$emit("select-user", user.id);
      } else {
        
        this.$router.push({ name: "perfil", params: { id: user.id } });
      }
    },
  },
};
</script>

<template>
  <section class="relative min-h-screen">

  
    <div
      v-if="loading"
      class="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
    >
      <AppLoaders />
    </div>

    <div v-else class="p-4 bg-lime-400/50 rounded-3xl mx-auto max-w-md mt-10">
      <h3 class="text-xl font-semibold mb-3 text-lime-800 text-center">
        Comunidad Activa
      </h3>

      <ul class="space-y-2">
        <li
          v-for="user in users"
          :key="user.id"
          class="p-3 border border-lime-500 rounded-md bg-lime-50 hover:bg-lime-200 cursor-pointer"
          @click="handleClick(user)"
        >
          <p class="font-medium text-lime-900">
            {{ user.display_name || "Usuario" }}
          </p>
          <p class="text-sm text-gray-600">{{ user.email }}</p>
        </li>
      </ul>
    </div>

  </section>
</template>
