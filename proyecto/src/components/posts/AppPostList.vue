<script>
import {
  fetchGlobalPostMessages,
  sendNewGlobalPostMessages,
  subscribeGlobalPostMessages,
} from "../../service/postService.js";
import AppPostForm from "./AppPostForm.vue";
import AppListUser from "../auth/AppListUser.vue";

let unsubscribeFromPost = () => {}
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
    unsubscribeFromPost = subscribeGlobalPostMessages((newMessage) =>
      this.messages.unshift(newMessage)
    );
  },

  unmounted() {
    unsubscribeFromPost();
  },
};
</script>

<template>
  <div
    class="h-40 relative bg-[url('https://www.coolearth.org/wp-content/uploads/2025/07/1108_6b8d64ef3bf89e9-scaled-e1637242723755-2560x1440-c-center.jpeg')] bg-cover bg-no-repeat bg-center p-6 flex flex-col items-center justify-center"
  >
    <p
      class="absolute bottom-4 left-4 text-white text-2xl font-bold bg-black/40 px-3 py-1 rounded"
    >
      Comunidad Red Rescate
    </p>
    <img
      src="/logo-selva.png"
      alt="Logo Selva"
      class="h-30 w-30 rounded-full bg-lime-600 shadow-2xl border-4 border-lime-300"
    />
  </div>

  <section class="flex gap-4 mt-4">
    <div
      class="w-9/12 md:w-9/12 mx-auto h-[100vh] overflow-y-auto p-6 bg-black/10 rounded-3xl shadow-inner border border-gray-200"
    >
      <h2 class="sr-only">Lista de publicaciones</h2>

      <ol class="flex flex-col gap-6">
        <li
          v-for="message in messages"
          :key="message.id"
          class="p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 w-full border border-gray-100"
        >
       
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
    </div>

    <div class="w-3/12">
      <AppPostForm @send-message="handleSendMessage" />
      <AppListUser></AppListUser>
    </div>
  </section>
</template>
