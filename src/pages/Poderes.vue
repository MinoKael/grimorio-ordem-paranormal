<script setup>
import { ref, computed, watch } from 'vue';
import { useDisplay } from 'vuetify';
import { useFiltroPoderesStore } from '../stores/filtroPoderes';
import DialogPoder from '../components/DialogPoder.vue';
const { mdAndUp } = useDisplay();

const filtroPoderes = useFiltroPoderesStore();

const ITEMS_OPTIONS = [50, 'Tudo'];
const isShowingAll = computed(() => maxItemsPerPage.value === 'Tudo');

const maxItemsPerPage = ref(50);
const modelPagination = ref(1);
const poderesComputed = computed(() => {
    if (maxItemsPerPage.value === 'Tudo') {
        return filtroPoderes.filteredJson;
    } else {
        const startIndex =
            (modelPaginationComputed.value - 1) * maxItemsPerPage.value;
        const endIndex = startIndex + maxItemsPerPage.value;
        return filtroPoderes.filteredJson.slice(startIndex, endIndex);
    }
});
watch([maxItemsPerPage, () => filtroPoderes.filteredJson.length], () => {
  const totalPages = paginationComputed.value;
  if (modelPagination.value > totalPages) {
    modelPagination.value = totalPages;
  }
});
watch(() => filtroPoderes.filteredJson.length, (newLength, oldLength) => {
  if (oldLength === 0 && newLength > 0) {
    modelPagination.value = 1;
  }
});

const paginationComputed = computed(() => {
    if (maxItemsPerPage.value === 'Tudo') return 1;
    return Math.ceil(filtroPoderes.filteredJson.length / maxItemsPerPage.value);
});
const modelPaginationComputed = computed({
    get: () =>
        modelPagination.value > paginationComputed.value
            ? paginationComputed.value
            : modelPagination.value,
    set: (val) => (modelPagination.value = val),
});
</script>
<template>
    <v-container fluid :width="mdAndUp ? '1500' : '100%'">
        <v-responsive
            class="text-center fill-height"
            :width="mdAndUp ? '1500' : '100%'"
        >
            <!-- BARRA PESQUISA -->
            <v-responsive class="mx-0 pa-1">
                <v-text-field
                    v-model="filtroPoderes.filtroPesquisa.nome"
                    hide-details
                    clearable
                    label="Poder"
                    placeholder="Golpe Pesado..."
                    variant="solo"
                    bg-color="ordemText"
                    class="mx-4 custom-placeholer"
                    @update:model-value="filtroPoderes.filterPoderes"
                />
            </v-responsive>
            <v-responsive class="mx-0 pa-1">
                <v-text-field
                    v-model="filtroPoderes.filtroPesquisa.texto"
                    hide-details
                    clearable
                    label="Procurar no Texto"
                    placeholder="Com uma ação padrão..."
                    variant="solo"
                    bg-color="ordemText"
                    class="mx-4 custom-placeholer"
                    @update:model-value="filtroPoderes.filterPoderes"
                />
            </v-responsive>
            <v-responsive class="mx-0 pa-1">
                <v-autocomplete
                    v-model="filtroPoderes.filtroPesquisa.tags"
                    :items="filtroPoderes.filtroOpcoes.Tags"
                    multiple
                    clearable
                    chips
                    closable-chips
                    label="Tags"
                    variant="solo"
                    hide-details
                    item-value="value"
                    item-title="name"
                    bg-color="ordemText"
                    class="mx-4 custom-placeholer"
                    @update:model-value="filtroPoderes.filterPoderes"
                />
            </v-responsive>
            <v-responsive class="mx-0 pa-1">
                <v-select
                    v-model="filtroPoderes.filtroPesquisa.referencia"
                    :items="filtroPoderes.filtroOpcoes.Referência"
                    multiple
                    clearable
                    chips
                    closable-chips
                    label="Referência"
                    variant="solo"
                    hide-details
                    bg-color="ordemText"
                    class="mx-4 custom-placeholer"
                    @update:model-value="filtroPoderes.filterPoderes"
                />
            </v-responsive>

            <v-btn
                color="ordemText"
                class="mx-2 mt-1"
                @click="filtroPoderes.resetFiltro"
            >
                Limpar Filtros
            </v-btn>
            <h4 class="pa-0 my-2 font-tormenta poderes-title">
                {{ filtroPoderes.filteredJson.length }} de
                {{ filtroPoderes.jsonPoderes.length }} poderes encontrados
            </h4>
            <!-- CARDS CONTAINER -->
            <v-container fluid class="d-flex flex-wrap justify-center pt-1">
                <v-hover v-slot="{ isHovering }">
                    <v-card
                        v-for="(poder, index) in poderesComputed"
                        :key="poder.id"
                        class="ma-2 pa-2 d-flex flex-column align-center justify-space-between"
                        :class="{ 'on-hover': isHovering }"
                        hover
                        :elevation="isHovering ? 12 : 6"
                        width="300"
                    >
                        <v-card-title
                            class="text-tormentaText text-wrap font-tormenta text-center"
                        >
                            {{ poder.nome }}
                        </v-card-title>
                        <v-card-subtitle
                            class="pb-2 d-flex justify-center flex-wrap ga-1"
                            style="opacity: 1!important;"
                        >
                            <span
                                style="
                                    font-size: 0.9rem;
                                    border: 1px solid #ce2a28;
                                    font-weight: 400;
                                    color: white;
                                    font-weight: bold;
                                    border-radius: 30px;
                                "
                                class="px-2"
                                v-for="tag in poder.tags"
                                :key="tag"
                            >
                                {{ filtroPoderes.convertTag(tag) }}
                            </span>
                        </v-card-subtitle>
                        <span class="mb-1"><strong>Referência: </strong>{{ poder.referencia }};&nbsp</span>

                        <DialogPoder :poderIndex="index + (isShowingAll ? 0 : (modelPaginationComputed - 1) * maxItemsPerPage)" />
                    </v-card>
                </v-hover>
            </v-container>
        </v-responsive>
        <v-responsive :width="mdAndUp ? '1000' : ''" v-if="!isShowingAll">
            <v-row no-gutters justify="end" class="my-4">
                <span class="mr-3 d-flex align-center">Itens por página</span>
                <v-select
                    v-model="maxItemsPerPage"
                    :items="ITEMS_OPTIONS"
                    variant="solo-filled"
                    hide-details
                    style="max-width: fit-content !important"
                ></v-select>

                <v-pagination
                    style="min-width: 400px !important"
                    v-model="modelPaginationComputed"
                    :length="paginationComputed"
                    :total-visible="3"
                ></v-pagination>
            </v-row>
        </v-responsive>
        <v-responsive :width="mdAndUp ? '1000' : ''" v-else>
            <v-row no-gutters justify="end" class="my-4">
                <span class="mr-3 d-flex align-center">Itens por página</span>
                <v-select
                    v-model="maxItemsPerPage"
                    :items="ITEMS_OPTIONS"
                    variant="solo-filled"
                    hide-details
                    style="max-width: fit-content !important;margin-right: 40px;"
                ></v-select>
            </v-row>
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
.poderes-title {
    text-shadow: 0 2px 8px #000a;
    letter-spacing: 1px;
}
</style>
