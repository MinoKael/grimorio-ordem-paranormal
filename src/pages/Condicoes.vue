<script setup>
import { useFiltroCondicoesStore } from '../stores/filtroCondicoes';
import { diceIconText } from '../plugins/global.js';

const filtroCondicoes = useFiltroCondicoesStore();
</script>
<template>
    <v-container>
        <v-card-title class="text-center text-wrap">
            A menos que especificado o contrário, as condições terminam no fim da cena.
        </v-card-title>
        <!-- BARRA PESQUISA -->
        <v-responsive class="text-center">
            <v-responsive class="mx-0 pa-1">
                <v-text-field
                    v-model="filtroCondicoes.filtroPesquisa.nome"
                    hide-details
                    clearable
                    label="Condição"
                    placeholder="Abalado..."
                    variant="solo"
                    bg-color="ordemText"
                    class="mx-4 custom-placeholer"
                    @update:model-value="filtroCondicoes.filterCondicoes"
                />
            </v-responsive>
            <v-responsive class="mx-0 pa-1">
                <v-text-field
                    v-model="filtroCondicoes.filtroPesquisa.texto"
                    hide-details
                    clearable
                    label="Procurar no Texto"
                    placeholder="Você sofre -1d20..."
                    variant="solo"
                    bg-color="ordemText"
                    class="mx-4 custom-placeholer"
                    @update:model-value="filtroCondicoes.filterCondicoes"
                />
            </v-responsive>

            <v-btn
                color="ordemText"
                class="mx-2 mt-1"
                @click="filtroCondicoes.resetFiltro"
            >
                Limpar Filtros
            </v-btn>
            <h4 class="pa-0 my-2 font-tormenta condicoes-title">
                {{ filtroCondicoes.filteredJson.length }} de
                {{ filtroCondicoes.jsonCondicoes.length }} condições encontradas
            </h4>
        </v-responsive>
        <!-- CARDS CONTAINER -->
        <div class="d-flex flex-wrap justify-center pt-1">
            <v-card v-for="condicao in filtroCondicoes.filteredJson" :key="condicao.id" class="ma-2 pa-2 " width="300">
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
<style scoped>
:deep(.v-label) {
    color: white !important;
    opacity: 1;
    font-weight: bolder;
}
:deep(.v-field--active) {
    font-weight: 400 !important;
}
.condicoes-title {
    text-shadow: 0 2px 8px #000a;
    letter-spacing: 1px;
}
</style>
