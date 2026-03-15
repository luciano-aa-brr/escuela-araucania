/**
 * js/anuncios.js - Panel de Anuncios con Modal
 * Diseñado para ser responsivo y fácil de actualizar.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    const anuncios = [
        {
            titulo: "Reunión de Apoderados - Marzo",
            fecha: "18 de Marzo, 2026",
            categoria: "Reuniones",
            prioridad: "alta",
            resumen: "Coordinación del plan académico 2026.",
            contenido: `
                <p class="mb-4">Estimados padres y apoderados, se les cita a la primera reunión oficial del año escolar.</p>
                <p class="mb-4"><strong>Temas a tratar:</strong></p>
                <ul class="list-disc ml-6 mb-6 space-y-2">
                    <li>Presentación del cuerpo docente.</li>
                    <li>Protocolos de convivencia escolar 2026.</li>
                    <li>Elección de directivas de curso.</li>
                </ul>
                <p class="bg-gray-100 p-4 rounded-xl italic text-sm">Lugar: Gimnasio de la escuela a las 18:00 hrs. Su asistencia es fundamental.</p>
            `
        },
        {
            titulo: "Vacunación Escolar 2026",
            fecha: "01 de Abril, 2026",
            categoria: "Salud",
            prioridad: "alta",
            resumen: "Proceso para 1ero, 4to, 5to y 8vo básico.",
            contenido: `
                <p>Informamos que el personal del CESFAM Labranza realizará el proceso de vacunación anual en nuestras dependencias.</p>
                <p class="mt-4">Es obligatorio que los alumnos asistan con su carnet de identidad o libreta de familia. En caso de alergias severas, favor informar previamente al profesor jefe.</p>
            `
        }
    ];

    const container = document.getElementById('anuncios-grid');
    const modal = document.getElementById('anuncio-modal');
    const modalBody = document.getElementById('modal-anuncio-body');
    const btnCerrar = document.getElementById('cerrar-modal-anuncio');

    const renderAnuncios = () => {
        if (!container) return;
        container.innerHTML = '';

        anuncios.forEach(anun => {
            const accentColor = anun.prioridad === 'alta' ? 'bg-escuela-yellow' : 'bg-black';
            
            const row = document.createElement('div');
            row.className = "bg-white border-2 border-gray-100 flex items-stretch hover:border-black transition-all group cursor-pointer animate-fade-in-down";
            row.onclick = () => abrirAnuncio(anun);

            row.innerHTML = `
                <div class="w-2 md:w-3 ${accentColor} flex-shrink-0"></div>
                <div class="p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between w-full gap-2 md:gap-4">
                    <div class="space-y-1">
                        <div class="flex items-center space-x-2">
                            <span class="text-[9px] font-black uppercase tracking-widest text-gray-400">${anun.categoria}</span>
                            ${anun.prioridad === 'alta' ? '<span class="text-[9px] bg-escuela-yellow px-2 py-0.5 font-black uppercase">Importante</span>' : ''}
                        </div>
                        <h2 class="text-lg md:text-xl font-black uppercase italic leading-tight group-hover:text-amber-500 transition-colors">${anun.titulo}</h2>
                        <p class="text-gray-500 text-sm font-medium line-clamp-1">${anun.resumen}</p>
                    </div>
                    <div class="flex items-center justify-between md:flex-col md:items-end md:justify-center border-t md:border-t-0 pt-2 md:pt-0 border-gray-50">
                        <span class="text-[10px] font-black uppercase whitespace-nowrap text-gray-400">${anun.fecha}</span>
                        <span class="text-xl md:hidden">→</span>
                    </div>
                </div>
            `;
            container.appendChild(row);
        });
    };

    const abrirAnuncio = (anun) => {
        modalBody.innerHTML = `
            <div class="mb-6">
                <span class="bg-black text-white text-[10px] font-black uppercase px-3 py-1 rounded-full">${anun.categoria}</span>
                <p class="text-gray-400 text-xs font-bold mt-4 uppercase tracking-widest">${anun.fecha}</p>
                <h2 class="text-3xl md:text-4xl font-black uppercase italic mt-2 leading-tight">${anun.titulo}</h2>
            </div>
            <div class="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                ${anun.contenido}
            </div>
            <div class="mt-12 pt-6 border-t border-gray-100">
                <p class="text-[10px] font-black uppercase text-gray-400">Escuela Araucanía 510 — Dirección</p>
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