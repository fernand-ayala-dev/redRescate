<script>
import { getUserProfileById } from "../service/userService.js";
import { fetchUserPostMessages } from "../service/postService.js";
import AppH1 from "../components/AppH1.vue";
import AppH2 from "../components/AppH2.vue";

export default {
  name: "ProfileUser",
  props: ["id"],
  components: { AppH1, AppH2 },
  data() {
    return {
      user: {},
      messages: [],
      loading: false,
    };
  },
  async mounted() {
    this.loading = true;

    // carga de datos
    this.user = await getUserProfileById(this.id);
    // carga de publicaciones
    if (this.user?.id) {
      this.messages = await fetchUserPostMessages(this.user.id);
    }

    this.loading = false;
  },
};
</script>

<template>
  <div class="p-4 bg-amber-300/40">
    <AppH1>Visitando perfil</AppH1>

    <section
      v-if="!loading"
      class="bg-lime-200 rounded-xl shadow-md p-6 border border-gray-200 max-w-3xl mx-auto"
    >
      <div class="flex gap-4">
        <div class="w-3/12 bg-amber-100 p-4 mx-auto text-center">
        
          <img 
          :src="user.avatar || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'"
          alt="Avatar" />
          <p>{{ user?.display_name ?? "Sin nombre..." }}</p>

          <p class="text-sm text-gray-500 mb-2">{{ user.email }}</p>
        </div>

        <div class="w-9/12 p-4 shadow-md">
          
          <span class="text-lg font-medium text-gray-700 mb-1">Biografía</span>
          <p class="text-gray-600 italic">
            {{ user.biografia ?? "Sin biografia..." }}
          </p>
        </div>
      </div>
    </section>

    <div v-if="loading" class="text-center text-gray-500 mt-6">
      Cargando perfil...
    </div>

    <div v-else class="p-4">
      <AppH2>Publicaciones</AppH2>

      <div v-if="messages.length === 0" class="text-gray-500">
        Este usuario no tiene publicaciones aún.
      </div>

      <ul v-else class="space-y-4">
        <li
          v-for="msg in messages"
          :key="msg.id"
          class="p-4 bg-white rounded shadow border border-gray-200"
        >
          <div class="flex items-center gap-3 mb-2">
            <img
              :src="
                msg.avatar ??
                'https://cdn-icons-png.flaticon.com/512/149/149071.png'
              "
              alt="avatar"
              class="w-8 h-8 rounded-full object-cover border border-gray-200"
            />
            <div>
              <p class="font-medium text-gray-800">
                {{ msg.display_name ?? "Usuario" }}
              </p>
              <p class="text-xs text-gray-500">
                {{ new Date(msg.created_at).toLocaleString() }}
              </p>
            </div>
          </div>
          <p class="text-gray-700">{{ msg.content }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
