import { createRouter, createWebHistory } from "vue-router";
import { supabase } from "@/supabase";

const routes = [
  // 🔹 Login
  {
    path: "/login",
    name: "Login",
    component: () => import("@/components/Login.vue"),
  },

  // 🔹 Recuperación de contraseña
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

  // 🔹 Dashboard principal
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("@/views/Dashboard.vue"),
    meta: { requiresAuth: true },
  },

  // 🔹 Home
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
    meta: { requiresAuth: true },
  },

  // 🔹 Posts
  {
    path: "/posts",
    name: "Posts",
    component: () => import("@/views/PostList.vue"),
    meta: { requiresAuth: true },
  },

  // 🔹 Admin
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

// 🔐 Middleware de autenticación
router.beforeEach(async (to, from, next) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Requiere sesión
  if (to.meta.requiresAuth && !user) {
    next("/login");
  }
  // Ya está logueado e intenta ir al login
  else if (to.path === "/login" && user) {
    next("/dashboard");
  }
  // Permitir acceso a rutas públicas
  else {
    next();
  }
});

export default router;
