import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import rawJson from '../data/rituais.json';

const jsonRituais = rawJson.sort((a, b) => {
    const nomeA = a.nome
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toUpperCase();
    const nomeB = b.nome
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toUpperCase();
    if (nomeA < nomeB) {
        return -1;
    }
    if (nomeA > nomeB) {
        return 1;
    }
    return 0;
});

const base = {
    nome: '',
    elemento: [],
    circulo: [],
    elemento: [],
    execucao: [],
    alcance: [],
    alvo: [],
    area: [],
    duracao: [],
    resistencia: [],
    referencia: []
};

export const useFiltrosStore = defineStore('filtros', () => {
    const filtroPesquisa = reactive({ ...base });
    function resetFiltro() {
        Object.keys(base).forEach(key => {
            filtroPesquisa[key] = base[key];
        });
        filterRituais();
    }

    const filtroOpcoes = reactive({
        Círculo: [1, 2, 3, 4],
        Elemento: ['Sangue', 'Morte', 'Energia', 'Conhecimento', 'Medo'],
        Execução: [
            'Livre',
            'Reação',
            'Padrão',
            'Completa',
            'Outros'
        ],
        Alcance: [
            'Pessoal',
            'Toque',
            'Curto',
            'Médio',
            'Longo',
            'Ilimitado',
            'Outros'
        ],
        Alvo: ['Ser', 'Pessoa', 'Objeto', 'Você', 'Outros'],
        Área: [
            'Cubo',
            'Círculo',
            'Esfera',
            'Explosão',
            'Nuvem',
            'Outros'
        ],
        Duração: [
            'Rodada',
            'Instantânea',
            'Cena',
            'Sustentada',
            'Descarregada',
            'Outros'
        ],
        Resistência: ['Fortitude', 'Reflexos', 'Vontade', 'Outros'],
        Referência: [
            'Ordem Paranormal RPG',
            'OPRPG - Sobrevivendo ao Horror'
        ]
    });

    const filteredJson = ref(jsonRituais);

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
    function filterRituais() {
        filteredJson.value = jsonRituais.filter((ritual) => {
            return (
                stringSearch(ritual.nome, filtroPesquisa.nome) &&
                applyFilter(filtroPesquisa.circulo, ritual.circulo) &&
                applyFilter(filtroPesquisa.elemento, ritual.elemento, filtroOpcoes.Elemento) &&
                applyFilter(filtroPesquisa.alcance, ritual.alcance, filtroOpcoes.Alcance)  &&
                applyFilter(filtroPesquisa.execucao, ritual.execucao, filtroOpcoes.Execução) &&
                applyFilter(filtroPesquisa.alvo, ritual.alvo, filtroOpcoes.Alvo) &&
                applyFilter(filtroPesquisa.area, ritual.area, filtroOpcoes.Área) &&
                applyFilter(filtroPesquisa.duracao, ritual.duracao, filtroOpcoes.Duração) &&
                applyFilter(filtroPesquisa.resistencia, ritual.resistencia, filtroOpcoes.Resistência) &&
                applyFilter(filtroPesquisa.referencia, ritual.referencia, filtroOpcoes.Referência)
            );
        });
    }

    function applyFilter(
        filterValues,
        ritualProperty,
        filterOptions,
        isTipoEfeito
    ) {
        if (isTipoEfeito) {
            return (
                filterValues.length === 0 ||
                (filterValues.length === 1 &&
                    filterValues[0] === 'Efeitos' &&
                    ritualProperty !== null)
            );
        }
        return (
            filterValues.length === 0 ||
            filterValues.some(x =>
                normalizeString(ritualProperty).includes(normalizeString(x))
            ) ||
            (filterValues.includes('Outros') &&
                ritualProperty !== null &&
                !filterOptions.some(x =>
                    normalizeString(ritualProperty).includes(normalizeString(x))
                ))
        );
    }

    return {
        filterRituais,
        filteredJson,
        jsonRituais,
        resetFiltro,
        normalizeString,
        filtroPesquisa,
        filtroOpcoes
    };
});
