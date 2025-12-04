<script>
import {
  fetchGlobalPostMessages,
  sendNewGlobalPostMessages,
  subscribeGlobalPostMessages,
  deletePost,
} from "../../service/postService.js";

import { subscribeToAuthStateChanges } from "../../service/authService.js";
import { getFileURLPost } from "../../service/storage.js";

import AppPostForm from "./AppPostForm.vue";
import AppListUser from "../auth/AppListUser.vue";

let unsubscribeFromPost = () => {};
let unsubscribeFromAuth = () => {};

export default {
  name: "AppPostList",
  components: { AppPostForm, AppListUser },

  data() {
    return {
      messages: [],
      user: null,
      postEdit: null,
    };
  },

  methods: {
    getFileURLPost,

    async handleSendMessage(message) {
      try {
        await sendNewGlobalPostMessages(message);

        this.postEdit = null;
      } catch (error) {
        console.error("Error al enviar mensaje:", error);
      }
    },

    handlePostUpdated(updatedPost) {
      const index = this.messages.findIndex((m) => m.id === updatedPost.id);
      if (index !== -1) this.messages.splice(index, 1, updatedPost);
      this.postEdit = null; 
    },

    handleEdit(post) {
      this.postEdit = post;

      window.scrollTo({ top: 0, behavior: "smooth" });
    },

    async handleDelete(post) {
      if (!confirm("¿Seguro que quieres eliminar esta publicación?")) return;

      try {
        await deletePost(post);
        this.messages = this.messages.filter((m) => m.id !== post.id);
      } catch (error) {
        console.error("Error al eliminar:", error);
        alert("No se pudo eliminar la publicación.");
      }
    },
  },

  async mounted() {
    this.messages = await fetchGlobalPostMessages();

    unsubscribeFromPost = subscribeGlobalPostMessages((newMessage) => {
      this.messages.unshift(newMessage);
    });

    unsubscribeFromAuth = subscribeToAuthStateChanges((userState) => {
      this.user = userState;
    });
  },

  unmounted() {
    unsubscribeFromPost();
    unsubscribeFromAuth();
  },
};
</script>

<template>
  <div
    class="h-60 relative bg-[url('/fondo-selva.jpeg')] bg-cover bg-no-repeat bg-center p-6 flex flex-col items-center justify-center"
  >
    <p class="relative text-white text-2xl font-bold p-2">
      Comunidad Red Rescate
    </p>
    <img
      src="/logo-selva.png"
      alt="Logo Selva"
      class="h-35 w-35 rounded-full shadow-2xl border-4 border-white"
    />
  </div>

  <section>
    <AppPostForm
      :key="postEdit ? postEdit.id : 'new-post'"
      @send-message="handleSendMessage"
      @post-updated="handlePostUpdated"
      :postEdit="postEdit"
    />
  </section>

  <section class="flex gap-4 mt-4">
    <div
      class="w-9/12 md:w-9/12 mx-auto h-[100vh] overflow-y-auto p-6 bg-black/10 rounded-3xl shadow-inner border border-gray-200"
    >
      <h2 class="sr-only">Lista de publicaciones</h2>

      <ol class="flex flex-col gap-6 mt-4">
        <li
          v-for="message in messages"
          :key="message.id"
          class="p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 w-full border border-gray-100"
        >
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-3">
              <div>
                <p class="font-semibold text-gray-800">{{ message.email }}</p>
                <p class="text-xs text-gray-500">
                  Publicó el {{ new Date(message.created_at).toLocaleString() }}
                </p>
              </div>
            </div>
          </div>

          <div class="text-gray-700 text-base leading-relaxed">
            {{ message.content }}
          </div>

          <!-- Imagen adjunta si existe -->
          <div v-if="message.file_post" class="mt-3">
            <img
              :src="getFileURLPost(message.file_post)"
              alt="Archivo adjunto"
              class="max-w-full h-auto rounded-lg"
            />
          </div>

          <div class="mt-2 flex gap-2">
            <button
              v-if="user.id && message.send_id === user.id"
              @click="handleEdit(message)"
              class="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
            >
              Editar
            </button>

            <button
              v-if="user.id && message.send_id === user.id"
              @click="handleDelete(message)"
              class="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
            >
              Eliminar
            </button>
          </div>
          
        </li>
      </ol>
    </div>

    <div class="w-3/12">
      <AppListUser />
    </div>
  </section>
</template>
