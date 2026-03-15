/**
 * js/main.js - Motor Principal Escuela Araucanía 510
 * Desarrollado por KoaLink
 * Centraliza: Navbar, Menú Móvil, Modales y Utilidades.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. REFERENCIAS DE ELEMENTOS ---
    const navbar = document.getElementById('navbar');
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Referencias para el Modal del Himno (Si existen en la página)
    const btnAbrirHimno = document.getElementById('abrir-himno') || document.getElementById('btn-himno-trigger');
    const modalHimno = document.getElementById('modal-himno') || document.getElementById('himno-modal');
    const btnCerrarHimno = document.getElementById('cerrar-himno') || document.getElementById('close-himno');

    // --- 2. CONTROL DE SCROLL (NAVBAR) ---
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Ejecutar al inicio por si la página carga con scroll

    // --- 3. MENÚ MÓVIL (HAMBURGUESA) ---
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenu.classList.toggle('hidden');
        });

        // Cerrar menú al hacer clic en un enlace (para anclas internas)
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.onclick = () => mobileMenu.classList.add('hidden');
        });

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }

    // --- 4. LÓGICA DE MODALES (HIMNO / GENERAL) ---
    const cerrarModal = (modalElement) => {
        modalElement.classList.add('hidden');
        modalElement.classList.remove('flex');
        document.body.style.overflow = 'auto';
    };

    const abrirModal = (modalElement) => {
        modalElement.classList.remove('hidden');
        modalElement.classList.add('flex');
        document.body.style.overflow = 'hidden';
    };

    // Inicializar Himno solo si los elementos están presentes
    if (btnAbrirHimno && modalHimno) {
        btnAbrirHimno.onclick = (e) => {
            e.preventDefault();
            abrirModal(modalHimno);
        };

        if (btnCerrarHimno) {
            btnCerrarHimno.onclick = () => cerrarModal(modalHimno);
        }

        // Cerrar al hacer clic en el fondo oscuro
        modalHimno.onclick = (e) => {
            if (e.target === modalHimno) cerrarModal(modalHimno);
        };
    }

    // Cerrar cualquier modal abierto con la tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") {
            const modals = document.querySelectorAll('.fixed:not(.hidden)');
            modals.forEach(m => {
                // No cerramos el navbar, solo modales de imagen/anuncios
                if (m.id !== 'navbar') {
                    m.classList.add('hidden');
                    m.classList.remove('flex');
                    document.body.style.overflow = 'auto';
                }
            });
        }
    });

    // --- 5. INICIALIZACIÓN DE ICONOS LUCIDE ---
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // --- 6. LOG DE BIENVENIDA (ESTILO KOALINK) ---
    console.log("%c Escuela Araucanía 510 %c v1.0 - KoaLink Deployment ", 
        "background: #facc15; color: #000; font-weight: bold; padding: 4px; border-radius: 4px 0 0 4px;",
        "background: #000; color: #fff; font-weight: bold; padding: 4px; border-radius: 0 4px 4px 0;"
    );
});