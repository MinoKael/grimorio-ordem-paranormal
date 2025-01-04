<script setup>
import DialogCard from './DialogCard.vue';
import { elementoCor } from '../plugins/global.js'; 

const { ritualIndex, rituals } = defineProps(['ritualIndex', 'rituals']);
let ritual = Object.assign({}, rituals[ritualIndex]);

</script>
<template>
    <v-hover v-slot="{ isHovering, props }">
        <v-card
            class="ma-2 pa-2 d-flex flex-column"
            :class="{ 'on-hover': isHovering }"
            :elevation="isHovering ? 12 : 6"
            width="300"
            hover
            v-bind="props"
        >
            <v-card-item class="pb-0">
                <v-card-title class="text-tormentaText text-wrap">{{
                    ritual.nome
                }}</v-card-title>
                <v-card-subtitle class="pb-2">
                    <span
                        class="text-h6 px-1"
                        :class="ritual.elemento === 'Medo' ? 'font-weight-light' : 'font-weight-bold '"
                        :style="{
                            'background-color': elementoCor(ritual.elemento),
                            color: ritual.elemento === 'Medo' ? 'black' : 'white'
                        }"
                        >{{ ritual.elemento }} {{ ritual.circulo }}</span
                    >
                    <span class="text-redTormenta text-h6 font-weight-bold ml-1"
                        >{{ ritual.custo }} PE</span
                    >
                </v-card-subtitle>
            </v-card-item>
            <span v-if="ritual.execucao">
                <strong>Execução: </strong> {{ ritual.execucao }};&nbsp
            </span>
            <span v-if="ritual.alcance">
                <strong>Alcance: </strong> {{ ritual.alcance }};&nbsp
            </span>
            <span v-if="ritual.alvo"
                ><strong>Alvo: </strong> {{ ritual.alvo }};&nbsp
            </span>
            <span v-if="ritual.area"
                ><strong>Área: </strong> {{ ritual.area }};&nbsp
            </span>
            <span v-if="ritual.efeito">
                <strong>Efeito: </strong> {{ ritual.efeito }};&nbsp
            </span>
            <span v-if="ritual.duracao">
                <strong>Duração: </strong> {{ ritual.duracao }};&nbsp
            </span>
            <span v-if="ritual.resistencia">
                <strong>Resistência: </strong> {{ ritual.resistencia }};&nbsp
            </span>
            <span>
                <strong>Referência:</strong> {{ ritual.referencia }};&nbsp
            </span>
            <v-spacer />
            <DialogCard :ritualIndex="ritualIndex" :rituals="rituals" />
        </v-card>
    </v-hover>
</template>
<style scoped>
:deep(.v-card-subtitle) {
    opacity: 1 !important;
}
</style>
