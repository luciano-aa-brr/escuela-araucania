/**
 * js/diario.js - Motor de contenido Voz Estudiantil
 * Desarrollado por KoaLink para Escuela Araucanía 510
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. BASE DE DATOS DE ARTÍCULOS ACTUALES
    const articulosActuales = [
        {
            titulo: "Entrevista exclusiva: Nuestra Visión de la Excelencia",
            autor: "Martina González, 8vo Básico",
            fecha: "12 Marzo, 2026",
            categoria: "Entrevistas",
            imagen: "img/escuelaFront.jpg",
            resumen: "Conversamos con la dirección sobre el hito del 100% SNED.",
            textoCompleto: `
                <p>La obtención del 100% de la Excelencia Académica (SNED) no es solo un número, es el reflejo de un trabajo incansable. El director destacó que este logro pertenece a cada familia de Labranza que confía en nosotros.</p>
                <blockquote class="border-l-4 border-escuela-yellow pl-4 italic my-6 font-bold text-xl">"Nuestro compromiso es que cada niño y niña se sienta capaz de alcanzar sus sueños."</blockquote>
                <p>Durante la entrevista, se discutieron los nuevos planes de infraestructura y el fortalecimiento de los talleres extracurriculares para el segundo semestre de 2026.</p>
            `
        },
        {
            titulo: "Deportes: El equipo de fútbol retoma entrenamientos",
            autor: "Sebastián Soto, 7mo Básico",
            fecha: "10 Marzo, 2026",
            categoria: "Deportes",
            imagen: "img/escuelaFront.jpg",
            resumen: "Nuestra selección se prepara para el campeonato regional.",
            textoCompleto: `
                <p>Tras un merecido descanso, los "Halcones" de la Escuela Araucanía volvieron a las canchas. Con un entrenamiento enfocado en la resistencia física y la táctica de equipo, el entrenador se mostró optimista.</p>
                <p>El próximo encuentro será contra el liceo vecino, donde se definirá el paso a las semifinales regionales. ¡Todo el apoyo para nuestros deportistas!</p>
            `
        },
        {
            titulo: "Opinión: ¿Por qué cuidar nuestro entorno escolar?",
            autor: "Consejo de Estudiantes",
            fecha: "08 Marzo, 2026",
            categoria: "Opinión",
            imagen: "img/escuelaFront.jpg",
            resumen: "Reflexiones sobre la importancia de la limpieza y el respeto.",
            textoCompleto: `
                <p>Mantener nuestra escuela limpia no es solo tarea de los auxiliares, es una responsabilidad compartida. Como estudiantes, pasamos gran parte del día aquí y este es nuestro segundo hogar.</p>
                <p>Hacemos un llamado a utilizar los puntos de reciclaje y a cuidar el mobiliario que con tanto esfuerzo se ha renovado para nosotros.</p>
            `
        }
    ];

    // 2. BASE DE DATOS DE EDICIONES ANTERIORES
    const articulosAnteriores = [
        {
            titulo: "Archivo 2025: Gala de Fin de Año",
            autor: "Redacción 2025",
            fecha: "Diciembre, 2025",
            categoria: "Cultura",
            imagen: "img/escuelaFront.jpg",
            resumen: "Un resumen de las mejores presentaciones artísticas del año pasado.",
            textoCompleto: `<p>Recordamos la emotiva ceremonia donde los octavos básicos se despidieron de su etapa escolar...</p>`
        }
    ];

    // 3. REFERENCIAS AL DOM
    const container = document.getElementById('diario-grid');
    const heroContent = document.getElementById('hero-content');
    const modal = document.getElementById('noticia-modal');
    const modalBody = document.getElementById('modal-content');
    const btnCerrarModal = document.getElementById('cerrar-modal');
    const btnCargarMas = document.getElementById('btn-cargar-mas');
    const botonesFiltro = document.querySelectorAll('.filter-btn');

    let mostrandoAnteriores = false;
    let filtroActual = "Todos";

    /**
     * ACTUALIZAR PORTADA (HERO)
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
     */
    const renderArticulos = () => {
        if (!container) return;
        container.innerHTML = '';

        // Decidimos qué lista usar
        const listaBase = mostrandoAnteriores ? [...articulosActuales, ...articulosAnteriores] : articulosActuales;
        
        // Filtramos según el botón seleccionado
        const filtrados = filtroActual === "Todos" 
            ? listaBase 
            : listaBase.filter(art => art.categoria === filtroActual);

        actualizarPortada(filtroActual);

        if (filtrados.length === 0) {
            container.innerHTML = `<p class="col-span-full text-center py-20 text-gray-400 font-black uppercase italic tracking-widest">No hay artículos en esta categoría.</p>`;
            return;
        }

        filtrados.forEach(art => {
            const article = document.createElement('article');
            article.className = "group cursor-pointer animate-fade-in-down";
            article.onclick = () => abrirNoticia(art); // Abrir Modal al clic

            article.innerHTML = `
                <div class="aspect-video overflow-hidden bg-gray-200 rounded-2xl mb-4 md:mb-6">
                    <img src="${art.imagen}" class="w-full h-full object-cover group-hover:scale-110 transition duration-700">
                </div>
                <div class="space-y-2 md:space-y-3">
                    <span class="bg-escuela-yellow text-black text-[9px] font-black uppercase px-2 py-1 rounded-sm">${art.categoria}</span>
                    <h2 class="text-xl md:text-2xl font-black uppercase italic leading-tight group-hover:text-amber-500 transition">${art.titulo}</h2>
                    <p class="text-gray-500 text-sm leading-relaxed line-clamp-3">${art.resumen}</p>
                </div>
            `;
            container.appendChild(article);
        });
    };

    /**
     * LÓGICA DEL MODAL (NOTICIA EXTENSA)
     */
    const abrirNoticia = (noticia) => {
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

            <img src="${noticia.imagen}" class="w-full h-64 md:h-96 object-cover rounded-3xl mb-8">
            
            <div class="prose prose-lg max-w-none text-gray-700 leading-relaxed font-medium">
                ${noticia.textoCompleto}
            </div>
        `;
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Evita scroll de fondo
    };

    const cerrarModal = () => {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    };

    if (btnCerrarModal) btnCerrarModal.onclick = cerrarModal;
    
    // Cerrar al hacer clic fuera del modal
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
     * BOTÓN EDICIONES ANTERIORES (TOGGLE)
     */
    if (btnCargarMas) {
        btnCargarMas.addEventListener('click', () => {
            mostrandoAnteriores = !mostrandoAnteriores;
            
            if (mostrandoAnteriores) {
                btnCargarMas.textContent = "Ocultar ediciones anteriores";
                btnCargarMas.classList.add('bg-black', 'text-white');
            } else {
                btnCargarMas.textContent = "Ver ediciones anteriores";
                btnCargarMas.classList.remove('bg-black', 'text-white');
                window.scrollTo({ top: container.offsetTop - 150, behavior: 'smooth' });
            }
            renderArticulos();
        });
    }

    // Inicializar
    renderArticulos();
});