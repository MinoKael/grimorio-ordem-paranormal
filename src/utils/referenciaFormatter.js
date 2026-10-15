/**
 * @param {string[]} referencia
 */
export function referenciaFormatter(referencia) {
    if (!referencia || Array.isArray(referencia) === false) {
        return ""
    }

    return referencia.map((item) => item.replace("Arquivos Secretos - ", "")).join(", ")
}