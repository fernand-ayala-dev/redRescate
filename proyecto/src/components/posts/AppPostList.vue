<script>
import {
  fetchGlobalPostMessages,
  sendNewGlobalPostMessages,
  subscribeGlobalPostMessages,
} from "../../service/postService.js";
import AppPostForm from "./AppPostForm.vue";
import AppListUser from "../auth/AppListUser.vue";
let unsubscribeFromAuth = () => {};
export default {
  name: "AppPostList",
  components: { AppPostForm, AppListUser },

  data() {
    return {
      messages: [],
    };
  },

  methods: {
    async handleSendMessage(message) {
      try {
        await sendNewGlobalPostMessages(message);
      } catch (error) {
        console.error("Error al enviar mensaje:", error);
      }
    },
  },

  async mounted() {
    this.messages = await fetchGlobalPostMessages();
    unsubscribeFromAuth = subscribeGlobalPostMessages((newMessage) =>
      this.messages.unshift(newMessage)
    );
  },

  unmounted() {
    unsubscribeFromAuth();
  },
};
</script>

<template>
 
   <div class="h-80 relative bg-[url('/banner-selva.jpg')] bg-cover bg-no-repeat bg-center p-6">
  <p class="absolute bottom-4 left-4 text-white text-2xl font-bold bg-black/40 px-3 py-1 rounded">
    Comunidad Red Rescate
  </p>
</div>


   

  <div class="flex gap-4">
    <section
      class="w-9/12 md:w-9/12 mx-auto h-[100vh] overflow-y-auto p-6 bg-gray-50 rounded-2xl shadow-inner border border-gray-200"
    >
      <h2 class="sr-only">Lista de publicaciones</h2>

      <ol class="flex flex-col gap-6">
        <li
          v-for="message in messages"
          :key="message.id"
          class="p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 w-full border border-gray-100"
        >
          <!-- Encabezado del post -->
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-3">
              <img
                :src="
                  message.avatar ??
                  'https://cdn-icons-png.flaticon.com/512/149/149071.png'
                "
                alt="avatar"
                class="w-10 h-10 rounded-full object-cover border border-gray-200"
              />
              <div>
                <p class="font-semibold text-gray-800">
                  {{ message.email }}
                </p>
                <p class="text-xs text-gray-500">
                  Publicó el {{ new Date(message.created_at).toLocaleString() }}
                </p>
              </div>
            </div>
          </div>

          <div class="text-gray-700 text-base leading-relaxed">
            {{ message.content }}
          </div>
        </li>
      </ol>
    </section>

    <section class="w-3/12">
        <AppPostForm @send-message="handleSendMessage" />
      <AppListUser></AppListUser>
    </section>
  </div>
</template>
