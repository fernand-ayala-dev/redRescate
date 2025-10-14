<script>
export default {
  name: "AppButton",
};
</script>

<template>
  <button
  type="submit"
    class="w-3/12 mx-auto px-6 py-3 bg-lime-600 text-white font-semibold rounded-2xl shadow-lg hover:bg-lime-700 hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-lime-400 block"
  >
    <slot />
  </button>
</template>
<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>