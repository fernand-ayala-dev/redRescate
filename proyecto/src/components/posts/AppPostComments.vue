<script>
import {
  fetchPostComments,
  sendPostComment,
  subscribePostComments,
} from "../../service/postService.js";
import { subscribeToAuthStateChanges } from "../../service/authService.js";
import { getUserProfileById } from "../../service/userService.js";

let unsubscribeFromAuth = () => {};

export default {
  name: "AppPostComments",
  props: {
    postId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      comments: [],
      newComment: "",
      user: null,
      email: "",
      unsubscribe: null,
      showComments: false,
    };
  },
  methods: {
    async handleSendComment() {
      if (!this.newComment.trim()) return;

      await sendPostComment({
        postId: this.postId,
        userId: this.user.id,
        email: this.user.email,
        content: this.newComment,
      });

      this.newComment = "";
    },
  },
  async mounted() {
    unsubscribeFromAuth = subscribeToAuthStateChanges((user) => {
      this.user = user;
    });

    try {
      this.comments = await fetchPostComments(this.postId);
    } catch (error) {
      console.error("Error al traer comentarios:", error);
    }

    this.unsubscribe = subscribePostComments(
      this.postId,
      async (newComment) => {
        const userProfile = await getUserProfileById(newComment.user_id);
        newComment.user = userProfile;

        this.comments.push(newComment);
      }
    );
  },

  unmounted() {
    if (this.unsubscribe?.unsubscribe) {
      this.unsubscribe.unsubscribe();
    }

    if (unsubscribeFromAuth) {
      unsubscribeFromAuth();
      unsubscribeFromAuth = null;
    }
  },
};
</script>

<template>
  <div class="mt-4 bg-gray-50 p-3 rounded-xl border border-gray-200">
 
    <button
      @click="showComments = !showComments"
      class="text-blue-600 text-sm underline mb-2"
    >
      {{ showComments ? "Ocultar comentarios" : "Ver comentarios" }}
      ({{ comments.length }})
    </button>


    <ul v-if="showComments" class="space-y-2 max-h-60 overflow-y-auto pr-1">
      <li
        v-for="comment in comments"
        :key="comment.id"
        class="bg-white p-2 border rounded shadow-sm"
      >
        <p class="font-semibold text-sm text-gray-700">
          {{ comment.user?.display_name || comment.user?.email || "Usuario" }}
          <p>id:{{ comment.user_id }}</p>
        </p>
        <p class="text-sm text-gray-800 mt-1">{{ comment.content }}</p>
        <p class="text-xs text-gray-500">
          {{ new Date(comment.created_at).toLocaleString() }}
        </p>
      </li>
    </ul>

   
    <div class="mt-3 flex gap-2">
      <input
        v-model="newComment"
        type="text"
        placeholder="Escribe un comentario..."
        class="flex-1 p-2 border rounded"
      />
      <button
        @click="handleSendComment"
        class="bg-lime-600 text-white px-3 rounded hover:bg-lime-700"
      >
        Enviar
      </button>
    </div>
  </div>
</template>
