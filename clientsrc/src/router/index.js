import Vue from "vue";
import VueRouter from "vue-router";
// @ts-ignore
import Home from "../Pages/Home.vue";
// @ts-ignore
import Profile from "../Pages/Profile.vue";
// @ts-ignore
import Bug from "../Pages/Bug.vue";
// @ts-ignore
import Bugs from "../Pages/Bugs.vue";
import { authGuard } from "@bcwdev/auth0-vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },

  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    beforeEnter: authGuard,
  },

  {
    path: "/bugs",
    name: "Bugs",
    component: Bugs,
    beforeEnter: authGuard,
  },

  {
    path: "/bugs/:bugId",
    name: "Bug",
    component: Bug,
    beforeEnter: authGuard,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
