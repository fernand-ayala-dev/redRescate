<script>
import {
  getChatFor,
  fetchChatLastMessages,
  sendChatMessage,
  subscribeToChatNewMessages,
} from "../../service/chatServicio";

import AppChatsForm from "./AppChatsForm.vue";
import { subscribeToAuthStateChanges } from "../../service/authService";
import { getUserProfileById } from "../../service/userService";

let unsubscribeFromChat = () => {};

export default {
  name: "AppChatsList",
  components: { AppChatsForm },

  props: {
    receiverId: { type: String, required: true },
  },

  data() {
    return {
      messages: [],
      myUser: null,
      chatId: null,
      otherUser: null,
    };
  },

  mounted() {
    subscribeToAuthStateChanges(async (user) => {
      if (!user) return;
      this.myUser = user;
      await this.initializeChat();
    });
  },

  unmounted() {
    unsubscribeFromChat();
  },

  methods: {
    async initializeChat() {
      if (!this.myUser || !this.receiverId) return;

      this.otherUser = await getUserProfileById(this.receiverId);

      const chat = await getChatFor(this.myUser.id, this.receiverId);
      this.chatId = chat ? chat.id : null;

      if (!chat) {
        this.messages = [];
        this.noMessages = true;
        return;
      }
    
      this.messages = await fetchChatLastMessages(
        this.myUser.id,
        this.receiverId
      );

      if (!this.messages || this.messages.length === 0) {
        this.noMessages = true;
      } else {
        this.noMessages = false;
      }

      unsubscribeFromChat = await subscribeToChatNewMessages(
        this.myUser.id,
        this.receiverId,
        (msg) => this.messages.push(msg)
      );
    },

    async handleSendPrivateMessage(message) {
      await sendChatMessage(
        message.send_id,
        message.receiver_id,
        message.content
      );
    },
  },
};
</script>

<template>
  <div class="flex gap-4">
    <div
      class="w-full p-4 bg-gray-100 rounded-3xl shadow-inner h-[90vh] overflow-y-auto"
    >
      <div class="flex items-center gap-3 mb-4">
        <div>
          <h2 class="text-xl font-semibold">
            Chat con {{ otherUser?.display_name || "Usuario" }}
          </h2>
          <p class="text-sm text-gray-500">{{ otherUser?.email }}</p>
        </div>
      </div>

      <ol class="flex flex-col gap-4">
        <li
          v-for="(msg, index) in messages"
          :key="index"
          :class="{
            'bg-blue-300 self-end text-right': msg.send_id === myUser?.id,
            'bg-white self-start text-left': msg.send_id !== myUser?.id,
          }"
          class="p-3 rounded-xl shadow-md w-fit max-w-[70%]"
        >
          <p>{{ msg.content }}</p>
          <p class="text-xs text-gray-500 mt-1">
            {{ new Date(msg.created_at).toLocaleString() }}
          </p>
        </li>
      </ol>

      <AppChatsForm
        :receiverId="receiverId"
        @send-private-message="handleSendPrivateMessage"
      />
    </div>
  </div>
</template>
