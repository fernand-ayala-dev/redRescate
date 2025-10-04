import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import NewPost from "../pages/NewPost.vue";
import Profile from "../pages/Profile.vue";
import Register from '../pages/Register.vue';


const routes = [

  { path: "/", component: Home },

  { path: "/iniciar", component: Login },

  { path: "/publicar", component: NewPost },

  { path: "/miPerfil", component: Profile },

  { path: "/registrarse", component: Register },

 
];

const router = createRouter({
  routes: routes,
  history: createWebHistory(),
});

export default router;
