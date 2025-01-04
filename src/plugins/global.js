function elementoCor(elemento) {
    switch (elemento) {
        case "Conhecimento":
            return "#b78521"
        case "Energia":
            return "#8d0cf6"
        case "Morte":
            return "#27292e"
        case "Sangue":
            return "#a7181d"
        default:
            return "#ebebea"
    }
}
const isProduction = process.env.NODE_ENV === 'production';
function getImageUrl(image) {
    const path = isProduction ? `/assets/${image}` : `/grimorio-ordem-paranormal/assets/${image}`;
    return path;
}
export { elementoCor, getImageUrl }