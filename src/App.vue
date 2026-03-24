<script setup>
import { ref } from 'vue';
import Footer from './components/Footer.vue';
import Rituais from './pages/Rituais.vue';
import Sigilos from './pages/Sigilos.vue';
import Condicoes from './pages/Condicoes.vue';
import Poderes from './pages/Poderes.vue';

const tab = ref(1);
</script>
<template>
    <v-app>
        <v-tabs v-model="tab" align-tabs="center" color="#ebebea">
            <v-tab :value="1">Rituais</v-tab>
            <v-tab :value="2">Poderes</v-tab>
            <v-tab :value="3">Sigilos</v-tab>
            <v-tab :value="4">Condições</v-tab>
        </v-tabs>
        <v-main>
            <v-tabs-window v-model="tab">
                <v-tabs-window-item :value="1">
                    <Rituais></Rituais>
                </v-tabs-window-item>
                <v-tabs-window-item :value="2">
                    <Poderes></Poderes>
                </v-tabs-window-item>
                <v-tabs-window-item :value="3">
                    <Sigilos></Sigilos>
                </v-tabs-window-item>
                <v-tabs-window-item :value="4">
                    <Condicoes></Condicoes>
                </v-tabs-window-item>
            </v-tabs-window>
        </v-main>
        <Footer></Footer>
    </v-app>
</template>
<style scoped></style>
