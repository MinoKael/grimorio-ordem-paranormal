<script setup>
import { ref } from 'vue';
import VueMagnifier from '@websitebeaver/vue-magnifier'
import '@websitebeaver/vue-magnifier/styles.css'
import { getImageUrl } from '../plugins/global.js';

const { src, alt, fit, magnify } = defineProps({
    src: String,
    alt: String,
    fit: {
        type: Boolean,
        default: false
    },
    magnify: {
        type: Boolean,
        default: false
    }
});
const dialog = ref(false);
</script>
<template>
    <v-dialog v-model="dialog" width="1000" height="100%" scrim="black" opacity="1" activator="parent">
        <v-btn flat icon @click="dialog = !dialog" class="align-self-end">
            <v-icon>mdi-close</v-icon>
        </v-btn>
        <div v-if="magnify" class="image-container">
            <VueMagnifier :src="src" :alt="alt" width="1000" :height="`${fit ? '100%' : ''}`" mgCornerBgColor="#000" mgWidth="250"  mgHeight="250" zoomFactor="1.1" />
        </div>
        <div v-else class="dialog-content">
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
</style>