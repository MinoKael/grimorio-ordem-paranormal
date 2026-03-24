import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import rawJson from '../data/poderes.json';

const base = {
    nome: '',
    texto: '',
    tags: [],
    referencia: [],
};

const PREDEFINED_TAGS = [
    { name: "Combatente", value: "combatente" },
    { name: "Especialista", value: "especialista" },
    { name: "Ocultista", value: "ocultista" },
    { name: "Poder de Classe", value: "poder_classe" },
    { name: "Poder de Trilha", value: "poder_trilha" },
    { name: "Poder de Origem", value: "poder_origem" },
    { name: "Poder Geral", value: "poder_geral" },
    { name: "Poder Paranormal", value: "poder_paranormal" },
    { name: "Sangue", value: "sangue" },
    { name: "Morte", value: "morte" },
    { name: "Conhecimento", value: "conhecimento" },
    { name: "Energia", value: "energia" },
    { name: "Medo", value: "medo" },
    { name: "Intenção", value: "intencao" },
    { name: "Aniquilador", value: "aniquilador" },
    { name: "Comandante de Campo", value: "comandante_campo" },
    { name: "Guerreiro", value: "guerreiro" },
    { name: "Operações Especiais", value: "operacoes_especiais" },
    { name: "Tropa de Choque", value: "tropa_choque" },
    { name: "Atirador de Elite", value: "atirador_elite" },
    { name: "Infiltrador", value: "infiltrador" },
    { name: "Médico de Campo", value: "medico_campo" },
    { name: "Negociador", value: "negociador" },
    { name: "Técnico", value: "tecnico" },
    { name: "Conduíte", value: "conduite" },
    { name: "Flagelador", value: "flagelador" },
    { name: "Graduado", value: "graduado" },
    { name: "Intuitivo", value: "intuitivo" },
    { name: "Lâmina Paranormal", value: "lamina_paranormal" },
    { name: "Agente Secreto", value: "agente_secreto" },
    { name: "Caçador", value: "cacador" },
    { name: "Monstruoso", value: "monstruoso" },
    { name: "Bibliotecário", value: "bibliotecario" },
    { name: "Perseverante", value: "perseverante" },
    { name: "Muambeiro", value: "muambeiro" },
    { name: "Exorcista", value: "exorcista" },
    { name: "Possuído", value: "possuido" },
    { name: "Parapsicólogo", value: "parapsicologo" },
    { name: "Maledictólogo", value: "maledictologo" },
];
const filtroPesquisa = reactive({ ...base });
const jsonPoderes = ref([]);
const filteredJson = ref([]);
const loading = ref(true);

jsonPoderes.value = rawJson
filteredJson.value = rawJson;
export const useFiltroPoderesStore = defineStore('filtroPoderes', () => {
    function resetFiltro() {
        Object.keys(base).forEach((key) => {
            filtroPesquisa[key] = base[key];
        });
        filterPoderes();
    }

    const filtroOpcoes = reactive({
        Tags: PREDEFINED_TAGS,
        Referência: ['Livro Básico', 'Sobrevivendo ao Horror', 'Arquivos Secretos']
    });

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
    function filterPoderes() {
        filteredJson.value = jsonPoderes.value.filter((poder) => {
          return (
            stringSearch(poder.nome, filtroPesquisa.nome) &&
            new RegExp(normalizeString(filtroPesquisa.texto), 'i').test(normalizeString(poder.texto)) &&
            applyFilterArray(filtroPesquisa.tags, poder.tags) &&
            applyFilter(filtroPesquisa.referencia, poder.referencia)
          );
        });
    };

    function applyFilter(filterValues, poderProperty) {
        if (filterValues.length === 0) return true;
        return filterValues.some((x) => normalizeString(poderProperty).includes(normalizeString(x)))
    }
    function applyFilterArray(filterValues, poderProperty) {
        if (filterValues.length === 0) return true;

        if (!Array.isArray(poderProperty)) return false;

        return filterValues.some((x) => poderProperty.includes(x));
    }
    function convertTag(tag) {
        const predefinedTag = PREDEFINED_TAGS.find(t => t.value === tag);
        return predefinedTag ? predefinedTag.name : tag;
    }

    return {
        loading,
        filterPoderes,
        filteredJson,
        jsonPoderes,
        resetFiltro,
        normalizeString,
        filtroPesquisa,
        filtroOpcoes,
        convertTag
    };
})