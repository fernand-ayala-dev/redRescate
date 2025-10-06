<script>
import AppH1 from "../components/AppH1.vue";
import AppPostCard from "../components/posts/AppPostCard.vue";

export default {
  name: "Profile",
  components: { AppH1 , AppPostCard},
};
</script>

<template>
  <section class="bg-white rounded-xl shadow-md p-6 border border-gray-200">
    <AppH1>Mi perfil</AppH1>
    <div class="flex items-center gap-4 mb-6">
      <img
        src="https://img.favpng.com/1/9/15/3d-male-avatar-cartoon-man-with-glasses-Bnq3PC7J_t.jpg"
        alt="Avatar"
        class="w-20 h-20 rounded-full object-cover border"
      />
      <div>
        <h2 class="text-xl font-semibold text-gray-800">Nombre</h2>
        <p class="text-sm text-gray-500"></p>
      </div>
    </div>

    <!-- Biografía -->
    <div>
      <h3 class="text-lg font-medium text-gray-700 mb-2">Biografía</h3>
      <p class="text-gray-400 italic">Todavía no has escrito una biografía.</p>
    </div>
  </section>
  <AppPostCard></AppPostCard>

</template>
