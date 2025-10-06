<script>
import AppPostList from './AppPostList.vue';

export default {
  // 1. Nombre y Rol
  name: "PostCard", 
  components: {AppPostList},
  
  // 2. Propiedades (Props)
  // El componente solo se encarga de mostrar la información
  // que le pasa el componente contenedor (AppPostList).
  props: {
    // Definimos una propiedad 'post' que contendrá los datos (email, content, created_at, etc.)
    post: { 
      type: Object, // Esperamos un objeto con los datos del post
      required: true,
      // Los componentes de presentación reciben el contenido como propiedades [1].
    }
  },

  // 3. Estado Local (Data)
  // No requiere data() ni state propio, cumpliendo con el SRP [1, 2, 9].
  // No contiene lógica de negocio (como obtener datos de postsService.js) [2, 3].
};
</script>

<template>
  <!-- 4. Template y Estilización con Tailwind -->
  <article class="p-4 rounded bg-gray-100 border border-gray-200">
    <!-- Encabezado: Email del Usuario -->
    <div class="mb-2 font-semibold">
      <span class="text-blue-600">{{ post.email }}</span> Publicó:
    </div>

    <!-- Contenido del Post -->
    <p class="mb-2 text-gray-800">
      {{ post.content }}
    </p>

    <!-- Metadatos: Fecha de Creación -->
    <div class="text-xs text-gray-500">
      Fecha: <span>{{ post.created_at }}</span>
    </div>
  </article>
</template>
