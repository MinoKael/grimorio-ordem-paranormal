export const PREFIXO_ASSINATURA = 'Arquivos Secretos - ';

export const MESES = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

/** Tema de cada edição da assinatura Arquivos Secretos. */
export const TEMAS = {
    'Janeiro': 'Agatha',
    'Fevereiro': 'Hexatombe 1',
    'Março': 'Hexatombe 2',
    'Abril': 'Anfitrião',
    'Maio': 'Transmissão',
    'Junho': 'Panacea',
    'Julho': 'Vampiros',
    'Setembro': 'Hell Hunters',
};

/**
 * Monta as opções do filtro de referência: os livros, seguidos de uma opção por
 * edição da assinatura presente nos dados. O rótulo leva o tema
 * ("Arquivos Secretos - Junho (Panacea)") e o valor fica sendo a referência do
 * mês, que é a que está gravada no json.
 *
 * @param {{ referencia?: string[] }[]} itens rituais ou poderes
 * @param {string[]} livros referências avulsas, na ordem em que devem aparecer
 * @returns {{ name: string, value: string }[]}
 */
export function montarOpcoesReferencia(itens, livros) {
    const meses = new Set();

    itens.forEach((item) => {
        if (!Array.isArray(item.referencia)) return;

        item.referencia.forEach((referencia) => {
            if (!referencia.startsWith(PREFIXO_ASSINATURA)) return;

            const mes = referencia.slice(PREFIXO_ASSINATURA.length);
            if (MESES.includes(mes)) meses.add(mes);
        });
    });

    const edicoes = [...meses]
        .sort((a, b) => MESES.indexOf(a) - MESES.indexOf(b))
        .map((mes) => ({
            name: TEMAS[mes]
                ? `${PREFIXO_ASSINATURA}${mes} (${TEMAS[mes]})`
                : `${PREFIXO_ASSINATURA}${mes}`,
            value: `${PREFIXO_ASSINATURA}${mes}`,
        }));

    return [
        ...livros.map((livro) => ({ name: livro, value: livro })),
        ...edicoes,
    ];
}
