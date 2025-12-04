<script>
import { subscribeToAuthStateChanges } from "../../service/authService";
import { getFileURL, deleteFilePost } from "../../service/storage";
import {
  uploadPostImage,
  updatePostContent,
  updatePostFile,
} from "../../service/postService";
import AppButton from "../estilos/AppButton.vue";

let unsubscribeFromAuth = () => {};

export default {
  name: "AppPostForm",
  components: { AppButton },
  emits: ["send-message", "post-updated"],
  props: {
    postEdit: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      newMessages: { content: "", file_post: null },
      user: { id: null, email: null, display_name: null, avatar: null },
      errorMessage: "",
      trueMessage: "",
      loading: false,
    };
  },
  computed: {
    contentToEdit: {
      get() {
        return this.postEdit?.content || this.newMessages.content;
      },
      set(value) {
        this.newMessages.content = value;
      },
    },

    previewImage() {
      if (this.newMessages.file_post)
        return URL.createObjectURL(this.newMessages.file_post);
      if (this.postEdit?.file_post) return getFileURL(this.postEdit.file_post);
      return null;
    },
  },
  mounted() {
    unsubscribeFromAuth = subscribeToAuthStateChanges((user) => {
      this.user = user;
    });
  },
  unmounted() {
    unsubscribeFromAuth();
  },
  methods: {
    getFileURL,
    handleFile(event) {
      const file = event.target.files[0];
      if (file) this.newMessages.file_post = file;
    },
    async handleForm() {
      this.errorMessage = "";
      this.trueMessage = "";

      if (
        !this.newMessages.content &&
        !this.newMessages.file_post &&
        !this.postEdit
      ) {
        this.errorMessage = "No puede publicar con el contenido vacío.";
        return;
      }

      try {
        this.loading = true;
        let uploadedFilePath = this.postEdit?.file_post || null;
        /**
         * para editar
         * subir archivo si hay
         */

        if (this.newMessages.file_post) {
          uploadedFilePath = await uploadPostImage(
            this.newMessages.file_post,
            this.user.id
          );
          if (this.postEdit?.file_post)
            await deleteFilePost(this.postEdit.file_post);
        }
        /**
         * actualizar si hay exixtente
         */
        if (this.postEdit) {
          await updatePostContent(
            this.postEdit.id,
            this.user.id,
            this.newMessages.content
          );
          if (this.newMessages.file_post)
            await updatePostFile(
              this.postEdit.id,
              this.user.id,
              uploadedFilePath
            );

          this.$emit("post-updated", {
            ...this.postEdit,
            content: this.newMessages.content,
            file_post: uploadedFilePath,
          });

          this.trueMessage = "Publicación actualizada";
        } else {
          /**
           * crear un nuevo post
           */
          this.$emit("send-message", {
            content: this.newMessages.content,
            file_post: uploadedFilePath,
            email: this.user.email,
            send_id: this.user.id,
          });
          this.trueMessage = "Mensaje publicado";
        }

        this.newMessages = { content: "", file_post: null };
        setTimeout(() => {
          this.trueMessage = "";
          this.errorMessage = "";
        }, 3000);
      } catch (error) {
        console.error("Error al guardar la publicación:", error);
        this.errorMessage = "Error al guardar la publicación.";
        setTimeout(() => {
          this.errorMessage = "";
        }, 3000);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<template>
  <section>
    <div class="mx-0 bg-lime-50 rounded-3xl p-4 mb-7 shadow-md">
      <form @submit.prevent="handleForm" class="flex flex-col gap-3">
        <div class="flex items-center gap-3">
          <img
            :src="getFileURL(user.avatar || '/avatar-de-usuario.png')"
            alt="Avatar"
            class="w-14 h-14 rounded-full object-cover border-2 border-white"
          />
          <span class="font-medium text-gray-700 text-lg">
            {{user.display_name }}</span>
        </div>

        <textarea
          v-model="contentToEdit"
          placeholder="Escribí tu publicación aquí"
          class="w-full p-3 border border-gray-300 rounded resize-none focus:ring focus:ring-lime-300 text-gray-700"
          rows="3"
        ></textarea>

        <div v-if="previewImage" class="mt-2">
          <img :src="previewImage" class="max-w-full h-auto rounded-lg" />
        </div>

        <div class="flex items-center justify-between mt-2">
          <label
            for="image"
            class="flex items-center gap-2 cursor-pointer bg-gray-500 hover:bg-lime-600 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
          >
            Agregar imagen
          </label>
          <input type="file" id="image" class="sr-only" @change="handleFile" />
          <AppButton
            :disabled="loading"
            class="w-100 px-6 py-2 text-white bg-lime-600 hover:bg-lime-700"
          >
            {{ postEdit ? "Actualizar" : "Publicar" }}
          </AppButton>
        </div>

        <div v-if="errorMessage" class="bg-red-500 p-2">
          <p class="text-white lg text-center">{{ errorMessage }}</p>
        </div>
        <div v-if="trueMessage" class="bg-green-600">
          <p class="text-white sm text-center p-2">{{ trueMessage }}</p>
        </div>
      </form>
    </div>
  </section>
</template>
