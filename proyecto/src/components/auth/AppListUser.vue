<script>
import {
  fechtAllUserProfiles,
  getUserProfileById,
} from "../../service/userService.js";
import AppLoaders from "../estilos/AppLoaders.vue";

export default {
  name: "AppListUser",
  components: { AppLoaders },

  props: {
    selectMode: { type: Boolean, default: false }, 
    // true ➜ emitir evento
    // false ➜ ir a perfil
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
        // 👉 modo chat: emitir evento
        this.$emit("select-user", user.id);
      } else {
        // 👉 modo normal: ir a perfil
        this.$router.push({ name: "perfil", params: { id: user.id } });
      }
    },
  },
};
</script>

<template>
  <section>
    <template v-if="!loading">
      <div class="p-4 bg-lime-400/50 rounded-3xl">
        <h3 class="text-xl font-semibold mb-3 text-lime-800">
          Comunidad Activa
        </h3>

        <ul class="space-y-2">
          <li
            v-for="u in users"
            :key="u.id"
            class="p-3 border border-lime-500 rounded-md bg-lime-50 hover:bg-lime-200 cursor-pointer"
            @click="handleClick(u)"
          >
            <p class="font-medium text-lime-900">
              {{ u.display_name || "Usuario" }}
            </p>
            <p class="text-sm text-gray-600">{{ u.email }}</p>
          </li>
        </ul>
      </div>
    </template>

    <template v-else>
      <AppLoaders />
    </template>
  </section>
</template>
