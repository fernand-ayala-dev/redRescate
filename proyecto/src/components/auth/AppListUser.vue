<script>
import {
  fechtAllUserProfiles,
  getUserProfileById,
} from "../../service/userService.js";
import AppLoaders from "../estilos/AppLoaders.vue";

export default {
  name: "AppListUser",
  components: { AppLoaders },
  data() {
    return {
      users: [],
      loading: false,
      user: {
        id: null,
        email: null,
        display_name: null,
        biografia: null,
        avatar: null,
      },
    };
  },
  async mounted() {
    this.loading = true;
    this.users = await fechtAllUserProfiles();
    this.user = await getUserProfileById(this.$route.params.id);
    this.loading = false;
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
            class="p-3 border border-lime-500 rounded-md bg-lime-50 hover:bg-lime-200"
          >
            <router-link
              :to="{ name: 'perfil', params: { id: u.id } }"
              class="block cursor-pointer"
            >
              <p class="font-medium text-lime-900">
                {{ u.display_name || "Usuario" }}
              </p>
              <p class="text-sm text-gray-600">{{ u.email }}</p>
            </router-link>
          </li>
        </ul>
      </div>
    </template>
    <template v-else>
      <AppLoaders></AppLoaders>
    </template>
  </section>
</template>
