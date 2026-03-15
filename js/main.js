

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    // 1. Control de Scroll (Flat Navbar)
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled'); // El CSS maneja el cambio a blanco/negro
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Menú Hamburguesa
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // 3. URLs Limpias y Scroll Suave
    document.querySelectorAll('a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Si el enlace es un ancla interna
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
                // Cerrar menú móvil si se usa ancla
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // 4. Inyección de Noticias en Home (Ejemplo dinámico)
    const renderNoticias = () => {
        const container = document.getElementById('noticias-container');
        if (!container) return;

        const data = [
            { 
                titulo: "Excelencia SNED 2026", 
                tag: "Institucional", 
                img: "img/1000078178.png",
                resumen: "Nuestra escuela obtiene el 100% de reconocimiento ministerial."
            },
            { 
                titulo: "Nuevo Diario Estudiantil", 
                tag: "Voz Estudiantil", 
                img: "img/escuelaFront.jpg",
                resumen: "Lanzamos nuestra plataforma digital dirigida por alumnos."
            }
        ];

        container.innerHTML = data.map(n => `
            <div class="bg-white rounded-3xl overflow-hidden group cursor-pointer border border-gray-100">
                <div class="aspect-video overflow-hidden">
                    <img src="${n.img}" class="w-full h-full object-cover group-hover:scale-110 transition duration-700">
                </div>
                <div class="p-8">
                    <span class="text-[10px] font-black uppercase text-amber-500 tracking-widest">${n.tag}</span>
                    <h3 class="text-xl font-black uppercase mt-2 italic">${n.titulo}</h3>
                    <p class="text-sm text-gray-500 mt-4 leading-relaxed">${n.resumen}</p>
                </div>
            </div>
        `).join('');
    };

    renderNoticias();

    const lightbox = document.getElementById('himno-lightbox');
const btnAbrir = document.getElementById('btn-ver-himno');
const btnCerrar = document.getElementById('cerrar-himno');

if (btnAbrir && lightbox) {
    btnAbrir.onclick = () => {
        lightbox.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    };

    const cerrar = () => {
        lightbox.classList.add('hidden');
        document.body.style.overflow = 'auto';
    };

    btnCerrar.onclick = cerrar;
    lightbox.onclick = (e) => { if (e.target === lightbox) cerrar(); };
}


});