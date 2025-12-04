import { createRouter, createWebHistory } from "vue-router";
import { subscribeToAuthStateChanges } from "../service/authService";
import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import Post from "../pages/Post.vue";
import MyProfile from "../pages/MyProfile.vue";
import Register from "../pages/Register.vue";
import EditProfile from "../pages/EditProfile.vue";
import ProfileUser from "../pages/ProfileUser.vue";
import Chats from "../pages/Chats.vue";

const routes = [
  { path: "/", component: Home },

  { path: "/iniciar", component: Login },

  { path: "/publicaciones", component: Post, meta: { requiresAuth: true } },

  { path: "/mi_perfil", component: MyProfile, meta: { requiresAuth: true } },

  { path: "/registrarse", component: Register },

  {
    path: "/mi_perfil/editar",
    component: EditProfile,
    meta: { requiresAuth: true },
  },

  //visitando el perfil de otro usuario
  {
    path: "/perfil/:id",
    name: "perfil",
    component: ProfileUser,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/chats/:id",
    name: "chats",
    component: Chats,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  routes: routes,
  history: createWebHistory(),
});

let user = {
  id: null,
  email: null,
};

subscribeToAuthStateChanges((userState) => (user = userState));

router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && user.id === null) {
    return "/iniciar";
  }
});
export default router;
