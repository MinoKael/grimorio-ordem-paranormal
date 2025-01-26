<script setup>
import Card from '../components/Card.vue';
import { useDisplay } from 'vuetify';
import Filtros from '../components/Filtros.vue';
import { useFiltrosStore } from '../stores/filtros';
const filtros = useFiltrosStore();

const { mdAndUp } = useDisplay();

</script>
<template>
    <!-- ritualS CONTAINER -->
    <v-container class="fill-height justify-center mb-4">
        <v-responsive
            class="text-center fill-height"
            :width="mdAndUp ? '1000' : ''"
        >
            <!-- BARRA PESQUISA -->
            <v-responsive class="mx-0 pa-1">
                <v-text-field
                  v-model.trim="filtros.filtroPesquisa.nome"
                  hide-details
                  clearable
                  label="Ritual"
                  placeholder="Cinerária..."
                  variant="solo"
                  bg-color="#7B08D9"
                  class="mx-4 custom-placeholer"
                  @update:model-value="filtros.filterRituais"
                />
            </v-responsive>
            <v-responsive class="mx-0 pa-1">
                <v-select
                  v-model="filtros.filtroPesquisa.referencia"
                  :items="filtros.filtroOpcoes.Referência"
                  multiple
                  clearable
                  chips
                  label="Referência"
                  density="comfortable"
                  variant="solo"
                  hide-details
                  bg-color="#7B08D9"
                  class="mx-4 custom-placeholer"
                  @update:model-value="filtros.filterRituais"
                />
            </v-responsive>
            <v-container class="d-flex flex-wrap pt-1 pb-1">
                <Filtros v-if="mdAndUp" :mdAndUp="mdAndUp" />

                <v-expansion-panels v-else class="mx-1 pb-1 font-weight-bold" color="#7B08D9">
                  <v-expansion-panel title="Filtros">
                    <v-expansion-panel-text>
                      <Filtros :mdAndUp="mdAndUp" />
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>
            </v-container>

            <v-btn color="#7B08D9" class="mx-2" @click="filtros.resetFiltro">
                Limpar Filtros
            </v-btn>
            <h4 class="pa-0 my-2">
                {{ filtros.filteredJson.length }} de
                {{ filtros.jsonRituais.length }} rituais encontradas
            </h4>
            <!-- CARDS CONTAINER -->
            <v-container class="d-flex flex-wrap justify-center pt-1">
              <Card
                v-for="(ritual, index) in filtros.filteredJson"
                :key="ritual.id"
                :ritualIndex="index"
                :rituals="filtros.filteredJson"
                v-bind="$attrs"
              />
            </v-container>
        </v-responsive>
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
</style>
