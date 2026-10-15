import { defineStore } from 'pinia';
import { computed, reactive, ref } from 'vue';
import rawJson from '../data/poderes.json';

const base = {
    nome: '',
    texto: '',
    tags: [],
    tagsOperador: 'or',
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
    { name: "Transmissão", value: "transmissao" },
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
    { name: "Granadeiro Blaster", value: "granadeiro_blaster" },
    { name: "Criptologista do Oculto", value: "criptologista_oculto" },
    { name: "Incursor", value: "incursor" },
    { name: "Piloto de Drone", value: "piloto_drone" },
];

const LIVROS = ['Livro Básico', 'Sobrevivendo ao Horror', 'Arquivos Secretos'];
const PREFIXO_ASSINATURA = 'Arquivos Secretos - ';
const MESES = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

/**
 * Monta as opções de referência: os livros e, para cada edição da assinatura
 * Arquivos Secretos presente no json, uma opção "Mês (Tema)" cujo valor é a
 * referência do mês (todo poder da edição carrega mês e tema).
 */
function montarOpcoesReferencia(poderes) {
    const temaPorMes = new Map();

    poderes.forEach((poder) => {
        if (!Array.isArray(poder.referencia)) return;

        const edicao = poder.referencia
            .filter((ref) => ref.startsWith(PREFIXO_ASSINATURA))
            .map((ref) => ref.slice(PREFIXO_ASSINATURA.length));

        const mes = edicao.find((item) => MESES.includes(item));
        if (!mes || temaPorMes.has(mes)) return;

        temaPorMes.set(mes, edicao.find((item) => item !== mes));
    });

    const edicoes = [...temaPorMes.entries()]
        .sort(([a], [b]) => MESES.indexOf(a) - MESES.indexOf(b))
        .map(([mes, tema]) => ({
            name: tema ? `${mes} (${tema})` : mes,
            value: PREFIXO_ASSINATURA + mes,
        }));

    return [
        ...LIVROS.map((livro) => ({ name: livro, value: livro })),
        ...edicoes,
    ];
}

const filtroPesquisa = reactive({ ...base });
const jsonPoderes = ref([]);
const filteredJson = ref([]);
const loading = ref(true);

jsonPoderes.value = rawJson
filteredJson.value = rawJson;
export const useFiltroPoderesStore = defineStore('filtroPoderes', () => {
    function resetFiltro() {
        Object.keys(base).forEach((key) => {
            filtroPesquisa[key] = Array.isArray(base[key]) ? [...base[key]] : base[key];
        });
        filterPoderes();
    }

    const filtroOpcoes = reactive({
        Tags: PREDEFINED_TAGS,
        Referência: montarOpcoesReferencia(rawJson)
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
                applyFilterArray(filtroPesquisa.tags, poder.tags, filtroPesquisa.tagsOperador) &&
                applyFilterArray(filtroPesquisa.referencia, poder.referencia)
            );
        });
    };
    function applyFilterArray(filterValues, poderProperty, operador = 'or') {
        if (filterValues.length === 0) return true;

        if (!Array.isArray(poderProperty)) return false;

        return operador === 'and'
            ? filterValues.every((x) => poderProperty.includes(x))
            : filterValues.some((x) => poderProperty.includes(x));
    }
    function convertTag(tag) {
        const predefinedTag = PREDEFINED_TAGS.find(t => t.value === tag);
        return predefinedTag ? predefinedTag.name : tag;
    }

    const tagsCombinacaoOpcoes = computed(() => {
        const nomes = filtroPesquisa.tags.map(convertTag);

        const montarLabel = (conector) =>
            nomes.length > 3
                ? `${nomes.slice(0, 2).join(` ${conector} `)} ${conector}...`
                : nomes.join(` ${conector} `);

        return [
            { title: montarLabel('E'), value: 'and' },
            { title: montarLabel('OU'), value: 'or' },
        ];
    });

    return {
        loading,
        filterPoderes,
        filteredJson,
        jsonPoderes,
        resetFiltro,
        normalizeString,
        filtroPesquisa,
        filtroOpcoes,
        convertTag,
        tagsCombinacaoOpcoes
    };
})