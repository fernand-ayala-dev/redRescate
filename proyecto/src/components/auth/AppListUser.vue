<script>
import { fechtAllUserProfiles } from "../../service/userService.js";

export default {
  name: "AppListUser",
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
    goToProfile(id) {
      this.$router.push('/perfil/:id' , params= { id } );
    },
  },
};
</script>

<template>
  <div class="p-4 bg-lime-700/50">
    <h3 class="text-xl font-semibold mb-3 text-lime-800">Comunidad Activa</h3>

    <ul class="space-y-2">
      <li
        v-for="u in users"
        :key="u.id"
        class="p-3 border border-lime-500 rounded-md bg-lime-50 hover:bg-lime-100 transition"
      >
        <router-link
          :to="{ name: 'perfil', params: { id: u.id } }"
          class="block cursor-pointer"
        >
          <p class="font-medium text-lime-900">{{ u.display_name || 'Sin nombre' }}</p>
          <p class="text-sm text-gray-600">{{ u.email }}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

