<script setup>
import { ref, watch, computed, onMounted, onUnmounted } from 'vue';
import { useFiltroPoderesStore } from '../stores/filtroPoderes';
import { diceIconText, elementoCor } from '../plugins/global.js';

const filtroPoderes = useFiltroPoderesStore();
const dialog = ref(false);
const { poderIndex } = defineProps(['poderIndex']);

const currentIndex = ref(poderIndex);
const currentPoder = computed(() => filtroPoderes.filteredJson[currentIndex.value]);

function nextPoder() {
    if (currentIndex.value < filtroPoderes.filteredJson.length - 1) {
        currentIndex.value++;
    }
}
function prevPoder() {
    if (currentIndex.value > 0) {
        currentIndex.value--;
    }
}
watch(dialog, () => {
    if(dialog.value) {
        currentIndex.value = poderIndex;
    }
});
function highlightMatches(originalText, searchTerm) {
    if (!searchTerm) return originalText;

    const normalizedSearch = filtroPoderes.normalizeString(searchTerm);
    if (!normalizedSearch) return originalText;

    const normalizedChars = [];
    const positionMap = [];

    for (let i = 0; i < originalText.length; i++) {
        const norm = filtroPoderes.normalizeString(originalText[i]);
        for (let j = 0; j < norm.length; j++) {
        normalizedChars.push(norm[j]);
        positionMap.push(i); 
        }
    }

    const normalizedText = normalizedChars.join('');
    const matchIndices = [];

    let i = 0;
    while (i <= normalizedText.length - normalizedSearch.length) {
        if (normalizedText.slice(i, i + normalizedSearch.length) === normalizedSearch) {
        matchIndices.push([i, i + normalizedSearch.length]);
        i += normalizedSearch.length; 
        } else {
        i++;
        }
    }

    if (matchIndices.length === 0) return originalText;
    
    let result = '';
    let lastIndex = 0;

    for (const [startNorm, endNorm] of matchIndices) {
        const startOrig = positionMap[startNorm];
        const endOrig = positionMap[endNorm - 1] + 1;

        result += originalText.slice(lastIndex, startOrig);
        result += `<mark>${originalText.slice(startOrig, endOrig)}</mark>`;
        lastIndex = endOrig;
    }

    result += originalText.slice(lastIndex);
    return result;
}
const handleKey = (event) => {
    if (event.key === 'ArrowLeft') {
    prevPoder();
    } else if (event.key === 'ArrowRight') {
    nextPoder();
    }
};
function replaceElementColor(text) {
    return text.replace(/<el>(([A-Z])\w+)<\/el>/g, (_, textoInterno) => {
        const cor = elementoCor(textoInterno);
        return `<b>• <span style="background-color: ${cor}; padding: 2px 4px">${textoInterno}</span></b>`;
    });
}

onMounted(() => {
    window.addEventListener('keydown', handleKey);
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleKey);
});

</script>
<template>
    <v-dialog
        v-model="dialog"
        height="90%"
        max-width="800px"
        scrollable
        transition="dialog-bottom-transition"
        activator="parent"
        scrim="background"
        style="min-height: 50%;"
    >
        <v-card>
            <v-card-item class="pb-0">
                <v-card-title class="text-tormentaText text-wrap font-tormenta-lg text-center">
                    {{ currentPoder.nome }}
                </v-card-title>
            </v-card-item>
            <div class="d-flex flex-column text-body-1 pl-6">
                <v-card-subtitle
                    class="ml-n2 pl-0 pb-2 d-flex justify-center flex-wrap ga-1"
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
                        v-for="tag in currentPoder.tags"
                        :key="tag"
                    >
                        {{ filtroPoderes.convertTag(tag) }}
                    </span>
                </v-card-subtitle>
                <span class="text-tormentaText font-tormenta-xs"><strong>Referência:</strong> </span> {{ currentPoder.referencia }};&nbsp
            </div>
            <v-divider class="my-3"></v-divider>
            <v-card-text class="pt-2">

                <p class="text-pre-wrap" v-html="replaceElementColor(diceIconText(highlightMatches(currentPoder.texto, filtroPoderes.filtroPesquisa.texto)))"></p>

                <v-divider class="my-3"></v-divider>
            </v-card-text>
            <v-card-actions class="d-flex justify-space-between" style="width: 100%;">
                <v-btn icon @click="prevPoder" :disabled="currentIndex === 0">
                    <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
                <v-btn color="tormentaText font-tormenta" class="mx-2" style="flex: 1;" @click="dialog = false">
                    Fechar
                </v-btn>
                <v-btn icon @click="nextPoder" :disabled="currentIndex === filtroPoderes.filteredJson.length - 1">
                    <v-icon>mdi-arrow-right</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<style scoped>
:deep(.v-card-subtitle) {
    opacity: 1 !important;
}
mark {
  background-color: yellow;
  color: black;
  padding: 0 2px;
  border-radius: 2px;
}
</style>
