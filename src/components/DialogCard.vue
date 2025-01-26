<script setup>
import { ref, watch, computed } from 'vue';
import { elementoCor, getImageUrl, diceIconText } from '../plugins/global.js';
import DialogSimbolo from './DialogSimbolo.vue';
import { useDisplay } from 'vuetify';


const { mdAndUp } = useDisplay();

const dialog = ref(false);
const imageNotLoaded = ref(false);
const { ritualIndex, rituals } = defineProps(['ritualIndex', 'rituals']);

const currentRitual = computed(() => rituals[currentIndex.value]);
const currentIndex = ref(ritualIndex);
const imageUrl = computed(() => getImageUrl(currentRitual.value.simbolo));

function nextRitual() {
    if (currentIndex.value < rituals.length - 1) {
        currentIndex.value++;
        imageNotLoaded.value = false;
    }
}
function prevRitual() {
    if (currentIndex.value > 0) {
        currentIndex.value--;
        imageNotLoaded.value = false;
    }
}
watch(dialog, () => {
    if(dialog.value) {
        currentIndex.value = ritualIndex;
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
        <v-card class="mx-2">
            <v-row no-gutters>
                <v-col no-gutters cols="7">
                    <v-card-title class="text-h4 font-weight-bold text-tormentaText text-wrap px-6 pt-4">
                        {{ currentRitual.nome }}
                    </v-card-title>
                    <v-card-subtitle class="d-flex align-center font-weight-bold px-6">
                        <span
                        class="text-h6 px-1"
                        :class="currentRitual.elemento === 'Medo' ? 'font-weight-light' : 'font-weight-bold '"
                        :style="{
                                'background-color': elementoCor(currentRitual.elemento),
                                color: currentRitual.elemento === 'Medo' ? 'black' : 'white'
                            }">
                            {{ currentRitual.elemento }} {{ currentRitual.circulo }}
                        </span>
                        <span class="text-h6 font-weight-bold ml-1">
                            {{ currentRitual.custo }} PE
                        </span>
                    </v-card-subtitle>
                    <v-card-text class="d-flex flex-column px-6 text-body-1">
                        <span v-if="currentRitual.execucao">
                            <span class="text-tormentaText"><strong>Execução:</strong> </span> {{ currentRitual.execucao }};&nbsp
                        </span>
                        <span v-if="currentRitual.alcance">
                            <span class="text-tormentaText"><strong>Alcance:</strong> </span> {{ currentRitual.alcance }};&nbsp
                        </span>
                        <span v-if="currentRitual.alvo">
                            <span class="text-tormentaText"><strong>Alvo:</strong> </span> {{ currentRitual.alvo }};&nbsp
                        </span>
                        <span v-if="currentRitual.area">
                            <span class="text-tormentaText"><strong>Área:</strong> </span> {{ currentRitual.area }};&nbsp
                        </span>
                        <span v-if="currentRitual.efeito">
                            <span class="text-tormentaText"><strong>Efeito:</strong> </span> {{ currentRitual.efeito }};&nbsp
                        </span>
                        <span v-if="currentRitual.duracao">
                            <span class="text-tormentaText"><strong>Duração:</strong> </span> {{ currentRitual.duracao }};&nbsp
                        </span>
                        <span v-if="currentRitual.resistencia">
                            <span class="text-tormentaText"><strong>Resistência:</strong> </span> {{ currentRitual.resistencia }};&nbsp
                        </span>
                        <span>
                            <span class="text-tormentaText"><strong>Referência:</strong> </span> {{ currentRitual.referencia }};&nbsp
                        </span>
                    </v-card-text>
                </v-col>
                <v-col no-gutters cols="5" class="d-flex align-center justify-center">
                    <div class="d-flex justify-center align-center pr-3">
                        <img height="100%" :src="imageUrl" :alt="`Símbolo ${currentRitual.nome}`" class="simbolo" :class="{ 'image-error': imageNotLoaded }" @error="imageNotLoaded = true">
                        <DialogSimbolo v-if="!imageNotLoaded" :src="imageUrl" :alt="`Símbolo ${currentRitual.nome}`" />
                    </img>
                </div>
            </v-col>
            </v-row>
            <v-card-text class="pt-0 pb-2 text-body-1">
                <v-divider></v-divider>
                
                <p class="mt-2 text-pre-wrap" v-html="diceIconText(currentRitual.texto)"></p>
                
                <v-divider class="my-3"></v-divider>
                
                <p v-for="aprimoramento in currentRitual.aprimoramentos">
                    <span class="text-tormentaText font-weight-bold">
                        {{ aprimoramento.match(/.+?:/).toString() }}
                    </span>
                    <span v-html="diceIconText(aprimoramento.match(/(?<=:).+/).toString())"></span>
                </p>
            </v-card-text>
            <v-card-actions class="justify-space-between">
                <v-btn icon @click="prevRitual" :disabled="currentIndex === 0">
                    <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
                <v-btn color="tormentaText" style="width: 80%;" @click="dialog = false">
                    Fechar
                </v-btn>
                <v-btn icon @click="nextRitual" :disabled="currentIndex === rituals.length - 1">
                    <v-icon>mdi-arrow-right</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
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
                {{ currentRitual.nome }}
            </v-card-title>
            <span class="d-flex justify-center">
                <img v-if="!imageNotLoaded" height="100%" :src="imageUrl" :alt="`Símbolo ${currentRitual.nome}`" class="simbolo" :class="{ 'image-error': imageNotLoaded }" @error="imageNotLoaded = true">
                    <DialogSimbolo :src="imageUrl" :alt="`Símbolo ${currentRitual.nome}`" />
                </img>
            </span>
            <v-card-subtitle class="d-flex align-center font-weight-bold px-6">
                <span
                    class="text-h6 px-1"
                    :class="currentRitual.elemento === 'Medo' ? 'font-weight-light' : 'font-weight-bold '"
                    :style="{
                        'background-color': elementoCor(currentRitual.elemento),
                        color: currentRitual.elemento === 'Medo' ? 'black' : 'white'
                    }">
                    {{ currentRitual.elemento }} {{ currentRitual.circulo }}
                </span>
                <span class="ml-2 text-h6 font-weight-bold">
                    {{ currentRitual.custo }} PE
                </span>
            </v-card-subtitle>
            <div class="d-flex flex-column text-body-1 pl-6">
                <span v-if="currentRitual.execucao">
                    <span class="text-tormentaText"><strong>Execução:</strong> </span> {{ currentRitual.execucao }};&nbsp
                </span>
                <span v-if="currentRitual.alcance">
                    <span class="text-tormentaText"><strong>Alcance:</strong> </span> {{ currentRitual.alcance }};&nbsp
                </span>
                <span v-if="currentRitual.alvo">
                    <span class="text-tormentaText"><strong>Alvo:</strong> </span> {{ currentRitual.alvo }};&nbsp
                </span>
                <span v-if="currentRitual.area">
                    <span class="text-tormentaText"><strong>Área:</strong> </span> {{ currentRitual.area }};&nbsp
                </span>
                <span v-if="currentRitual.efeito">
                    <span class="text-tormentaText"><strong>Efeito:</strong> </span> {{ currentRitual.efeito }};&nbsp
                </span>
                <span v-if="currentRitual.duracao">
                    <span class="text-tormentaText"><strong>Duração:</strong> </span> {{ currentRitual.duracao }};&nbsp
                </span>
                <span v-if="currentRitual.resistencia">
                    <span class="text-tormentaText"><strong>Resistência:</strong> </span> {{ currentRitual.resistencia }};&nbsp
                </span>
                <span>
                    <span class="text-tormentaText"><strong>Referência:</strong> </span> {{ currentRitual.referencia }};&nbsp
                </span>
            </div>
            <v-divider class="my-3"></v-divider>
            <v-card-text class="pt-2">

                <p class="text-pre-wrap" v-html="diceIconText(currentRitual.texto)"></p>

                <v-divider class="my-3"></v-divider>

                <p v-for="aprimoramento in currentRitual.aprimoramentos">
                    <span class="text-tormentaText font-weight-bold">{{
                        aprimoramento.match(/.+?:/).toString()
                    }}</span>
                    <span v-html="diceIconText(aprimoramento.match(/(?<=:).+/).toString())"></span>
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
