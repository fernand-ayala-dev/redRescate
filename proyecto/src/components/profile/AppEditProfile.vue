<script>

import { subscribeToAuthStateChanges, updateAuthProfile } from "../../service/authService";
import AppH1 from "../AppH1.vue";
let unsubscribeFromAuth =() => {}
export default {
  name: "AppEditProfile",
  components: { AppH1 },

  data() {
    return {
      formData: {
        display_name: null,
        biografia: null,
        avatar: null,
      },
      loading: false,
    };
  },

  methods: {
    async handleSumit() {
      try {
        this.loading = true;

        await updateAuthProfile(this.formData);
      } catch (error) {
        //TODO
      }

      this.loading = false;
    },
  },
  mounted() {
    unsubscribeFromAuth = subscribeToAuthStateChanges((userState) => {
      this.formData = {
        display_name: userState.display_name,
        biografia: userState.biografia,
        avatar: userState.avatar,
      };
    });
  },

  unmounted(){
    unsubscribeFromAuth();
  }
};
</script>

<template>
  <AppH1>Actualizar mi perfil</AppH1>
  <form action="#" @submit.prevent="handleSumit">
    <div class="mb-4">
      <label for="display_name" class="block text-sm font-medium text-gray-700"
        >Nombre</label
      >
      <input
        id="display_name"
        type="text"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
        v-model="formData.display_name"
      />
    </div>
    <div class="mb-4">
      <label for="avatar" class="block text-sm font-medium text-gray-700"
        >Avatar</label
      >
      <input
        id="avatar"
        type="text"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
        v-model="formData.avatar"
      />
    </div>

    <!-- Biografía -->
    <div>
      <label for="biografia" class="block text-sm font-medium text-gray-700"
        >Biografía</label
      >
      <textarea
        id="biografia"
        rows="4"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
        v-model="formData.biografia"
      ></textarea>
    </div>

    <!-- Botón -->
    <div class="flex justify-end">
      <button
        type="submit"
        class="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
      >
        Guardar perfil
      </button>
      <router-link
        to="/perfil"
        class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition"
      >
        cancelar
      </router-link>
    </div>
  </form>
</template>
