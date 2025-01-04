<script setup>
import { ref } from 'vue';
import { getImageUrl } from '../plugins/global.js';

const { src, alt, fit, magnify } = defineProps({
    src: String,
    alt: String,
});
const dialog = ref(false);
</script>
<template>
    <v-dialog v-model="dialog" height="100%" scrim="black" opacity="1" activator="parent">
        <div class="image-container" @click="dialog = !dialog">
            <v-img height="100%" aspect-ratio="4/3" :src="src" :alt="alt" style="margin: 0;" />
        </div>
    </v-dialog>
</template>
<style scoped>
.image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

:deep(.image-container img) {   
    object-fit: contain;
}
</style>