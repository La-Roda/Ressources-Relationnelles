<template>
    <PostComponent v-for="post in getPosts" :key="post" :post="post"></PostComponent>
</template>


<script>
import PostComponent from '@/components/posts/post.vue'
import { mapGetters } from 'vuex';
export default {
    name: 'HomePage',
    components: {
        PostComponent
    },
    computed: {
        ...mapGetters(['getPosts'])
    }


}
</script>