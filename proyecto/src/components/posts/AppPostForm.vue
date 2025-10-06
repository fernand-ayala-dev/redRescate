<script>
export default {
  name: "AppPostForm",
  data() {
    return {
      newMessages: {
        email: "",
        content: "",
      },
    };
  },
  methods: {
    submitForm() {
      if (!this.newMessages.email || !this.newMessages.content) return;
      // Emitimos un evento al padre con los datos del mensaje
      this.$emit("send-message", { ...this.newMessages });
      
      this.newMessages.content = "";
    },
  },
};
</script>

<template>
  <div>
    <h2 class="mb-4 text-xl">Escribe tu publicación</h2>
    <form @submit.prevent="submitForm">
      <div class="mb-4">
        <label for="email" class="block mb-1">Email</label>
        <input
          type="email"
          id="email"
          class="w-full p-2 border border-gray-200 rounded"
          v-model="newMessages.email"
        />
      </div>
      <div class="mb-4">
        <label for="content" class="block mb-1">Mensaje</label>
        <textarea
          id="content"
          class="w-full p-2 border border-gray-200 rounded"
          v-model="newMessages.content"
        ></textarea>
      </div>
      <button
        type="submit"
        class="transition px-4 py-2 rounded cursor-pointer bg-blue-600 hover:bg-blue-500 focus:bg-blue-500 active:bg-blue-700 text-white"
      >
        Enviar
      </button>
    </form>
  </div>
</template>
