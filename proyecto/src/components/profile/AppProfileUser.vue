<script>
import { getUserProfileById } from "../../service/userService.js";
import { fetchUserPostMessages } from "../../service/postService.js";


import AppH1 from "../estilos/AppH1.vue";
import AppH2 from "../estilos/AppH2.vue";
import AppLoaders from "../estilos/AppLoaders.vue";

export default {
  name: "AppProfileUser",

  data() {
    return {
      user: null,
      messages: [],
      loading: true,
      fallbackURL: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    };
  },

  async mounted() {
    const id = this.$route.params.id;

    this.loading = true;

    this.user = await getUserProfileById(id);
    this.messages = await fetchUserPostMessages(id);

    this.loading = false;
  },

  components: { AppH1, AppH2, AppLoaders },
};
</script>

<template>
  <div class="p-4 bg-amber-300/40">
    <AppH1>Visitando perfil</AppH1>

    
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
          <img :src="user?.avatar || fallbackURL" class="rounded-xl" />

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

    <div v-if="!loading" class="p-4">
      <AppH2 class="text-center">Publicaciones</AppH2>

      <div v-if="messages.length === 0" class="text-gray-500">
        Este usuario no tiene publicaciones aún.
      </div>

      <div
        v-else
        class="w-9/12 mx-auto h-[80vh] overflow-y-auto p-6 bg-black/10 rounded-3xl shadow-inner border border-gray-200"
      >
        <ol class="flex flex-col gap-6">
          <li
            v-for="message in messages"
            :key="message.id"
            class="p-5 bg-white rounded-xl shadow-sm w-full border border-gray-100"
          >
            <div class="flex items-center gap-3 mb-3">
              <img
                :src="message.avatar ?? fallbackURL"
                class="w-10 h-10 rounded-full object-cover border border-gray-200"
              />
              <div>
                <p class="font-semibold text-gray-800">{{ message.email }}</p>
                <p class="text-xs text-gray-500">
                  Publicó el {{ new Date(message.created_at).toLocaleString() }}
                </p>
              </div>
            </div>

            <div class="text-gray-700">
              {{ message.content }}
            </div>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>
