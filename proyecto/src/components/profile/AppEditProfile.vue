<script>
import {
  subscribeToAuthStateChanges,
  updateAuthProfile,
} from "../../service/authService";
import AppH1 from "../AppH1.vue";
import AppButton from "../AppButton.vue";
let unsubscribeFromAuth = () => {};
export default {
  name: "AppEditProfile",
  components: { AppH1, AppButton },

  data() {
    return {
      formData: {
        display_name: null,
        biografia: null,
        avatar: null,
      },
      loading: false,
      trueMessage: "",
    };
  },

  methods: {
    async handleSumit() {
      try {
        this.loading = true;
          this.trueMessage= "",
        await updateAuthProfile(this.formData);
        this.trueMessage = "Actualización exitosa";
         setTimeout(() => {
          this.trueMessage = "";
        }, 2000)
         this.$router.push("/mi_perfil");
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
    <form action="#" @submit.prevent="handleSumit">
      <div class="mb-4">
        <label
          for="display_name"
          class="block text-sm font-medium text-gray-700 p-4"
          >Nombre</label
        >
        <input
          id="display_name"
          type="text"
          class="w-full p-2 border bg-lime-100 border-gray-300 rounded hover:bg-amber-50 focus:bg-amber-100"
          v-model="formData.display_name"
        />
      </div>
      <div class="mb-4">
        <label for="avatar" class="block text-sm font-medium text-gray-700 p-4"
          >Avatar: pegar url</label
        >
        <input
          id="avatar"
          type="text"
          class="w-full p-2 border bg-lime-100 border-gray-300 rounded hover:bg-amber-50 focus:bg-amber-100"
          v-model="formData.avatar"
        />
      </div>

      <!-- Biografía -->
      <div>
        <label for="biografia" class="block text-sm font-medium text-gray-700 p-4"
          >Biografía</label
        >
        <textarea
          id="biografia"
          rows="4"
          class="w-full p-2 border bg-lime-100 border-gray-300 rounded hover:bg-amber-50 focus:bg-amber-100"
          v-model="formData.biografia"
        ></textarea>
      </div>

      <div class="flex flex-row gap-3">
        <AppButton clas="w-100">Guardar</AppButton>

        <router-link
          to="/mi_perfil"
          class="w-32 text-center text-red py-2 rounded-md hover:bg-red-800 transition"
        >
          Cancelar
        </router-link>
      </div>
    </form>
  </section>
</template>
