<script>
import AppListUser from "../components/auth/AppListUser.vue";
import AppChatsForm from "../components/chats/AppChatsForm.vue";
import AppChatsList from "../components/chats/AppChatsList.vue";
import { subscribeToAuthStateChanges } from "../service/authService";

export default {
  name: "Chats",

  components: {
    AppListUser,
    AppChatsList,
    AppChatsForm
  },

  data() {
    return {
      myUser: null,
      selectedUserId: null,
    };
  },

  mounted() {
    subscribeToAuthStateChanges((user) => {
      this.myUser = user;
    });
  },

  methods: {
    handleSelectUser(userId) {
      this.selectedUserId = userId;
    },
  },
};
</script>

<template>
  <div class="flex h-screen bg-gray-200">

    <div class="w-3/12 bg-white shadow-xl p-4 overflow-y-auto">
      <h2 class="text-xl font-bold mb-4">Usuarios</h2>

      <AppListUser select-mode @select-user="handleSelectUser" />

      <p v-if="!selectedUserId" class="text-gray-600 text-sm mt-4">
        Selecciona un usuario para comenzar un chat.
      </p>
    </div>

    <div class="w-9/12 p-6 flex flex-col">
      <div v-if="selectedUserId" class="flex flex-col h-full">

        <AppChatsList :receiverId="selectedUserId" :key="selectedUserId" />

      </div>

      <div
        v-else
        class="h-full flex items-center justify-center text-gray-500 text-lg"
      >
        Selecciona un usuario para ver el chat
      </div>
    </div>

  </div>
</template>

