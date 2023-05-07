<template> 
    <div v-for="post in getMyPosts" :key="post">
        <PostComponent :post="post" :isMine="true"></PostComponent>
    </div>
</template>

<script>
import PostComponent from '@/components/posts/post.vue'
import { mapGetters } from 'vuex';
export default {
    name: 'MyPosts',
    components: {
        PostComponent
    },
    data() {
        return {
            postTitle: null,
            description: null,
        }
    },
    created() {
        this.$store.dispatch('getMyPosts');
    },
    computed: {
        ...mapGetters(['getMyPosts'])
    }


}
</script>