<script>
import {
  fetchGlobalPostMessages,
  sendNewGlobalPostMessages,
  subscribeGlobalPostMessages,
} from "../../service/postService.js";
import AppPostForm from "./AppPostForm.vue";

export default {
  name: "AppPostList",
  components: { AppPostForm },

  data() {
    return {
      messages: [],
    };
  },

  methods: {
 
    async handleSendMessage(message) {
      try {
        const newPost = await sendNewGlobalPostMessages(message);
        if (newPost) {
          // Agregar el mensaje al inicio del array
          this.messages.unshift(newPost);
        }
      } catch (error) {
        console.error("Error al enviar mensaje:", error);
      }
    },
  },

  async mounted() {
    this.messages = await fetchGlobalPostMessages();
    subscribeGlobalPostMessages((newMessage) =>
      this.messages.unshift(newMessage)
    );
  },
};
</script>

<template>
  <div class="">
    <section>
      <AppPostForm @send-message="handleSendMessage" />
    </section>
    <section
      class="overflow-auto w-9/12 h-100 p-4 border border-gray-200 rounded"
    >
      <h2 class="sr-only">Lista de mensajes</h2>
      <ol class="flex flex-col items-start gap-4">
        <li
          v-for="message in messages"
          :key="message.id"
          class="p-4 rounded bg-gray-100"
        >
          <div class="mb-1">
            <span>{{ message.email }}</span> Publicó:
          </div>
          <div class="mb-1">
            <span>{{ message.content }}</span>
          </div>
          <div class="text-s text-gray-700">
            <span>{{ message.created_at }}</span>
          </div>
        </li>
      </ol>
    </section>
    
  </div>
 
</template>
