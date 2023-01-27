import { createRouter, createWebHistory } from "vue-router";
import { projectAuth } from "@/firebase/config";

// Auth Guards
const shouldLogin = (to, from, next) => {
  const user = projectAuth.currentUser;
  if (user) {
    next();
  } else {
    next({ name: "login" });
  }
};

const ifLoggedIn = (to, from, next) => {
  const user = projectAuth.currentUser;
  if (user) {
    next({ name: "board" });
  } else {
    next();
  }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("@/views/AdminView.vue"),
      children: [
        {
          path: "",
          name: "board",
          component: () => import("@/components/BoardPlayers.vue"),
        },
        {
          path: "all-players",
          name: "all-players",
          component: () => import("@/components/AllPlayers.vue"),
        },
        {
          path: "add-player",
          name: "add-player",
          component: () => import("@/components/AddPlayer.vue"),
        },
        {
          path: "update-player/:id",
          name: "update-player",
          component: () => import("@/components/UpdatePlayer.vue"),
          props: true,
        },
      ],
      beforeEnter: shouldLogin,
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LoginView.vue"),
      beforeEnter: ifLoggedIn,
    },
  ],
});

export default router;
