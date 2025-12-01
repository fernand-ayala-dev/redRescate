<script>
import { subscribeToAuthStateChanges } from "../../service/authService";
import AppButton from "../estilos/AppButton.vue";

let unsubscribeFromAuth = () => {};

export default {
  name: "AppChatsForm",
  components: { AppButton },
  emits: ["send-private-message"],

  props: {
    receiverId: { type: String, required: true },
  },

  data() {
    return {
      text: "",
      user: null,
      errorMessage: "",
      trueMessage: "",
    };
  },

  mounted() {
    unsubscribeFromAuth = subscribeToAuthStateChanges(
      (state) => (this.user = state)
    );
  },

  unmounted() {
    unsubscribeFromAuth();
  },

  methods: {
    handleSend() {
      this.errorMessage = "";
      this.trueMessage = "";

      if (!this.text.trim()) {
        this.errorMessage = "Escribe un mensaje...";
        return;
      }

      if (!this.user?.id) {
        this.errorMessage = "No se pudo identificar al usuario.";
        return;
      }

      this.$emit("send-private-message", {
        content: this.text.trim(),
        send_id: this.user.id,
        receiver_id: this.receiverId,
      });

      this.text = "";
      this.trueMessage = "Mensaje enviado";

      setTimeout(() => (this.trueMessage = ""), 2000);
    },
  },
};
</script>

<template>
  <div class="bg-white rounded-xl p-4 shadow-md">

    <div v-if="errorMessage" class="bg-red-500 text-white p-2 rounded text-sm mb-2">
      {{ errorMessage }}
    </div>

    <div v-if="trueMessage" class="bg-green-500 text-white p-2 rounded text-sm mb-2">
      {{ trueMessage }}
    </div>

    <form @submit.prevent="handleSend" class="space-y-3">
      <textarea
        v-model="text"
        class="w-full border border-gray-400 rounded p-3"
        placeholder="Escribe un mensaje privado..."
      ></textarea>

      <AppButton class="w-full">Enviar</AppButton>
    </form>
    
  </div>
</template>
