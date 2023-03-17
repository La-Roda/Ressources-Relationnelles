<template>
    <v-card class="post mx-4 ma-2">
        <v-card-title class="pb-0">
            <div class="d-inline-flex">
                <v-img src="@/assets/profil.png" width="30px"></v-img>
                <div class="infos_user d-flex flex-column ml-4">
                    <span>Aude Javel</span>
                    <span class="date mt-1">
                        Il y a 19h
                    </span>
                </div>
            </div>
        </v-card-title>
        <v-card-text class="mt-3">
            Je me suis bien faite baiser hier soir : 🙈 <br />
            Endurance : 8/10 <br />
            Coups de rein : 9/10 <br />
            Taille de bite : 10/10 <br />
            Cuni : 8.5/10 😘
        </v-card-text>
    </v-card>
</template>
<style>
.v-card-title {
    line-height: 1 !important;
}
</style>
<style scoped>
.post {
    max-width: 750px;
    background-color: #EFEFEF;
}

.infos_user .date {
    font-size: 12px;
    color: grey;
}
</style>
<script>
export default {
    name: 'PostComponent'
}
</script>