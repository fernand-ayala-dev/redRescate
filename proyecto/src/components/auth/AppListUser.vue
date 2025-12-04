<script>
import { supabase } from "../../service/supabase.js";
import { fechtAllUserProfiles } from "../../service/userService.js";
import AppLoaders from "../estilos/AppLoaders.vue";
import { getFileURL } from "../../service/storage.js";

let unsubscribeFromChat = () => {};
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
    getFileURL,
    handleClick(user) {
      if (this.selectMode) {
        this.$emit("select-user", user.id);
      } else {
        this.$router.push({ name: "perfil", params: { id: user.id } });
      }
    },
  },
  unmounted() {
    unsubscribeFromChat();
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
          class="p-2 border border-lime-500 rounded-md bg-lime-50 hover:bg-lime-200 cursor-pointer flex items-center gap-3"
          @click="handleClick(user)"
        >
          <img
            :src="
              user?.avatar ? getFileURL(user.avatar) : '/avatar-de-usuario.png'
            "
            alt="Avatar"
            class="w-16 h-16 rounded-full object-cover border-2 border-white"
          />
          <p class="font-medium text-lime-900 text-m">
            {{ user.display_name || user.email }}
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>
