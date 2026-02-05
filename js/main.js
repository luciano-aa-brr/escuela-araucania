// Esperar a que el DOM cargue
document.addEventListener('DOMContentLoaded', () => {
    
    const navbar = document.getElementById('navbar');
    const navText = document.getElementById('nav-text');
    const navLinks = document.getElementById('nav-links');
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    // --- FUNCIÓN DE SCROLL ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            // Estado al bajar: Fondo blanco, texto negro
            navbar.classList.replace('bg-transparent', 'bg-white');
            navbar.classList.replace('py-6', 'py-3');
            navbar.classList.add('shadow-xl');

            navText.classList.replace('text-white', 'text-black');
            navText.classList.remove('shadow-text');

            navLinks.classList.replace('text-white', 'text-black');
            navLinks.classList.remove('shadow-text');

            menuBtn.classList.replace('text-white', 'text-black');
        } else {
            // Estado inicial: Transparente, texto blanco
            navbar.classList.replace('bg-white', 'bg-transparent');
            navbar.classList.replace('py-3', 'py-6');
            navbar.classList.remove('shadow-xl');

            navText.classList.replace('text-black', 'text-white');
            navText.classList.add('shadow-text');

            navLinks.classList.replace('text-black', 'text-white');
            navLinks.classList.add('shadow-text');

            menuBtn.classList.replace('text-black', 'text-white');
        }
    });

    // --- LÓGICA MENÚ MÓVIL ---
    
    // Abrir/Cerrar menú al clickear el botón
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Cerrar menú al clickear cualquier enlace (para que no tape el contenido)
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    console.log("Sistema KoaLink iniciado para Escuela Araucanía.");
});