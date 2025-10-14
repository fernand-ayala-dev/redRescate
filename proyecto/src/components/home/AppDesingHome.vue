<script>

import {
  subscribeToAuthStateChanges,
  logout,
} from "../../service/authService.js";
import AppH1 from "../estilos/AppH1.vue";
import AppH2 from "../estilos/AppH2.vue";

let unsubscribeFromAuth = () => {};

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
        unsubscribeFromAuth=subscribeToAuthStateChanges(userState => this.user = userState);

  },
  unmounted(){
    unsubscribeFromAuth()
  }
};
</script>

<template>
  <header class="relative overflow-hidden  w-full">
    <div class="container mx-auto px-6 lg:px-6">
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
              class="inline-block px-5 py-3 bg-lime-600 text-white rounded-lg shadow hover:bg-lime-700 transition"
            >
              Ver Posteos
            </RouterLink>

            <RouterLink
              to="/iniciar"
              class="inline-block px-5 py-3 bg-lime-600 text-white rounded-lg shadow hover:bg-lime-700 hover:scale-[1.02] transition-all duration-300"
            >
              Iniciar sesion
            </RouterLink>
          </div>
          <div v-else>
            <RouterLink
              to="/publicaciones"
              class="inline-block px-5 py-3 bg-lime-600 text-white rounded-lg shadow hover:bg-lime-700 hover:scale-[1.02] transition-all duration-300"
            >
              Muro de posteo
            </RouterLink>
          </div>
        </div>

        <div class="">
          <img
            src="https://www.lifeder.com/wp-content/uploads/2019/03/flora-y-fauna-de-Misiones-Argentina.jpg"
            alt="Banner: flora y fauna de Misiones"
            class="w-full h-64 sm:h-80 md:h-96 object-cover rounded-xl shadow-lg"
          />
         
        </div>
      </div>
    </div>
  </header>

 
<section class="bg-lime-50 py-16 px-6 lg:px-16">
  <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 items-center gap-8 text-center md:text-left">    
    
    <div class="flex flex-col justify-center">
      <p class="text-gray-700 text-base lg:text-lg leading-relaxed mb-4">
        Este espacio se utiliza para rescatar animales silvestres que estén siendo domesticados, arrollados en rutas o encontrados lastimados.
      </p>
      <p class="text-gray-700 text-base lg:text-lg leading-relaxed">
        Nuestro objetivo es ayudarlos en su recuperación y trabajar en la concientización sobre el respeto por la fauna local.
      </p>
    </div>

   
    <div class="flex flex-col items-center justify-center">
         <AppH2 class="text-lime-900">
        Comunidad Red Rescate
      </AppH2>
      <img 
        src="/logo-selva.png" 
        alt="Logo Selva" 
        class="h-48 w-48 md:h-56 md:w-56 mx-auto rounded-full bg-lime-700 shadow-2xl border-4 border-lime-300 mb-4"
      />
   
    </div>

    <div class="flex flex-col justify-center">
      <p class="text-gray-700 text-base lg:text-lg leading-relaxed mb-4">
        Colaboramos con la Fundación <em class="text-lime-800 font-semibold">GüiráOga</em> y la Fundación <em class="text-lime-800 font-semibold">OHANA Rescate Animal</em>.
      </p>
      <p class="text-gray-700 text-base lg:text-lg leading-relaxed">
        Apoyamos el nuevo hospital veterinario de alta complejidad en Misiones, orientado a la atención de animales silvestres heridos y su reinserción al hábitat.
      </p>
    </div>

  </div>
</section>


  <section class="bg-lime-200/30 py-10">
    <div class="container mx-auto px-6 lg:px-8">
      <AppH2 class="text-center">¿Cómo ayudar?</AppH2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <article class="p-6 bg-white rounded-lg shadow hover:scale-[1.02] transition-all duration-300">
          <span class="font-semibold text-lg">Reportar un animal herido</span>
          <p class="mt-2 text-sm">
            Llamanos o dejá un reporte con ubicación y fotos.
          </p>
          <RouterLink
              to="/iniciar"
              class="inline-block text-lime-800 text-s underline "
            >
              Reportar Ahora
            </RouterLink>
        </article>

        <article class="p-6 bg-white rounded-lg shadow hover:scale-[1.02] transition-all duration-300">
          <span class="font-semibold text-lg">Voluntariado</span>
          <p class="mt-2 text-sm">
            Sumate a las tareas de rehabilitación y cuidado en las fundaciones.
          </p>
         <RouterLink
              to="/iniciar"
              class="inline-block text-lime-800 text-s underline "
            >
              Inscribirme
            </RouterLink>
        </article>
        <article class="p-6 bg-white rounded-lg shadow hover:scale-[1.02] transition-all duration-300">
          <span class="font-semibold text-lg">Comunidad</span>
          <p class="mt-2 text-sm">
            Sumate a esta linda comunidad y enterate de los rescates , salvación de estos lindos animales.
          </p>
         <RouterLink
              to="/iniciar"
              class="inline-block text-lime-800 text-s underline "
            >
              Comunidad
            </RouterLink>
        </article>
      </div>
    </div>
  </section>

  
  <section class="container mx-auto px-6 lg:px-8 py-12 bg-lime-300/40">
    <AppH2 class="text-center">Fundaciones amigas</AppH2>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div class="p-5 bg-white rounded-lg shadow flex items-start gap-4 hover:scale-[1.02] transition-all duration-300">
        <div
          class="flex-shrink-0 w-16 h-16 rounded-md bg-emerald-100 grid place-items-center font-bold"
        >
             <img src="https://scontent-atl3-1.xx.fbcdn.net/v/t51.75761-15/486087195_18392343997109702_6017100678213085116_n.jpg?stp=dst-jpg_s720x720_tt6&_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGv0fvWygJIUd0rr04sBs8dl4-d0soRcJCXj53SyhFwkKBhnoPj7TZe5ZaR2_lWtpE&_nc_ohc=MNmaPXzzVzcQ7kNvwHzcQiZ&_nc_oc=AdksLlao2e1qqSwKPIuTE3EMh7F5jCk6sPilbPvHIu1Kllb8JKkh3JR6ujIEOjqh8Vk&_nc_zt=23&_nc_ht=scontent-atl3-1.xx&edm=AKIiGfEEAAAA&_nc_gid=Aohcq3jEeiLYjg8gMSo2ew&oh=00_AfcSNzaaBsd8EijU0GmuVf0OuIt9fW8U-9ofuMqAChfF8Q&oe=68EC917D"
          alt="Guiraoga">
        </div>
        <div>
          <span class="font-semibold">Fundación GüiráOga</span>
          <p class="text-sm">
            Cuidado y rehabilitación de fauna local, difusión y proyectos de
            conservación.
          </p>
        </div>
      </div>

      <div class="p-5 bg-white rounded-lg shadow flex items-start gap-4 hover:scale-[1.02] transition-all duration-300">
        <div
          class="flex-shrink-0 w-16 h-16 rounded-md bg-emerald-100 grid place-items-center font-bold"
        >
          <img src="https://i0.wp.com/www.canal12misiones.com/wp-content/uploads/2023/06/ohana.jpg?resize=1089%2C730&ssl=1"
          alt="Guiraoga">
        </div>
        <div>
          <span class="font-semibold">Fundación OHANA</span>
          <p class="text-sm">
            Rehabilitación, rescate y reinserción de animales silvestres.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>


<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>