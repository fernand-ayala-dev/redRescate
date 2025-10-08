<script>
import { subscribeToAuthStateChanges } from "../../service/authService";

let unsubscribeFromAuth = () => {};

export default {
  name: "AppPostForm",

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
      if (!this.newMessages.content) {
        alert("No puede publicar con el contenido vacio.");
        return;
      }
      try {
        // Emitir al componente padre
        this.$emit("send-message", {
          ...this.newMessages,
          email: this.user.email,
          send_id: this.user.id,
        });
        console.log("mensaje publicado");
        this.newMessages.content = "";
      } catch (error) {
        console.error("Error al enviar mensaje:", error);
      }
    },
  },
};
</script>

<template>
  <h2 class="mb-4 text-xl font-semibold">Escribe tu publicación</h2>

  <form @submit.prevent="handleForm" class="space-y-4">
    <div>
     
    </div>
    <div class="flex items-center gap-3">
      <img
        :src="
          user.avatar ?? 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
        "
        alt="avatar del usuario"
        class="w-10 h-10 rounded-full object-cover border border-gray-200"
      />
 <span
        class="block bg-gray-50 border border-gray-200 rounded p-2 text-gray-600"
      >
        {{ user.email }}
      </span>
    
    </div>
    <div>
      <span
        class="block bg-gray-50 border border-gray-200 rounded p-2 text-gray-600"
      >
        {{ user.display_name }}
      </span>
    </div>

    <div>
      <label for="content" class="block text-gray-700 text-sm mb-1">
        Mensaje
      </label>
      <textarea
        id="content"
        class="w-full p-2 border border-gray-200 rounded"
        v-model="newMessages.content"
        placeholder="Escribe algo..."
      ></textarea>
    </div>

    <button
      type="submit"
      class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-500 transition"
    >
      Enviar
    </button>
  </form>
</template>
