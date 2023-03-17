<template>
    <div class="header mx-4 d-flex justify-space-between ">
        <div class="d-flex align-center">
            <v-img src="@/assets/logo_RR.png" fit :width="150" aspect-ratio="16/9"></v-img>
        </div>
        <div class="btn_header d-flex align-center">
            <v-slide-x-reverse-transition>
                <v-text-field class="outlined" width="300px" v-show="search" variant="solo" hide-details="auto">
                </v-text-field>
            </v-slide-x-reverse-transition>
            <v-btn @click="search = !search" class="mx-1" icon="mdi-magnify"></v-btn>



            <v-btn class="mx-1" icon="mdi-account-circle-outline"></v-btn>
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
export default {
    name: 'headerComponent',
    data() {
        return {
            search: false
        }
    }
}
</script>