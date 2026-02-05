// js/main.js
document.addEventListener('DOMContentLoaded', () => {
    // 1. Selección de elementos (una sola vez)
    const navbar = document.getElementById('navbar');
    const navText = document.getElementById('nav-text');
    const navLinks = document.getElementById('nav-links');
    const menuBtn = document.getElementById('menu-btn'); // Botón hamburguesa
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    // 2. Lógica de Scroll Unificada
    window.addEventListener('scroll', () => {
        const isScrolled = window.scrollY > 80;

        // Toggle de clases para el Navbar (Fondo y Padding)
        navbar.classList.toggle('bg-white', isScrolled);
        navbar.classList.toggle('shadow-xl', isScrolled);
        navbar.classList.toggle('py-3', isScrolled);
        navbar.classList.toggle('bg-transparent', !isScrolled);
        navbar.classList.toggle('py-6', !isScrolled);

        // Ajuste de colores de texto y sombras
        if (isScrolled) {
            navText.classList.replace('text-white', 'text-black');
            navText.classList.remove('shadow-text');
            navLinks.classList.replace('text-white', 'text-black');
            navLinks.classList.remove('shadow-text');
            menuBtn.classList.replace('text-white', 'text-black');
        } else {
            navText.classList.replace('text-black', 'text-white');
            navText.classList.add('shadow-text');
            navLinks.classList.replace('text-black', 'text-white');
            navLinks.classList.add('shadow-text');
            menuBtn.classList.replace('text-black', 'text-white');
        }
    });

    // 3. Lógica del Menú Móvil
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Cerrar menú al hacer click en un enlace
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    console.log("KoaLink: Código optimizado y cargado.");
});