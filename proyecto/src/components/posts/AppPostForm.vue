<script>
import { subscribeToAuthStateChanges } from "../../service/authService";
import {
  uploadPostImage,
  updatePostContent,
  updatePostFile,
} from "../../service/postService";
import { getFileURL, deleteFilePost } from "../../service/storage";
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
      newMessages: {
        content: this.postEdit?.content || "",
        file_post: null,
      },
      avatarPreview: this.postEdit?.file_post
        ? getFileURL(this.postEdit.file_post)
        : null,
      user: { id: null, email: null, display_name: null, avatar: null },
      errorMessage: "",
      trueMessage: "",
      loading: false,
    };
  },
  watch: {
    postEdit(newPost) {
      this.newMessages.content = newPost?.content || "";
      this.newMessages.file_post = null;
      this.avatarPreview = newPost?.file_post
        ? getFileURL(newPost.file_post)
        : null;
    },
  },
  mounted() {
    unsubscribeFromAuth = subscribeToAuthStateChanges((userState) => {
      this.user = userState;
    });
  },
  unmounted() {
    unsubscribeFromAuth();
  },
  methods: {
    getFileURL,
    handleFile(event) {
      const file = event.target.files[0];
      if (file) {
        this.newMessages.file_post = file;
        this.avatarPreview = URL.createObjectURL(file);
      }
    },
    async handleForm() {
      this.errorMessage = "";
      this.trueMessage = "";

      if (!this.newMessages.content.trim()) {
        this.errorMessage = "No puede publicar contenido vacío.";
        return;
      }

      this.loading = true;
      try {
        let uploadedFilePath = this.postEdit?.file_post || null;

       
        if (this.newMessages.file_post) {
          uploadedFilePath = await uploadPostImage(
            this.newMessages.file_post,
            this.user.id
          );

          if (this.postEdit?.file_post) {
            await deleteFilePost(this.postEdit.file_post);
          }
        }

        if (this.postEdit) {
       
          await updatePostContent(
            this.postEdit.id,
            this.user.id,
            this.newMessages.content
          );

          if (this.newMessages.file_post) {
            await updatePostFile(
              this.postEdit.id,
              this.user.id,
              this.postEdit.file_post,
              this.newMessages.file_post
            );
          }

          this.$emit("post-updated", {
            ...this.postEdit,
            content: this.newMessages.content,
            file_post: uploadedFilePath,
          });

          this.trueMessage = "Publicación actualizada";
        } else {
        
          this.$emit("send-message", {
            content: this.newMessages.content,
            file_post: uploadedFilePath,
            email: this.user.email,
            send_id: this.user.id,
          });

          this.trueMessage = "Mensaje publicado";
        }

       
        this.newMessages = { content: "", file_post: null };
        this.avatarPreview = null;

        setTimeout(() => (this.trueMessage = ""), 3000);
      } catch (error) {
        console.error("Error al guardar la publicación:", error);
        this.errorMessage = "Error al guardar la publicación.";
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
        <!-- Usuario -->
        <div class="flex items-center gap-3">
          <img
            :src="getFileURL(user.avatar || '/default-avatar.png')"
            alt="Avatar"
            class="w-14 h-14 rounded-full object-cover border-2 border-white"
          />
          <span class="font-medium text-gray-700 text-lg">{{
            user.display_name || user.email
          }}</span>
        </div>

       
        <textarea
          v-model="newMessages.content"
          placeholder="Escribí aquí lo que quieras"
          class="w-full p-3 border border-gray-300 rounded resize-none focus:ring focus:ring-lime-300 text-gray-700"
          rows="3"
        />

       
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <label
              for="image"
              class="flex items-center gap-2 cursor-pointer bg-gray-500 hover:bg-lime-600 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
            >
              Agregar imagen
            </label>
            <input
              type="file"
              id="image"
              class="sr-only"
              @change="handleFile"
            />
            <span v-if="avatarPreview" class="text-sm text-gray-600">
              {{ newMessages.file_post  ? newMessages.file_post.name : "Archivo existente" }}
            </span>
          </div>

          <AppButton
            :disabled="loading"
            class="w-80 px-6 py-2 text-white bg-lime-600 hover:bg-lime-700"
          >
            {{ postEdit ? "Actualizar" : "Publicar" }}
          </AppButton>
        </div>

       
        <div v-if="errorMessage" class="text-red-600 text-sm mt-1">
          {{ errorMessage }}
        </div>
        <div v-if="trueMessage" class="text-green-600 text-sm mt-1">
          {{ trueMessage }}
        </div>
      </form>
    </div>
  </section>
</template>
