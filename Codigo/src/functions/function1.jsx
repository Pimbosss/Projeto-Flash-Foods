export default function centralizar(event) {
    event.preventDefault();

    const id = event.currentTarget.getAttribute("href");
    const elemento = document.querySelector(id);

    if (!elemento) return;

    const elementoTop = elemento.getBoundingClientRect().top;
    const scrollTop = window.scrollY;

    const destino =
        scrollTop +
        elementoTop -
        (window.innerHeight / 2) +
        (elemento.offsetHeight / 2);

    window.scrollTo({
        top: destino,
        behavior: "smooth"
    });
}