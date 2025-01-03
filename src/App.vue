<script setup>
import { ref } from 'vue';
import Footer from './components/Footer.vue';
import Rituais from './components/Rituais.vue';
import Sigilos from './components/Sigilos.vue';

const tab = ref(1);
</script>
<template>
    <v-app>
        <v-tabs v-model="tab" align-tabs="center" color="#ebebea">
            <v-tab :value="1">Grimório</v-tab>
            <v-tab :value="2">Sigilos</v-tab>
        </v-tabs>
        <v-main>
            <v-tabs-window v-model="tab">
                <v-tabs-window-item :value="1">
                    <Rituais></Rituais>
                </v-tabs-window-item>
                <v-tabs-window-item :value="2">
                    <Sigilos></Sigilos>
                </v-tabs-window-item>
            </v-tabs-window>
        </v-main>
        <Footer></Footer>
    </v-app>
</template>
<style scoped></style>
