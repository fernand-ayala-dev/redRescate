<script>
import { getUserProfileById } from "../../service/userService.js";
import { fetchUserPostMessages } from "../../service/postService.js";
import { getFileURL } from "../../service/storage.js";

import AppH1 from "../estilos/AppH1.vue";
import AppH2 from "../estilos/AppH2.vue";
import AppLoaders from "../estilos/AppLoaders.vue";

import AppPostListUser from "../posts/AppPostListUser.vue";

export default {
  name: "AppProfileUser",
  components: { AppH1, AppH2, AppLoaders, AppPostListUser },
  data() {
    return {
      user: null,
      messages: [],
      loading: true,
    };
  },
  methods: {
    getFileURL,
  },
  async mounted() {
    const id = this.$route.params.id;

    this.loading = true;

    this.user = await getUserProfileById(id);
    this.messages = await fetchUserPostMessages(id);

    this.loading = false;
  },
};
</script>

<template>
  <div class="p-4 bg-amber-300/40">
    

    <div
      v-if="loading"
      class="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
    >
      <AppLoaders />
    </div>

    <section
      v-else
      class="bg-lime-200 rounded-xl shadow-md p-6 border border-gray-200 max-w-3xl mx-auto"
    >
      <div class="flex gap-4">
        <div class="w-3/12 bg-amber-100 p-4 mx-auto text-center">
          <img
            :src="
              user.avatar ? getFileURL(user.avatar) : '/avatar-de-usuario.png'
            "
            alt="avatar"
            class="h-30 w-30 rounded-full border border-lime-100 object-cover"
          />

          <p>{{ user.display_name ?? "Sin nombre..." }}</p>
          <p class="text-sm text-gray-500 mb-2">{{ user.email }}</p>
        </div>

        <div class="w-9/12 p-4 shadow-md">
          <span class="text-lg font-medium text-gray-700 mb-1">Biografía</span>
          <p class="text-gray-600 italic">
            {{ user.biografia ?? "Sin biografía..." }}
          </p>
        </div>
      </div>
    </section>
    <div
      class="w-40 mx-auto mt-5 text-center rounded-md px-3 py-2 text-lg font-medium bg-lime-500 text-white hover:bg-lime-600 transition-colors duration-200"
    >
      <RouterLink v-if="user" :to="`/chats/${user.id}`"> Chatear </RouterLink>
    </div>

    <AppPostListUser />
  </div>
</template>
