<script>
import AppH1 from "../AppH1.vue";
import AppH2 from "../AppH2.vue";
export default{
    name: "AppHeader",
    components: { AppH1, AppH2 },
}

</script>
<template>
      <header class="relative overflow-hidden bg-amber-100 w-full">
    <div class="container mx-auto px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-16">
        <div class="space-y-6">
          <AppH1>Red Rescate</AppH1>

          <p class="text-lg sm:text-xl max-w-xl">
            Unite a nuestra comunidad para cuidar a nuestra fauna
            misionera:rescate, rehabilitación y reinserción. Colaboramos con
            fundaciones locales para dar a los animales la oportunidad de
            recuperarse y volver a su hábitat.
          </p>

          <div v-if="user.id === null" class="flex flex-wrap gap-3">
            <RouterLink
              to="/publicaciones"
              class="inline-block px-5 py-3 bg-emerald-600 text-white rounded-lg shadow hover:bg-emerald-700 transition"
            >
              Ver Posteos
            </RouterLink>

            <RouterLink
              to="/iniciar"
              class="inline-block px-5 py-3 bg-emerald-600 text-white rounded-lg shadow hover:bg-emerald-700 transition"
            >
              Iniciar sesion
            </RouterLink>
          </div>
          <div v-else>
            <RouterLink
              to="/publicaciones"
              class="inline-block px-5 py-3 bg-emerald-600 text-white rounded-lg shadow hover:bg-emerald-700 transition"
            >
              Muro de posteo
            </RouterLink>
          </div>
        </div>

        <div class="relative">
          <img
            src="https://www.lifeder.com/wp-content/uploads/2019/03/flora-y-fauna-de-Misiones-Argentina.jpg"
            alt="Banner: flora y fauna de Misiones"
            class="w-full h-64 sm:h-80 md:h-96 object-cover rounded-xl shadow-lg"
          />
          <div
            class="absolute left-4 bottom-4 bg-white/80 backdrop-blur-sm rounded-md px-3 py-2 text-sm"
          >
            <strong>Cuidemos a nuestra fauna misionera</strong>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>