<script setup>
import condicoes from '../data/condicoes.json';
import { diceIconText } from '../plugins/global.js';
</script>
<template>
    <v-container>
        <v-card-title class="text-center">
            A menos que especificado o contrário, as condições terminam no fim da cena.
        </v-card-title>
        <div class="d-flex flex-wrap justify-center pt-1">
            <v-card v-for="condicao in condicoes" :key="condicao.id" class="ma-2 pa-2 " width="300">
                <v-card-title class="text-tormentaText text-wrap">
                    {{ condicao.nome }}
                </v-card-title>
                <v-card-text class="pb-2">
                    <p class="text-body-1" v-html="diceIconText(condicao.descricao)"></p>
                </v-card-text>
            </v-card>
        </div>
  </v-container>
</template>
<style scoped></style>