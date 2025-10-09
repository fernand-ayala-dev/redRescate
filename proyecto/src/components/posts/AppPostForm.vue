<script>
import { subscribeToAuthStateChanges } from "../../service/authService";
import AppButton from "../AppButton.vue";

let unsubscribeFromAuth = () => {};

export default {
  name: "AppPostForm",
  components: { AppButton },
  emits: ["send-message"],
  data() {
    return {
      newMessages: { content: "" },
      user: {
        id: null,
        email: null,
        display_name: null,
        avatar: null,
      },
      errorMessage: "",
      trueMessage: "",
    };
  },
  async mounted() {
    //cargando mi user autentificado
    unsubscribeFromAuth = subscribeToAuthStateChanges(
      (userState) => (this.user = userState)
    );
  },
  unmounted() {
    unsubscribeFromAuth();
  },
  methods: {
    async handleForm() {
      this.errorMessage = "";
      this.trueMessage = "";

      if (!this.newMessages.content) {
        this.errorMessage = "No puede publicar con el contenido vacio.";
        return;
      }
      try {
        // Emitir al componente padre
        this.$emit("send-message", {
          ...this.newMessages,
          email: this.user.email,
          send_id: this.user.id,
        });

        this.trueMessage = "mensaje publicado";
        this.newMessages.content = "";

        setTimeout(() => {
          this.trueMessage = "";
        }, 3000);
      } catch (error) {
        console.error("Error al enviar mensaje:", error);
      }
    },
  },
};
</script>

<template>
  <h2 class="sr-only">Escribe tu publicación</h2>
  <div class="flex gap-4">
    <div class="w-9/12 mx-0 bg-lime-700/40 rounded-3xl p-4 mb-7 shadow-xl">
      <form @submit.prevent="handleForm" class="space-y-4">
        <div class="flex items-center gap-3">
          <img
            :src="
              user.avatar ??
              'https://cdn-icons-png.flaticon.com/512/149/149071.png'
            "
            alt="avatar del usuario"
            class="w-20 h-20 rounded-full object-cover border border-gray-200 shadow-lg"
          />
          <span
            class="block bg-gray-50 border border-gray-200 rounded p-2 text-gray-600 text-shadow-xs"
          >
            {{ user.display_name }}
          </span>
        </div>

        <div
          v-if="errorMessage"
          class="bg-red-600 rounded-md p-2 mt-2 text-white text-center text-sm"
        >
          {{ errorMessage }}
        </div>
        <div
          v-if="trueMessage"
          class="bg-green-500 rounded-md p-2 mt-2 text-white text-center text-sm"
        >
          {{ trueMessage }}
        </div>
        <div>
          <label for="content" class="block text-gray-700 text-sm mb-1">
            Publicar en muro..
          </label>
          <textarea
            id="content"
            class="w-full p-2 border border-gray-500 rounded bg-amber-100/40 focus:bg-amber-50"
            v-model="newMessages.content"
            placeholder="Escribe algo..."
          ></textarea>
        </div>

        <AppButton>Enviar</AppButton>
      </form>
    </div>
    <div class="w-3/12 mx-0 bg-lime-700/40 rounded-3xl p-4 mb-7 shadow-xl">
      <div>
          <img
            :src="
              user.avatar ??
              'https://cdn-icons-png.flaticon.com/512/149/149071.png'
            "
            alt="avatar del usuario"
            class="w-full rounded-e-full object-cover border border-gray-200 shadow-lg"
          />
      </div>
    </div>
  </div>
</template>
