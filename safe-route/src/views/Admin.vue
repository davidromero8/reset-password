<template>
  <div><p>Esto es para ojos de Admin</p></div>
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
};

const loadPost = () => {
  // Obtener post según el ID de la ruta
  post.value = postsDB[props.id] || null;
};

onMounted(loadPost);

//Watch para cuando cambie el parámetro de la ruta
watch(() => props.id, loadPost);
</script>