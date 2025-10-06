<script>
//import BlogPost from './BlogPost.vue';
import AppH1 from '../components/AppH1.vue';
import AppPostList from '../components/posts/AppPostList.vue';
export default {
  name: 'Home',
  components: {AppH1, AppPostList},
 
};
</script>

<template>
<AppH1>Home</AppH1>
<!--POSTsECCION-->
<AppPostList/>
</template>
