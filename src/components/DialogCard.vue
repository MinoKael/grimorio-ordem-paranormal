<script setup>
import { ref, watch } from 'vue';
import { elementoCor } from '../plugins/global.js';
const dialog = ref(false);
const dialogSimbolo = ref(false);
const imageNotLoaded = ref(false);
const { ritualIndex, rituals } = defineProps(['ritualIndex', 'rituals']);

let ritual = Object.assign({}, rituals[ritualIndex]);
let currentIndex = ref(ritualIndex);

function nextRitual() {
    if (currentIndex.value < rituals.length - 1) {
        currentIndex.value++;
        imageNotLoaded.value = false;
        ritual = rituals[currentIndex.value];
    }
}
function prevRitual() {
    if (currentIndex.value > 0) {
        currentIndex.value--;
        imageNotLoaded.value = false;
        ritual = rituals[currentIndex.value];
    }
}
watch(dialog, () => {
    if(!dialog.value) {
        currentIndex.value = ritualIndex;
        ritual = Object.assign({}, rituals[ritualIndex]);
    }
});
</script>
<template>
    <v-dialog
        v-model="dialog"
        max-width="800px"
        scrollable
        transition="dialog-bottom-transition"
        activator="parent"
        scrim="black"
        >
        <div class="d-flex flex-row align-center justify-center">
            <v-btn icon @click="prevRitual" :disabled="currentIndex === 0">
                <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <v-card class="mx-2">
                <v-row no-gutters>
                    <v-col no-gutters cols="7">
                        <v-card-title class="text-h4 font-weight-bold text-tormentaText text-wrap px-6 pt-4">
                            {{ ritual.nome }}
                        </v-card-title>
                        <v-card-subtitle class="d-flex align-center font-weight-bold px-6">
                            <span
                                class="text-h6 px-1"
                                :class="ritual.elemento === 'Medo' ? 'font-weight-light' : 'font-weight-bold '"
                                :style="{
                                    'background-color': elementoCor(ritual.elemento),
                                    color: ritual.elemento === 'Medo' ? 'black' : 'white'
                                }">
                                {{ ritual.elemento }} {{ ritual.circulo }}
                            </span>
                            <span class="text-redTormenta text-h6 font-weight-bold ml-1">
                                {{ ritual.custo }} PE
                            </span>
                        </v-card-subtitle>
                        <v-card-text class="d-flex flex-column px-6 text-body-1">
                            <span v-if="ritual.execucao">
                                <span class="text-tormentaText"><strong>Execução:</strong> </span> {{ ritual.execucao }};&nbsp
                            </span>
                            <span v-if="ritual.alcance">
                                <span class="text-tormentaText"><strong>Alcance:</strong> </span> {{ ritual.alcance }};&nbsp
                            </span>
                            <span v-if="ritual.alvo">
                                <span class="text-tormentaText"><strong>Alvo:</strong> </span> {{ ritual.alvo }};&nbsp
                            </span>
                            <span v-if="ritual.area">
                                <span class="text-tormentaText"><strong>Área:</strong> </span> {{ ritual.area }};&nbsp
                            </span>
                            <span v-if="ritual.efeito">
                                <span class="text-tormentaText"><strong>Efeito:</strong> </span> {{ ritual.efeito }};&nbsp
                            </span>
                            <span v-if="ritual.duracao">
                                <span class="text-tormentaText"><strong>Duração:</strong> </span> {{ ritual.duracao }};&nbsp
                            </span>
                            <span v-if="ritual.resistencia">
                                <span class="text-tormentaText"><strong>Resistência:</strong> </span> {{ ritual.resistencia }};&nbsp
                            </span>
                            <span>
                                <span class="text-tormentaText"><strong>Referência:</strong> </span> {{ ritual.referencia }};&nbsp
                            </span>
                        </v-card-text>
                    </v-col>
                    <v-col no-gutters cols="5">
                        <div class="d-flex justify-center align-center pr-3">
                            <img :src="`/src/assets/${ritual.simbolo}`" :alt="`Símbolo ${ritual.nome}`" class="simbolo" :class="{ 'image-error': imageNotLoaded }" @error="imageNotLoaded = true" @click="() => {if(!imageNotLoaded) dialogSimbolo = !dialogSimbolo}" />
                        </div>
                        <v-dialog v-model="dialogSimbolo" width="50%" height="100%" scrim="black" opacity="1">
                            <v-btn text icon @click="dialogSimbolo = !dialogSimbolo" class="align-self-end">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                            <div class="dialog-content">
                                <img :src="`/src/assets/${ritual.simbolo}`" :alt="`Símbolo ${ritual.nome}`" style="margin: 0;" class="centered-img" />
                            </div>
                        </v-dialog>
                    </v-col>
                </v-row>
                <v-card-text class="pt-0">
                    <v-divider></v-divider>
    
                    <p class="mt-2 text-pre-wrap">{{ ritual.texto }}</p>
    
                    <v-divider class="my-3"></v-divider>
    
                    <p v-for="aprimoramento in ritual.aprimoramentos">
                        <span class="text-tormentaText font-weight-bold">
                            {{ aprimoramento.match(/.+?:/).toString() }}
                        </span>
                        {{ aprimoramento.match(/(?<=:).+/).toString() }}
                    </p>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="tormentaText" block @click="dialog = false">
                        Fechar
                    </v-btn>
                </v-card-actions>
            </v-card>
            <v-btn icon @click="nextRitual" :disabled="currentIndex === rituals.length - 1">
                <v-icon>mdi-arrow-right</v-icon>
            </v-btn>
         </div>
    </v-dialog>
</template>
<style scoped>
:deep(.v-card-subtitle) {
    opacity: 1 !important;
}
.simbolo {
    height: 16em;
    padding: 0.5em;
    will-change: filter;
    transition: filter 300ms;
}
.simbolo:hover {
    filter: drop-shadow(0 0 0.5em #cacaca);
    cursor: pointer;
}

.dialog-content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    overflow: hidden;
}

.dialog-content img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}
img {
    display: flex;
    align-items: center;
    justify-content: center;
}
.image-error {
    cursor: none;
    pointer-events: none;
}

</style>
