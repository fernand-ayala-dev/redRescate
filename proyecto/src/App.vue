
<script>

import AppFooter from './components/layout/AppFooter.vue';
import AppNavbar from './components/layout/AppNav.vue';
export default {
    
    name: 'App',
    components: { AppNavbar, AppFooter},

}
</script>

<template>
 <AppNavbar/>
 
  <main class="container mx-auto">
    <RouterView/>
   
  </main>
<AppFooter/>
</template>

