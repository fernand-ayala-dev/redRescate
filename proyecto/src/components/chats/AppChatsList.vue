<script>
import {
  getChatFor,
  fetchChatLastMessages,
  sendChatMessage,
  subscribeToChatNewMessages,
  createChat,
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
      noMessages: false,
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

  unsubscribeFromChat();

  this.otherUser = await getUserProfileById(this.receiverId);

  const chat = await getChatFor(this.myUser.id, this.receiverId);

  if (!chat) {
    this.chatId = null;
    this.messages = [];
    this.noMessages = true;
    return;
  }

  this.chatId = chat.id;

  this.messages = await fetchChatLastMessages(
    this.myUser.id,
    this.receiverId
  );
  this.noMessages = this.messages.length === 0;

 
  unsubscribeFromChat = await subscribeToChatNewMessages(
    this.myUser.id,      
    this.receiverId,    
    (msg) => {
     
      if (String(msg.chat_id) === String(this.chatId)) {
        this.messages = [...this.messages, msg];
      }
    }
  );
},


    async handleSendPrivateMessage(message) {
  if (!this.chatId) {
    const newChat = await createChat(this.myUser.id, this.receiverId);
    this.chatId = newChat.id;

  
    unsubscribeFromChat = await subscribeToChatNewMessages(
      this.myUser.id,     
      this.receiverId,     
      (msg) => {
        this.messages.push(msg);
      }
    );
  }

  await sendChatMessage(
    message.send_id,
    message.receiver_id,
    message.content
  );

  this.noMessages = false;
}
  }
};
</script>
<template>
  <div class="flex gap-4">
    <div
      class="w-full p-4 bg-gray-900 rounded-3xl shadow-inner h-[90vh] flex flex-col"
    >
     
      <div class="flex items-center gap-3 mb-4">
        <div>
          <p class="text-sm text-lime-500"> Chat con {{ otherUser?.email }}</p>
        </div>
      </div>

      <ol class="flex-1 overflow-y-auto flex flex-col gap-4 mb-4">
        <li
          v-for="msg in messages"
          :key="msg.id"
          :class="{
            'bg-lime-200 self-end text-right rounded-br-none': msg.send_id === myUser?.id,
            'bg-white self-start text-left rounded-bl-none': msg.send_id !== myUser?.id,
          }"
          class="p-3 rounded-xl shadow-md w-fit max-w-[70%]"
        >
          <p>{{ msg.content }}</p>
          <p class="text-xs text-gray-500 mt-1">
            {{ new Date(msg.created_at).toLocaleString() }}
          </p>
        </li>
      </ol>

   
      <div>
        <AppChatsForm
          :receiverId="receiverId"
          @send-private-message="handleSendPrivateMessage"
        />
      </div>
    </div>
  </div>
</template>

