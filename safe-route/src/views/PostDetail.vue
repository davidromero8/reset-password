<template>
  <div class="post-detail" v-if="post">
    <h2>{{ post.title }}</h2>
    <p class="author">Por: {{ post.author }}</p>
    <div class="content">{{ post.content }}</div>
    <button @click="$router.back()">Volver</button>
  </div>
  <div v-else>
    <p>Post no encontrado</p>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";

// Recibir el id como prop (configurado en router con props: true)
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const route = useRoute();
const post = ref(null);

// Simular base de datos
const postsDB = {
  1: {
    id: 1,
    title: "Introducción a Vue 3",
    author: "Juan",
    content: "Contenido completo del post 1...",
  },
  2: {
    id: 2,
    title: "Composition API",
    author: "María",
    content: "Contenido completo del post 2...",
  },
  3: {
    id: 3,
    title: "Vue Router 4",
    author: "Pedro",
    content: "Contenido completo del post 3...",
  },
  4: {
    id: 4,
    title: "Prueba",
    author: "Usuario Normal",
    content: "Contenido completo del post 4...",
  },
};

const loadPost = () => {
  // Obtener post según el ID de la ruta
  post.value = postsDB[props.id] || null;
};

onMounted(loadPost);

//Watch para cuando cambie el parámetro de la ruta
watch(() => props.id, loadPost);
</script>