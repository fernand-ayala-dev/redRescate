<script>

import AppH1 from '../components/AppH1.vue';
import AppPostList from '../components/posts/AppPostList.vue';
export default {
  name: 'Post',
  components: {AppH1, AppPostList},
 
};
</script>

<template>
<AppH1>Comunidad</AppH1>

<AppPostList/>
</template>
