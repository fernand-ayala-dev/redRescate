<script>
import {
  subscribeToAuthStateChanges,
  updateAuthProfile,
  updateAuthUserAvatar,
} from "../../service/authService";

import { getFileURL } from "../../service/storage";

import AppH1 from "../estilos/AppH1.vue";
import AppButton from "../estilos/AppButton.vue";

let unsubscribeFromAuth = () => {};

export default {
  name: "AppEditProfile",
  components: { AppH1, AppButton },

  data() {
    return {
      formData: {
        display_name: "",
        biografia: "",
      },
      avatarFile: null,
      avatarPreview: null,
      loading: false,
      trueMessage: "",
    };
  },

  methods: {
    handleAvatarChange(e) {
      const file = e.target.files[0];
      if (!file) return;

      this.avatarFile = file;
      this.avatarPreview = URL.createObjectURL(file);
    },

    async handleSumit() {
      try {
        this.loading = true;
        this.trueMessage = "";

        if (this.avatarFile) {
          await updateAuthUserAvatar(this.avatarFile);
        }

        await updateAuthProfile(this.formData);

        this.trueMessage = "Actualización exitosa";

        setTimeout(() => {
          this.trueMessage = "";
        }, 2000);

        this.$router.push("/mi_perfil");
      } catch (error) {
        console.error("Error al actualizar perfil:", error);
      }
    },
  },

  mounted() {
    unsubscribeFromAuth = subscribeToAuthStateChanges((userState) => {
      this.formData.display_name = userState.display_name || "";
      this.formData.biografia = userState.biografia || "";

      this.avatarPreview = userState.avatar
        ? getFileURL(userState.avatar)
        : null;
    });
  },

  unmounted() {
    unsubscribeFromAuth();
  },
};
</script>

<template>
  <section
    class="bg-lime-200 rounded-xl shadow-md p-6 border border-gray-200 max-w-3xl mx-auto"
  >
    <div
      v-if="trueMessage"
      class="bg-green-500 rounded-md p-2 mt-2 text-white text-center text-sm"
    >
      {{ trueMessage }}
    </div>

    <form @submit.prevent="handleSumit">
      <div class="mb-4">
        <label
          for="avatar"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          Avatar
        </label>

        <div v-if="avatarPreview" class="mt-3 flex justify-center mb-4">
          <img
            :src="avatarPreview"
            class="w-40 h-40 rounded-full object-cover border-4 border-lime-500 shadow-md"
          />
        </div>
        <label
          for="avatar"
          class="flex items-center gap-2 cursor-pointer bg-lime-500 hover:bg-lime-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
        >
          Elegir imagen de Perfil
        </label>
        <input
          type="file"
          id="avatar"
          accept="image/*"
          @change="handleAvatarChange"
          class="hidden"
        />
      </div>

      <div class="mb-4">
        <label
          for="display_name"
          class="block text-sm font-medium text-gray-700 p-4"
        >
          Nombre
        </label>
        <input
          id="display_name"
          type="text"
          class="w-full p-2 border bg-lime-100 border-gray-300 rounded"
          v-model="formData.display_name"
        />
      </div>

      <div class="mb-4">
        <label
          for="biografia"
          class="block text-sm font-medium text-gray-700 p-4"
        >
          Biografía
        </label>
        <textarea
          id="biografia"
          rows="4"
          class="w-full p-2 border bg-lime-100 border-gray-300 rounded"
          v-model="formData.biografia"
        ></textarea>
      </div>

      <div class="flex flex-row gap-3">
        <AppButton class="w-100">Guardar</AppButton>

        <router-link
          to="/mi_perfil"
          class="w-32 text-center bg-red-600 text-white font-medium py-2 rounded-md hover:bg-red-800 transition-colors duration-200"
        >
          Cancelar
        </router-link>
      </div>
    </form>
  </section>
</template>
