function cambiarColorFondo(color) {
    document.body.style.backgroundColor = color;
}

function agregarTextoFooter(texto) {
    const footer = document.querySelector('.footer p:last-child');
    if (footer) {
        footer.textContent = texto;
    }
}