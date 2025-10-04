
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
  <main class="container mx-auto p-4">
    <RouterView/>
   
  </main>
<AppFooter/>
</template>

