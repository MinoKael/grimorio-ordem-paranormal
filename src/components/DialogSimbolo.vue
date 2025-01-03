<script setup>
import { defineProps, ref } from 'vue';
import VueMagnifier from '@websitebeaver/vue-magnifier'
import '@websitebeaver/vue-magnifier/styles.css'

const { src, alt, fit } = defineProps(['src', 'alt', 'fit']);
const dialog = ref(false);
function getImageUrl() {
    return new URL(src, import.meta.url)
}

</script>
<template>
    <v-dialog v-model="dialog" width="1200" height="100%" scrim="black" opacity="1" activator="parent">
        <v-btn flat icon @click="dialog = !dialog" class="align-self-end">
            <v-icon>mdi-close</v-icon>
        </v-btn>
        <div class="image-container">
            <VueMagnifier :src="getImageUrl()" :alt="alt" width="1200" :height="`${fit ? '100%' : ''}`" mgCornerBgColor="#000" mgWidth="250"  mgHeight="250" zoomFactor="1.1" />
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