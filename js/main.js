// js/main.js - Desarrollado por KoaLink
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selección de elementos del DOM
    const navbar = document.getElementById('navbar');
    const navText = document.getElementById('nav-text');
    const navLinksContainer = document.getElementById('nav-links');
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const allLinks = document.querySelectorAll('nav a[href^="#"], .mobile-link');

    // 2. Lógica de Scroll Unificada (Cambio de color y transparencia)
    window.addEventListener('scroll', () => {
        const isScrolled = window.scrollY > 80;

        // Toggle de clases para el contenedor del Navbar
        navbar.classList.toggle('bg-white', isScrolled);
        navbar.classList.toggle('shadow-xl', isScrolled);
        navbar.classList.toggle('py-3', isScrolled);
        navbar.classList.toggle('bg-transparent', !isScrolled);
        navbar.classList.toggle('py-6', !isScrolled);

        // Ajuste de colores de texto y sombras
        if (isScrolled) {
            navText.classList.replace('text-white', 'text-black');
            navText.classList.remove('shadow-text');
            navLinksContainer.classList.replace('text-white', 'text-black');
            navLinksContainer.classList.remove('shadow-text');
            menuBtn.classList.replace('text-white', 'text-black');
        } else {
            navText.classList.replace('text-black', 'text-white');
            navText.classList.add('shadow-text');
            navLinksContainer.classList.replace('text-black', 'text-white');
            navLinksContainer.classList.add('shadow-text');
            menuBtn.classList.replace('text-black', 'text-white');
        }
    });

    // 3. Navegación Limpia (Evita el # en la URL)
    allLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault(); // Evita que la URL cambie en la barra de direcciones

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Cálculo de posición compensando la altura del navbar fijo
                const offsetTop = targetSection.offsetTop - 80;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Cerrar el menú móvil automáticamente tras clickear (si está abierto)
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // 4. Lógica del Menú Móvil (Abrir/Cerrar)
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    console.log("KoaLink: Sistema de navegación y scroll optimizado correctamente.");
});