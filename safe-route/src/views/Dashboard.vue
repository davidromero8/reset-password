<script setup lang="js">
import { useAuth } from "@/composables/useAuth";
import router from "./../router";
import { ref } from "vue";

const { signOut } = useAuth();
const error = ref(null);
const isLoading = ref(false);


const handleLogOut = async () =>{
  console.log('Do something');

  error.value = null
  isLoading.value = true

  const { data, error: loginError } = await signOut();

  isLoading.value = false;

  if (loginError) {
    error.value = loginError.message;
  } else {
    router.push("/");
  }

  console.log('Done');
}
</script>
<template>
  <div class="dashboard">
    <h2>Panel de Administración</h2>
    <p>Solo administradores pueden ver esto</p>
    <ul>
      <li>Total de posts: 3</li>
      <li>Usuarios registrados: 10</li>
      <li>Comentarios pendientes: 5</li>
    </ul>
    <div>
      <h2>Quieres salir?</h2>
      <button @click="handleLogOut">Salir</button>
    </div>
  </div>
</template>