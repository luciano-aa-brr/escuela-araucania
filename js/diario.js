/**
 * js/diario.js - Motor de contenido Voz Estudiantil
 * Desarrollado por KoaLink para Escuela Araucanía 510
 * Este archivo depende de js/data.js
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. REFERENCIAS AL DOM
    const container = document.getElementById('diario-grid');
    const heroContent = document.getElementById('hero-content');
    const modal = document.getElementById('noticia-modal');
    const modalBody = document.getElementById('modal-content');
    const btnCerrarModal = document.getElementById('cerrar-modal');
    const btnCargarMas = document.getElementById('btn-cargar-mas');
    const botonesFiltro = document.querySelectorAll('.filter-btn');

    // 2. ESTADOS
    let mostrandoAnteriores = false;
    let filtroActual = "Todos";

    /**
     * ACTUALIZAR PORTADA (HERO)
     * Ajusta el texto según la categoría seleccionada
     */
    const actualizarPortada = (categoria) => {
        if (!heroContent) return;
        if (categoria === "Todos") {
            heroContent.innerHTML = `
                <h1 class="text-4xl md:text-8xl font-black text-white uppercase italic no-shadow">Voz <span class="text-escuela-yellow">Estudiantil</span></h1>
                <p class="text-white font-bold uppercase tracking-[0.3em] mt-4 text-xs md:text-sm">El pulso de la comunidad escolar</p>
            `;
        } else {
            heroContent.innerHTML = `
                <h1 class="text-4xl md:text-7xl font-black text-white uppercase italic no-shadow">Sección <span class="text-escuela-yellow">${categoria}</span></h1>
                <p class="text-white font-bold uppercase tracking-[0.3em] mt-4 text-xs md:text-sm">Explora las últimas crónicas estudiantiles</p>
            `;
        }
    };

    /**
     * RENDERIZAR ARTÍCULOS EN EL GRID
     * Filtra y muestra las noticias del array global 'articulosDiario' (definido en data.js)
     */
    const renderArticulos = () => {
        if (!container || typeof articulosDiario === 'undefined') {
            console.error("KoaLink: No se encontró el contenedor o el archivo data.js no está vinculado.");
            return;
        }

        container.innerHTML = '';

        // Si tuvieras una sección de "Ediciones Anteriores" en data.js, aquí harías el merge
        // Por ahora usamos la lista principal
        const listaBase = articulosDiario;
        
        const filtrados = filtroActual === "Todos" 
            ? listaBase 
            : listaBase.filter(art => art.categoria === filtroActual);

        actualizarPortada(filtroActual);

        if (filtrados.length === 0) {
            container.innerHTML = `
                <div class="col-span-full text-center py-20 animate-fade-in">
                    <p class="text-gray-400 font-black uppercase italic tracking-widest text-lg">No hay noticias en esta sección por ahora.</p>
                    <p class="text-xs text-gray-300 uppercase mt-2 font-bold tracking-[0.2em]">KoaLink — Desarrollo</p>
                </div>
            `;
            return;
        }

        filtrados.forEach(art => {
            const article = document.createElement('article');
            article.className = "group cursor-pointer animate-fade-in-down";
            article.onclick = () => abrirNoticia(art); 

            article.innerHTML = `
                <div class="aspect-video overflow-hidden bg-gray-200 rounded-2xl mb-4 md:mb-6 border-2 border-transparent group-hover:border-escuela-yellow transition-all duration-500">
                    <img src="${art.imagen}" class="w-full h-full object-cover group-hover:scale-110 transition duration-700">
                </div>
                <div class="space-y-2 md:space-y-3">
                    <span class="bg-escuela-yellow text-black text-[9px] font-black uppercase px-2 py-1 rounded-sm">${art.categoria}</span>
                    <h2 class="text-xl md:text-2xl font-black uppercase italic leading-tight group-hover:text-amber-500 transition">${art.titulo}</h2>
                    <p class="text-gray-500 text-sm leading-relaxed line-clamp-3 font-medium">${art.resumen}</p>
                </div>
            `;
            container.appendChild(article);
        });
    };

    /**
     * LÓGICA DEL MODAL (NOTICIA COMPLETA)
     */
    const abrirNoticia = (noticia) => {
        if (!modal || !modalBody) return;

        modalBody.innerHTML = `
            <span class="bg-escuela-yellow text-black text-xs font-black uppercase px-3 py-1 rounded-full">${noticia.categoria}</span>
            <h2 class="text-3xl md:text-5xl font-black uppercase italic my-6 leading-tight">${noticia.titulo}</h2>
            
            <div class="flex items-center space-x-4 mb-8 border-b pb-6">
                <div class="bg-gray-100 p-3 rounded-full"><span>✍️</span></div>
                <div>
                    <p class="font-black uppercase text-sm">${noticia.autor}</p>
                    <p class="text-gray-400 text-xs font-bold">${noticia.fecha}</p>
                </div>
            </div>

            <img src="${noticia.imagen}" class="w-full h-64 md:h-96 object-cover rounded-3xl mb-8 shadow-2xl">
            
            <div class="prose prose-lg max-w-none text-gray-700 leading-relaxed font-medium">
                ${noticia.textoCompleto}
            </div>
            
            <div class="mt-12 pt-8 border-t border-gray-100 text-center">
                <p class="text-[10px] font-black uppercase text-gray-400 tracking-[0.5em]">Voz Estudiantil — Escuela Araucanía 510</p>
            </div>
        `;
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Bloquea scroll de fondo
    };

    const cerrarModal = () => {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto'; // Reactiva scroll
    };

    if (btnCerrarModal) btnCerrarModal.onclick = cerrarModal;
    
    // Cerrar al hacer clic en el fondo oscuro
    window.onclick = (e) => { if (e.target == modal) cerrarModal(); };

    /**
     * FILTROS DE CATEGORÍA
     */
    botonesFiltro.forEach(btn => {
        btn.addEventListener('click', () => {
            botonesFiltro.forEach(b => {
                b.classList.remove('text-black', 'border-b-2', 'border-escuela-yellow');
                b.classList.add('text-gray-400');
            });
            btn.classList.add('text-black', 'border-b-2', 'border-escuela-yellow');
            btn.classList.remove('text-gray-400');

            filtroActual = btn.textContent.trim();
            renderArticulos();
        });
    });

    /**
     * BOTÓN EDICIONES ANTERIORES (OPCIONAL)
     */
    if (btnCargarMas) {
        btnCargarMas.addEventListener('click', () => {
            mostrandoAnteriores = !mostrandoAnteriores;
            btnCargarMas.textContent = mostrandoAnteriores ? "Ocultar anteriores" : "Ver ediciones anteriores";
            renderArticulos();
        });
    }

    // Carga inicial
    renderArticulos();
});