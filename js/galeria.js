
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. BASE DE DATOS DE IMÁGENES
    const imagenes = [
        { url: "img/mural1.jpg", categoria: "Infraestructura", titulo: "Mural segundo piso" },
        { url: "img/mural2.jpg", categoria: "Infraestructura", titulo: "Mural segundo piso" },
        { url: "img/eventoCirco1.jpg", categoria: "Eventos", titulo: "Circo" },
    ];

    const grid = document.getElementById('gallery-grid');
    const filterBtns = document.querySelectorAll('.gallery-filter-btn');
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const btnCerrar = document.getElementById('close-gallery'); // Referencia al botón X

    /**
     * RENDERIZAR FOTOS
     */
    const renderGallery = (filtro = "Todos") => {
        if (!grid) return;
        grid.innerHTML = '';

        const filtradas = filtro === "Todos" 
            ? imagenes 
            : imagenes.filter(img => img.categoria === filtro);

        filtradas.forEach(img => {
            const item = document.createElement('div');
            item.className = "group relative aspect-square overflow-hidden bg-gray-200 cursor-pointer animate-fade-in-down";
            
            item.onclick = () => {
                lightboxImg.src = img.url;
                lightbox.classList.remove('hidden');
                lightbox.classList.add('flex'); // Asegura el centrado si usas flex
                document.body.style.overflow = 'hidden';
            };

            item.innerHTML = `
                <img src="${img.url}" alt="${img.titulo}" loading="lazy" class="w-full h-full object-cover group-hover:scale-110 transition duration-700">
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div class="bg-white/90 p-3 border-2 border-black transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                         <span class="text-[9px] font-black uppercase italic">Ver Detalle</span>
                    </div>
                </div>
            `;
            grid.appendChild(item);
        });
    };

    /**
     * FILTROS DE CATEGORÍA
     */
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => {
                b.classList.remove('text-black', 'border-b-2', 'border-escuela-yellow');
                b.classList.add('text-gray-400');
            });
            btn.classList.add('text-black', 'border-b-2', 'border-escuela-yellow');
            btn.classList.remove('text-gray-400');

            renderGallery(btn.textContent.trim());
        });
    });

    /**
     * LÓGICA PARA CERRAR EL LIGHTBOX (AÑADIDO)
     */
    const cerrarGaleria = () => {
        if (lightbox) {
            lightbox.classList.add('hidden');
            lightbox.classList.remove('flex');
            document.body.style.overflow = 'auto'; // Devuelve el scroll a la página
        }
    };

    // Cerrar al hacer clic en la X
    if (btnCerrar) {
        btnCerrar.onclick = (e) => {
            e.stopPropagation();
            cerrarGaleria();
        };
    }

    // Cerrar al hacer clic en el fondo negro (fuera de la imagen)
    if (lightbox) {
        lightbox.onclick = (e) => {
            if (e.target === lightbox) {
                cerrarGaleria();
            }
        };
    }

    // Cerrar al presionar la tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") cerrarGaleria();
    });

    // Inicializar
    renderGallery();
});