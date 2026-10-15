import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import rawJson from '../data/condicoes.json';

const base = {
    nome: '',
    texto: '',
};

const filtroPesquisa = reactive({ ...base });
const jsonCondicoes = ref([]);
const filteredJson = ref([]);

jsonCondicoes.value = rawJson;
filteredJson.value = rawJson;
export const useFiltroCondicoesStore = defineStore('filtroCondicoes', () => {
    function resetFiltro() {
        Object.keys(base).forEach((key) => {
            filtroPesquisa[key] = Array.isArray(base[key]) ? [...base[key]] : base[key];
        });
        filterCondicoes();
    }

    function stringSearch(input, filter) {
        if (!filter || filter.trim() === '') {
            return true;
        }
        return normalizeString(input).includes(normalizeString(filter));
    }
    function normalizeString(string) {
        if (string == null) return '';
        if (Number.isInteger(string)) return string.toString();
        return string
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\s/g, '')
            .toLowerCase();
    }
    function filterCondicoes() {
        filteredJson.value = jsonCondicoes.value.filter((condicao) => {

            if (condicao.nome && condicao.descricao) {
                return stringSearch(condicao.nome, filtroPesquisa.nome) && stringSearch(condicao.descricao, filtroPesquisa.texto)
            }

            if (condicao.nome) {
                return stringSearch(condicao.nome, filtroPesquisa.nome)
            }

            return stringSearch(condicao.descricao, filtroPesquisa.texto)
        });
    };

    return {
        filterCondicoes,
        filteredJson,
        jsonCondicoes,
        resetFiltro,
        normalizeString,
        filtroPesquisa
    };
})
