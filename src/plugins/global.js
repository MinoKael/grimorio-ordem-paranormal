function elementoCor(elemento) {
    const nome = Array.isArray(elemento) ? elemento[0] : elemento;
    const el = nome?.toLowerCase().trim();
    switch (el) {
        case "conhecimento":
            return "#b78521"
        case "energia":
            return "#8d0cf6"
        case "morte":
            return "#27292e"
        case "sangue":
            return "#a7181d"
        default:
            return "#ebebea"
    }
}

function getImageUrl(image) {
    return `${import.meta.env.BASE_URL}assets/${image}`;
}
function diceIconText(text) {
    return text.replace(/(\d+)d20/g, (_, count) => {
        const icons = '<span class="mdi mdi-dice-d20" style="font-size: 20px; position: relative; top: 2px;"></span>'.repeat(parseInt(count, 10));
        return `${icons}`;
    });
}
export { elementoCor, getImageUrl, diceIconText }