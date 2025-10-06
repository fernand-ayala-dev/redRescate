import { createRouter, createWebHistory } from "vue-router";
import { subscribeToAuthStateChanges } from "../service/authService";
import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import NewPost from "../pages/NewPost.vue";
import Profile from "../pages/Profile.vue";
import Register from '../pages/Register.vue';
import EditProfile from "../pages/EditProfile.vue";



const routes = [

  { path: "/", component: Home },

  { path: "/iniciar", component: Login },

  { path: "/publicar", component: NewPost, meta: {requiresAuth: true,},},

  { path: "/miPerfil", component: Profile, meta: {requiresAuth: true,},},

  { path: "/registrarse", component: Register },

  { path: '/miPerfil/editar',            component: EditProfile,   meta: { requiresAuth: true, }, },
];

const router = createRouter({
  routes: routes,
  history: createWebHistory(),
});

//restrincion de acceso rutas protegidas

let user={
  id:null,
  email: null,
}

subscribeToAuthStateChanges(userState => user = userState);

router.beforeEach((to,from) =>{
   if(to.meta.requiresAuth && user.id === null) {
        return '/iniciar';
    }

});
export default router;
