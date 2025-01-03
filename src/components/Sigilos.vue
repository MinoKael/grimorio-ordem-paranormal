<script setup>
import { ref } from 'vue';
import DialogSimbolo from './DialogSimbolo.vue';

const textarea = ref('');
const textareaSinais = ref('');
const tab = ref(1);
const dialogSigilos = ref(false);
const dialogSinais = ref(false);
</script>
<template>
    <v-container>
        <v-responsive class="text-center fill-height">
            <v-tabs v-model="tab" align-tabs="center" color="#b78521">
                <v-tab :value="1">Sigilos do Conhecimento</v-tab>
                <v-tab :value="2">Sinais do Estrangeiro</v-tab>
            </v-tabs>
            <v-tabs-window v-model="tab">
                <v-tabs-window-item :value="1">
                    <v-row no-gutters>
                        <v-col cols="4" align="center" justify="center">
                            <v-row no-gutters class="d-flex flex-column" style="width: 100%;">
                                <v-card-title>Sigilos</v-card-title>
                                <v-img
                                    height="300"
                                    aspect-ratio="4/3"
                                    src="../assets/Sigilos.webp"
                                    class="sigilos"
                                    @click="dialogSigilos = !dialogSigilos"
                                >
                                    <DialogSimbolo :src="'../assets/Sigilos.webp'" :alt="'Sigilos de Conhecimento'" />
                                </v-img>
                            </v-row>
                        </v-col>
                        <v-col cols="8" class="pl-4">
                            <div style="width: 100%;">
                                <v-row no-gutters class="flex-column mb-4" style="width: 100%;">
                                    <v-card-title>Texto</v-card-title>
                                    <v-textarea v-model="textarea" variant="outlined" auto-grow shaped row-height="25" rows="4" hide-details clearable></v-textarea>
                                </v-row>
                                <v-row no-gutters class="flex-column" style="width: 100%;">
                                    <v-card-title>Tradução</v-card-title>
                                    <v-textarea v-model="textarea" variant="outlined" class="textarea-sigilos" auto-grow shaped row-height="25" rows="4" hide-details clearable></v-textarea>
                                </v-row>
                            </div>
                        </v-col>
                    </v-row>
                </v-tabs-window-item>
                
                <v-tabs-window-item :value="2">
                    <v-row no-gutters>
                        <v-col cols="4" align="center" justify="center">
                            <v-row no-gutters class="d-flex flex-column" style="width: 100%;">
                                <v-card-title>Sinais</v-card-title>
                                <v-img
                                    height="300"
                                    aspect-ratio="4/3"
                                    class="sigilos"
                                    src="../assets/Sinais do Estrangeiro.webp"
                                    @click="dialogSinais = !dialogSinais"
                                >
                                    <DialogSimbolo :src="'../assets/Sinais do Estrangeiro.webp'" :alt="'Sinais do Estrangeiro'" />
                                </v-img>
                            </v-row>
                            <v-row no-gutters class="d-flex flex-column" style="width: 100%;">
                                <v-card-title>Linguagem</v-card-title>
                                <v-img
                                    height="350"
                                    aspect-ratio="4/3"
                                    class="sigilos"
                                    src="../assets/Aglomerado_de_Traduções.webp"
                                >
                                    <DialogSimbolo :src="'../assets/Aglomerado_de_Traduções.webp'" :alt="'Aglomerado de Traduções'" :fit="true" />
                                </v-img>
                            </v-row>
                        </v-col>
                        <v-col cols="8" class="pl-4">
                            <div style="width: 100%;">
                                <v-row no-gutters class="flex-column mb-4" style="width: 100%;">
                                    <v-card-title>Texto</v-card-title>
                                    <v-textarea v-model="textareaSinais" variant="outlined" auto-grow shaped row-height="25" rows="4" hide-details clearable></v-textarea>
                                </v-row>
                                <v-row no-gutters class="flex-column" style="width: 100%;">
                                    <v-card-title>Tradução</v-card-title>
                                    <v-textarea v-model="textareaSinais" variant="outlined" class="textarea-sinais" auto-grow shaped row-height="25" rows="4" hide-details clearable></v-textarea>
                                </v-row>
                            </div>
                        </v-col>
                    </v-row>
                </v-tabs-window-item>
            </v-tabs-window>
        </v-responsive>
    </v-container>
</template>
<style scoped>
@font-face {
    font-family: 'SigilosDoOutroLado';
    src: url('../assets/fonts/SigilosDoOutroLado.ttf') format('truetype');
}
@font-face {
    font-family: 'SinaisEstrangeiro';
    src: url('../assets/fonts/SinaisEstrangeiro.ttf') format('truetype');
}
.sigilos:hover {
    filter: drop-shadow(0 0 0.5em #cacaca);
    cursor: zoom-in;
    cursor: -moz-zoom-in; 
    cursor: -webkit-zoom-in;
}
.textarea-sigilos :deep( .v-field__input)  {
    font-family: 'SigilosDoOutroLado';
    font-size: 2em !important;
}
.textarea-sinais :deep(.v-field__input) {
    font-family: 'SinaisEstrangeiro';
    font-size: 2em !important;
}
img {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>