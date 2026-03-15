document.addEventListener('DOMContentLoaded', () => {
    
    // 1. BASE DE DATOS DE ANUNCIOS (Vacío para activar el "Próximamente")
    const anuncios = [
        /* {
            titulo: "Reunión de Apoderados - Marzo",
            fecha: "18 de Marzo, 2026",
            categoria: "Reuniones",
            prioridad: "alta",
            resumen: "Coordinación del plan académico 2026.",
            contenido: `
                <p class="mb-4 text-lg">Estimados padres y apoderados, se les cita a la primera reunión oficial del año escolar.</p>
                <p class="mb-2 font-bold uppercase text-xs text-escuela-yellow tracking-widest">Temas a tratar:</p>
                <ul class="list-disc ml-6 mb-6 space-y-2 font-medium">
                    <li>Presentación del cuerpo docente.</li>
                    <li>Protocolos de convivencia escolar 2026.</li>
                    <li>Elección de directivas de curso.</li>
                </ul>
                <div class="bg-gray-50 border-2 border-dashed border-gray-200 p-6 rounded-2xl italic text-sm text-gray-600">
                    📍 Lugar: Gimnasio de la escuela a las 18:00 hrs. Su asistencia es fundamental para el inicio del proceso educativo.
                </div>
            `
        } */
    ];

    const container = document.getElementById('anuncios-grid');
    const proximamente = document.getElementById('proximamente-anuncios');
    const modal = document.getElementById('anuncio-modal');
    const modalBody = document.getElementById('modal-anuncio-body');
    const btnCerrar = document.getElementById('cerrar-modal-anuncio');

    const renderAnuncios = () => {
        if (!container) return;

        // LÓGICA DE VISIBILIDAD KOALINK
        if (anuncios.length === 0) {
            if (proximamente) proximamente.classList.remove('hidden');
            container.classList.add('hidden');
            return; 
        } else {
            if (proximamente) proximamente.classList.add('hidden');
            container.classList.remove('hidden');
            container.classList.add('flex');
        }

        container.innerHTML = '';

        anuncios.forEach(anun => {
            const accentColor = anun.prioridad === 'alta' ? 'bg-escuela-yellow' : 'bg-black';
            const row = document.createElement('div');
            row.className = "bg-white border-2 border-gray-100 flex items-stretch hover:border-black transition-all group cursor-pointer rounded-xl overflow-hidden shadow-sm";
            row.onclick = () => abrirAnuncio(anun);

            row.innerHTML = `
                <div class="w-2 md:w-3 ${accentColor} flex-shrink-0"></div>
                <div class="p-6 flex flex-col md:flex-row md:items-center justify-between w-full gap-4">
                    <div class="space-y-1">
                        <div class="flex items-center space-x-2 mb-1">
                            <span class="text-[9px] font-black uppercase tracking-widest text-gray-400">${anun.categoria}</span>
                            ${anun.prioridad === 'alta' ? '<span class="text-[9px] bg-escuela-yellow px-2 py-0.5 font-black uppercase">Importante</span>' : ''}
                        </div>
                        <h2 class="text-xl font-black uppercase italic leading-tight group-hover:text-amber-500 transition-colors">${anun.titulo}</h2>
                        <p class="text-gray-500 text-sm font-medium line-clamp-1">${anun.resumen}</p>
                    </div>
                    <div class="flex items-center justify-between md:flex-col md:items-end border-t md:border-t-0 pt-3 md:pt-0">
                        <span class="text-[10px] font-black uppercase text-gray-400 tracking-tighter">${anun.fecha}</span>
                        <span class="text-xl md:hidden text-escuela-yellow">→</span>
                    </div>
                </div>
            `;
            container.appendChild(row);
        });
    };

    const abrirAnuncio = (anun) => {
        modalBody.innerHTML = `
            <div class="mb-8">
                <span class="bg-black text-white text-[10px] font-black uppercase px-4 py-1.5 rounded-full">${anun.categoria}</span>
                <p class="text-gray-400 text-[10px] font-black mt-6 uppercase tracking-[0.3em]">${anun.fecha}</p>
                <h2 class="text-3xl md:text-5xl font-black uppercase italic mt-2 leading-none">${anun.titulo}</h2>
            </div>
            <div class="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                ${anun.contenido}
            </div>
            <div class="mt-12 pt-8 border-t border-gray-100 text-[10px] font-black uppercase text-gray-400 tracking-widest">
                Escuela Araucanía 510 — Dirección Institucional
            </div>
        `;
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    };

    const cerrarModal = () => {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    };

    if (btnCerrar) btnCerrar.onclick = cerrarModal;
    window.onclick = (e) => { if (e.target == modal) cerrarModal(); };

    renderAnuncios();
});