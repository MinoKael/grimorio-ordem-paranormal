<script setup>
import { ref, watch, computed } from 'vue';
import { elementoCor, getImageUrl } from '../plugins/global.js';
import DialogSimbolo from './DialogSimbolo.vue';
import { useDisplay } from 'vuetify';


const { mdAndUp } = useDisplay();

const dialog = ref(false);
const imageNotLoaded = ref(false);
const { ritualIndex, rituals } = defineProps(['ritualIndex', 'rituals']);

let ritual = Object.assign({}, rituals[ritualIndex]);
let currentIndex = ref(ritualIndex);
let imageUrl = getImageUrl(ritual.simbolo);

function nextRitual() {
    if (currentIndex.value < rituals.length - 1) {
        currentIndex.value++;
        imageNotLoaded.value = false;
        ritual = rituals[currentIndex.value];
        imageUrl = getImageUrl(ritual.simbolo);
    }
}
function prevRitual() {
    if (currentIndex.value > 0) {
        currentIndex.value--;
        imageNotLoaded.value = false;
        ritual = rituals[currentIndex.value];
        imageUrl = getImageUrl(ritual.simbolo);
    }
}
watch(dialog, () => {
    if(dialog.value) {
        currentIndex.value = ritualIndex;
        ritual = Object.assign({}, rituals[ritualIndex]);
        imageUrl = getImageUrl(ritual.simbolo);
    }
});
</script>
<template>
    <v-dialog
        v-if="mdAndUp"
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
                            <span class="text-h6 font-weight-bold ml-1">
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
                    <v-col no-gutters cols="5" class="d-flex align-center justify-center">
                        <div class="d-flex justify-center align-center pr-3">
                            <img height="100%" :src="imageUrl" :alt="`Símbolo ${ritual.nome}`" class="simbolo" :class="{ 'image-error': imageNotLoaded }" @error="imageNotLoaded = true">
                                <DialogSimbolo v-if="!imageNotLoaded" :src="imageUrl" :alt="`Símbolo ${ritual.nome}`" />
                            </img>
                        </div>
                    </v-col>
                </v-row>
                <v-card-text class="pt-0 text-body-1">
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
    <v-dialog
        v-else
        v-model="dialog"
        max-width="800px"
        scrollable
        transition="dialog-bottom-transition"
        activator="parent"
        scrim="background"
    >
        <v-card>
            <v-card-title class="text-h4 font-weight-bold text-tormentaText text-wrap px-6 pt-4 pb-0">
                {{ ritual.nome }}
            </v-card-title>
            <span class="d-flex justify-center">
                <img v-if="!imageNotLoaded" height="100%" :src="imageUrl" :alt="`Símbolo ${ritual.nome}`" class="simbolo" :class="{ 'image-error': imageNotLoaded }" @error="imageNotLoaded = true">
                    <DialogSimbolo :src="imageUrl" :alt="`Símbolo ${ritual.nome}`" />
                </img>
            </span>
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
                <span class="ml-2 text-h6 font-weight-bold">
                    {{ ritual.custo }} PE
                </span>
            </v-card-subtitle>
            <div class="d-flex flex-column text-body-1 pl-6">
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
            </div>
            <v-divider class="my-3"></v-divider>
            <v-card-text class="pt-2">

                <p class="text-pre-wrap">{{ ritual.texto }}</p>

                <v-divider class="my-3"></v-divider>

                <p v-for="aprimoramento in ritual.aprimoramentos">
                    <span class="text-tormentaText font-weight-bold">{{
                        aprimoramento.match(/.+?:/).toString()
                    }}</span>
                    {{ aprimoramento.match(/(?<=:).+/).toString() }}
                </p>
            </v-card-text>
            <v-card-actions>
                <v-btn color="tormentaText" block @click="dialog = false">
                    Fechar
                </v-btn>
            </v-card-actions>
        </v-card>
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
    cursor: zoom-in;
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
