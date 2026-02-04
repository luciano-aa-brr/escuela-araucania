// js/main.js

window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    const navText = document.getElementById('nav-text');
    const navLinks = document.getElementById('nav-links');
    const mobileIcon = document.getElementById('mobile-icon');

    // Detectar el scroll (80px es un buen umbral para el cambio)
    if (window.scrollY > 80) {
        // Estado al bajar: Fondo blanco, texto negro y sombra
        navbar.classList.remove('bg-transparent', 'py-6');
        navbar.classList.add('bg-white', 'shadow-xl', 'py-3');
        
        navText.classList.remove('text-white', 'shadow-text');
        navText.classList.add('text-black');
        
        navLinks.classList.remove('text-white', 'shadow-text');
        navLinks.classList.add('text-black');
        
        if (mobileIcon) {
            mobileIcon.classList.remove('text-white');
            mobileIcon.classList.add('text-black');
        }
    } else {
        // Estado inicial: Transparente, texto blanco con sombra para lectura
        navbar.classList.remove('bg-white', 'shadow-xl', 'py-3');
        navbar.classList.add('bg-transparent', 'py-6');
        
        navText.classList.remove('text-black');
        navText.classList.add('text-white', 'shadow-text');
        
        navLinks.classList.remove('text-black');
        navLinks.classList.add('text-white', 'shadow-text');

        if (mobileIcon) {
            mobileIcon.classList.remove('text-black');
            mobileIcon.classList.add('text-white');
        }
    }
});

// Lógica para el Menú Móvil
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

// Función para abrir/cerrar
menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Cerrar menú al hacer clic en un enlace (para que no tape el contenido)
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Modifica tu código de scroll existente para que el botón de menú también cambie de color
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    const navText = document.getElementById('nav-text');
    const navLinks = document.getElementById('nav-links');
    const menuBtn = document.getElementById('menu-btn'); // Añadido

    if (window.scrollY > 80) {
        navbar.classList.replace('bg-transparent', 'bg-white');
        navbar.classList.replace('py-6', 'py-3');
        navbar.classList.add('shadow-xl');
        
        navText.classList.replace('text-white', 'text-black');
        navText.classList.remove('shadow-text');
        
        navLinks.classList.replace('text-white', 'text-black');
        navLinks.classList.remove('shadow-text');
        
        menuBtn.classList.replace('text-white', 'text-black'); // Cambio a negro
    } else {
        navbar.classList.replace('bg-white', 'bg-transparent');
        navbar.classList.replace('py-3', 'py-6');
        navbar.classList.remove('shadow-xl');
        
        navText.classList.replace('text-black', 'text-white');
        navText.classList.add('shadow-text');
        
        navLinks.classList.replace('text-black', 'text-white');
        navLinks.classList.add('shadow-text');

        menuBtn.classList.replace('text-black', 'text-white'); // Vuelve a blanco
    }
});