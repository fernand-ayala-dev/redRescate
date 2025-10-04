<script>
export default {
  name: "AppEditProfile",
};
</script>

<template>
  <h1>Editando post</h1>
  <form class="space-y-4">
    <!-- Nombre -->
    <div>
      <label for="name" class="block text-sm font-medium text-gray-700"
        >Nombre</label
      >
      <input
        id="name"
        type="text"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
        placeholder="Tu nombre"
        required
      />
    </div>

    <!-- Biografía -->
    <div>
      <label for="bio" class="block text-sm font-medium text-gray-700"
        >Biografía</label
      >
      <textarea
        id="bio"
        rows="4"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
        placeholder="Contanos algo sobre vos..."
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
