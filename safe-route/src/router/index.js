import { createRouter, createWebHistory } from "vue-router";
import { supabase } from "@/supabase";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/components/Login.vue"),
  },

  {
  path: "/signup",
  name: "Signup",
  component: () => import("@/views/signup.vue"),
  meta: { requiresAuth: false },
},

  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: () => import("@/views/ForgotPassword.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: () => import("@/views/ResetPassword.vue"),
    meta: { requiresAuth: false },
  },

  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("@/views/Dashboard.vue"),
    meta: { requiresAuth: true },
  },

  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
    meta: { requiresAuth: true },
  },

  {
    path: "/posts",
    name: "Posts",
    component: () => import("@/views/PostList.vue"),
    meta: { requiresAuth: true },
  },

  {
    path: "/admin",
    name: "Admin",
    component: () => import("@/views/Admin.vue"),
    meta: {
      requiresAuth: true,
      requiresRole: ["admin"],
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (to.meta.requiresAuth && !user) {
    next("/login");
  }
  else if (to.path === "/login" && user) {
    next("/dashboard");
  }
  else {
    next();
  }
});

export default router;
