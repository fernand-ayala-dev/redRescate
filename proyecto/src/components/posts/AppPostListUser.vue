<script>
import { fetchUserPostMessages } from "../../service/postService.js";
import { getUserProfileById } from "../../service/userService.js";
import { getFileURLPost } from "../../service/storage.js";

import AppH2 from "../estilos/AppH2.vue";

export default {
  name: "AppPostListUser",
  components: { AppH2 },

  data() {
    return {
      messages: [],
      user: null,
      loading: false,
    };
  },

  methods: {
    getFileURLPost,
  },

  async mounted() {
    const id = this.$route.params.id;
    this.loading = true;

    try {
      this.user = await getUserProfileById(id);
      this.messages = await fetchUserPostMessages(id); // traer posts del usuario
    } catch (error) {
      console.error("Error al cargar publicaciones del usuario:", error);
    } finally {
      this.loading = false;
    }
  },
};
</script>

<template>
  <section class="p-4">
    <AppH2 class="text-center">
      Publicaciones de {{ user?.display_name || "usuario" }}
    </AppH2>

    <div v-if="loading" class="text-center text-gray-500">Cargando publicaciones...</div>

    <div v-else>
      <div v-if="messages.length === 0" class="text-gray-500 text-center mt-4">
        Este usuario no tiene publicaciones aún.
      </div>

      <div
        v-else
        class="w-9/12 mx-auto h-[80vh] overflow-y-auto p-6 bg-black/10 rounded-3xl shadow-inner border border-gray-200 mt-4"
      >
        <ol class="flex flex-col gap-6">
          <li
            v-for="message in messages"
            :key="message.id"
            class="p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 w-full border border-gray-100"
          >
            <div class="flex items-center gap-3 mb-2">
              <p class="font-semibold text-gray-800">{{ message.email }}</p>
              <p class="text-xs text-gray-500">
                Publicó el {{ new Date(message.created_at).toLocaleString() }}
              </p>
            </div>

            <div class="text-gray-700">{{ message.content }}</div>

            <div v-if="message.file_post" class="mt-2">
              <img
                :src="getFileURLPost(message.file_post)"
                alt="Archivo adjunto"
                class="max-w-full h-auto rounded-lg"
              />
            </div>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>
