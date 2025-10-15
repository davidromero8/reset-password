<template>
  <div class="post-list">
    <h2>Lista de Posts</h2>
    <div v-for="post in posts" :key="post.id" class="post-card">
      <h3>{{ post.title }}</h3>
      <p>{{ post.excerpt }}</p>
      <router-link :to="{ name: 'post-detail', params: { id: post.id } }">
        Leer más
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const posts = ref([
  { id: 1, title: 'Introducción a Vue 3', excerpt: 'Aprende los básicos...' },
  { id: 2, title: 'Composition API', excerpt: 'Nueva forma de escribir...' },
  { id: 3, title: 'Vue Router 4', excerpt: 'Navegación en Vue...' },
])
</script>