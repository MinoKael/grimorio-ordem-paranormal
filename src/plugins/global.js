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

function getImageUrl(image) {
    return `${import.meta.env.BASE_URL}assets/${image}`;
}
export { elementoCor, getImageUrl }