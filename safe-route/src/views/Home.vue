<template>
  <div class="home">
    <h1>Bienvenido al Blog</h1>
    <p v-if="authStore.isAuthenticated">
      Hola, {{ authStore.user.name }}!
      <span v-if="authStore.userRole === 'admin'">(Administrador)</span>
    </p>
    <p v-else>Por favor, inicia sesión para acceder a todo el contenido</p>

    <nav>
      <router-link to="/posts">Ver Posts</router-link> |
      <router-link to="/login" v-if="!authStore.isAuthenticated"
        >Login</router-link
      >
      <router-link to="/dashboard" v-if="authStore.userRole === 'admin'"
        >Dashboard</router-link
      >
      <button v-if="authStore.isAuthenticated" @click="handleLogout">
        Logout
      </button>
    </nav>
  </div>
</template>

<script setup>
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  authStore.logout();
  router.push("/");
};
</script>