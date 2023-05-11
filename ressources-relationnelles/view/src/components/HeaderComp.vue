<template>
    <div class="header mx-4 d-flex justify-center">
    <div v-if="getToken !== null" class="d-flex align-center fill-height" style="position: absolute; left:15px">
        <v-btn absolute left icon="mdi-menu" @click="showDrawer"></v-btn>
    </div>
        <div class="d-flex align-center">
            <v-img src="@/assets/logo_RR.png" fit :width="150" aspect-ratio="16/9"></v-img>
        </div>
    </div>
</template>
<style scoped>
.header {
    width: 100%;
    height: 100%;
}
</style>
<style>
.btn_header .v-btn .v-btn__content i::before {
    font-size: 30px;
    color: white;
}

.btn_header .v-input .v-input__control .v-field {
    border-radius: 35px !important;
    width: 50vw;
    max-width: 500px;
    background-color: transparent !important;
    border: 1px solid white;
}
</style>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'HeaderComponent',
    data() {
        return {
            search: false
        }
    },
    computed: {
        ...mapGetters(['getToken'])
    },
    methods: {
        showDrawer() {
            this.$emit('showDrawer')
        }
    }
}
</script>