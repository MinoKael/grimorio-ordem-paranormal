<script setup>
import { useFiltrosStore } from '../stores/filtros';
const filtros = useFiltrosStore();

const { mdAndUp } = defineProps(['mdAndUp']);
</script>
<template>
    <v-row no-gutters>
        <v-col
            v-for="(value, key) in filtros.filtroOpcoes"
            :key="key"
            cols="12"
            :style="mdAndUp ? 'flex: 0 0 25%; max-width:100%' : ''"
        >
            <v-responsive class="ma-1">
                <v-select
                    v-if="key != 'Referência'"
                    :key="key"
                    :label="key"
                    :items="value"
                    v-model="
                        filtros.filtroPesquisa[filtros.normalizeString(key)]
                    "
                    multiple
                    clearable
                    chips
                    variant="solo"
                    density="comfortable"
                    bg-color="#7B08D9"
                    hide-details
                    @update:model-value="filtros.filterRituais"
                />
            </v-responsive>
        </v-col>
    </v-row>
</template>
