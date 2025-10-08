<script>
import AppH1 from "../AppH1.vue";
import {
  subscribeToAuthStateChanges,
  logout,
} from "../../service/authService.js";
import AppH2 from "../AppH2.vue";
export default {
  name: "AppDesingHome",
  components: { AppH1, AppH2 },
data() {
    return {
      user: {
        id: null,
        email: null,
      },
    };
  },
  methods: {
    handleLogout() {
      logout();

       this.$router.push('/iniciar');
      this.user.email='';
      this.user.password='';
    }

  
  },

  mounted() {
        subscribeToAuthStateChanges(userState => this.user = userState);

  },
};
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

 
  <section id="about" class="container mx-auto px-6 lg:px-8 py-12">
    <div class="prose max-w-4xl mx-auto text-center prose-a:text-emerald-600">
      <AppH2>¿Qué hacemos?</AppH2>
      <p class="m-2">
        Este espacio se utiliza para rescatar animales silvestres que estén
        siendo domesticados, arrollados en rutas o encontrados lastimados.
        Nuestro objetivo es ayudarlos en su recuperación y trabajar en la
        concientización sobre el respeto por la fauna local.
      </p>
      <hr class="m-4">
      <p class="m-2">
        Colaboramos con la Fundación <em>GüiráOga</em> y la Fundación
        <em> OHANA Rescate Animal </em>, que se dedican al cuidado,
        rehabilitación y conservación. Además, apoyamos el nuevo hospital
        veterinario de alta complejidad en Misiones, orientado a la atención de
        animales silvestres heridos y su reinserción al hábitat.
      </p>
    </div>
  </section>

  <!-- SECCIÓN: Cómo ayudar -->
  <section id="colabora" class="bg-emerald-50 py-10">
    <div class="container mx-auto px-6 lg:px-8">
      <AppH2 class="text-center">¿Cómo ayudar?</AppH2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <article class="p-6 bg-white rounded-lg shadow">
          <h4 class="font-semibold text-lg">Reportar un animal herido</h4>
          <p class="mt-2 text-sm">
            Llamanos o dejá un reporte con ubicación y fotos.
          </p>
          <a
            href="#contacto"
            class="mt-4 inline-block text-sm font-medium underline"
          >
            Reportar ahora
          </a>
        </article>

        <article class="p-6 bg-white rounded-lg shadow">
          <h4 class="font-semibold text-lg">Donaciones y insumos</h4>
          <p class="mt-2 text-sm">
            Medicamentos, alimento especial y materiales para rehabilitación.
          </p>
          <a
            href="#donar"
            class="mt-4 inline-block text-sm font-medium underline"
          >
            Conocer opciones
          </a>
        </article>

        <article class="p-6 bg-white rounded-lg shadow">
          <h4 class="font-semibold text-lg">Voluntariado</h4>
          <p class="mt-2 text-sm">
            Sumate a las tareas de rehabilitación y cuidado en las fundaciones.
          </p>
          <a
            href="#voluntariado"
            class="mt-4 inline-block text-sm font-medium underline"
          >
            Inscribirme
          </a>
        </article>
      </div>
    </div>
  </section>

  <!-- SECCIÓN: Fundaciones amigas -->
  <section id="rescates" class="container mx-auto px-6 lg:px-8 py-12">
    <AppH2 class="text-center">Fundaciones amigas</AppH2>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div class="p-5 bg-white rounded-lg shadow flex items-start gap-4">
        <div
          class="flex-shrink-0 w-16 h-16 rounded-md bg-emerald-100 grid place-items-center font-bold"
        >
          G
        </div>
        <div>
          <h4 class="font-semibold">Fundación GüiráOga</h4>
          <p class="text-sm">
            Cuidado y rehabilitación de fauna local, difusión y proyectos de
            conservación.
          </p>
        </div>
      </div>

      <div class="p-5 bg-white rounded-lg shadow flex items-start gap-4">
        <div
          class="flex-shrink-0 w-16 h-16 rounded-md bg-emerald-100 grid place-items-center font-bold"
        >
          O
        </div>
        <div>
          <h4 class="font-semibold">Fundación OHANA Rescate Animal</h4>
          <p class="text-sm">
            Rehabilitación, rescate y reinserción de animales silvestres.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
