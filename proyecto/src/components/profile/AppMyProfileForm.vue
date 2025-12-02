<script>
import { subscribeToAuthStateChanges } from "../../service/authService.js";
import {
  fetchUserPostMessages,
  sendNewGlobalPostMessages,
  subscribeGlobalPostMessages
} from "../../service/postService.js";
import AppH1 from "../estilos/AppH1.vue";
import AppH2 from "../estilos/AppH2.vue";
import AppPostForm from "../posts/AppPostForm.vue";

let unsubscribeFromAuth = () => {};
export default {
  name: "AppProfileForm",
  components: { AppH1, AppH2, AppPostForm },

  data() {
    return {
      messages: [],
      user: {
        id: null,
        email: null,
        display_name: null,
        biografia: null,
        avatar: null,
      },
    };
  },

  methods: {
    async handleSendMessage(message) {
      try {
        await sendNewGlobalPostMessages(message);
      } catch (error) {
        console.error("Error al enviar mensaje:", error);
      }
    },
  },

  async mounted() {
    
    unsubscribeFromAuth = subscribeToAuthStateChanges(async (userState) => {
      if (!userState || !userState.id) {
        this.user = null;
        this.messages = [];
        return;
      }

      this.user = userState;

      this.messages = await fetchUserPostMessages(this.user.id);

      unsubscribeFromAuth = subscribeGlobalPostMessages((newMessage) =>
        this.messages.unshift(newMessage)
      );
    });
  },

  unmounted() {
    unsubscribeFromAuth();
  },
};
</script>

<template>
  <AppH2 class="sr-only">Mi perfil</AppH2>
  <section
    class="p-6 bg-[url('https://files.worldwildlife.org/wwfcmsprod/images/Jaguar_Brazil/story_full_width/17z0nhnt2v__WW214751.jpg')] bg-cover bg-no-repeat bg-top"
  >
    <div
      class="bg-lime-200/50 rounded-xl shadow-md p-6 border border-gray-200 max-w-3xl mx-auto"
    >
      <div class="flex gap-4 m-6">
        <div class="w-3/12 bg-amber-100 p-4 mx-auto text-center">
          <!-- Avatar -->
          <img
            :src="
              user.avatar ??
              'https://cdn-icons-png.flaticon.com/512/149/149071.png'
            "
            alt="Avatar"
            class="w-28 h-28 rounded-full object-cover border-4 border-white mx-auto"
          />
          <span class="text-xl font-semibold text-gray-800 mb-1">
            {{ user.display_name ?? "Sin especificar..." }}
          </span>
          <p class="text-sm text-gray-500 mb-4">
            {{ user.email ?? "" }}
          </p>
          <RouterLink
            to="/mi_perfil/editar"
            class="inline-block px-4 py-2 bg-amber-300 text-gray-800 rounded-md hover:bg-amber-500 transition"
          >
            Editar
          </RouterLink>
        </div>

        <div class="w-9/12 p-4 shadow-md bg-lime-200/90">
          <!-- Biografía -->
          <span class="text-lg font-medium text-gray-700 mb-1">Biografía</span>
          <p class="text-gray-600 italic">
            {{ user.biografia ?? "Sin especificar..." }}
          </p>
        </div>
      </div>
    </div>
  </section>
  <section class="flex gap-4 mt-5">
    <div class="w-9/12">
      <div v-if="messages.length === 0" class="text-gray-500">
        Este usuario no tiene publicaciones aún.
      </div>

      <div
        v-else
        class="h-[80vh] overflow-y-auto p-6 bg-black/10 rounded-3xl shadow-inner border border-gray-200"
      >
        <h2 class="sr-only">Lista de publicaciones</h2>

        <ol class="flex flex-col gap-6">
          <li
            v-for="message in messages"
            :key="message.id"
            class="p-5 bg-white rounded-xl shadow-sm w-full border border-gray-100"
          >
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-3">
                <img
                  :src="
                    message.avatar ??
                    'nada'
                  "
                  alt="avatar"
                  class="w-10 h-10 rounded-full object-cover border border-gray-200"
                />
                <div>
                  <p class="font-semibold text-gray-800">
                    {{ message.email }}
                  </p>
                  <p class="text-xs text-gray-500">
                    Publicó el
                    {{ new Date(message.created_at).toLocaleString() }}
                  </p>
                </div>
              </div>
            </div>

            <div class="text-gray-700 text-base leading-relaxed">
              {{ message.content }}
            </div>
          </li>
        </ol>
      </div>
    </div>
  
    <div class="w-3/12 mt-4">
      <AppPostForm @send-message="handleSendMessage" />
      
    </div>
  </section>
</template>
