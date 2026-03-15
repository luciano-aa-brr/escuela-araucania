/**
 * js/documentos.js - Gestión de Archivos y Manuales
 * Arquitectura colapsable para móviles
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. DATA: Aquí irán los documentos cuando te los entreguen
    const repositorio = [
        {
            nombreCategoria: "Gestión Institucional",
            icon: "📂",
            archivos: [
                { nombre: "Proyecto Educativo Institucional (PEI)", link: "docs/PEI_2026.pdf", size: "1.2 MB" },
                { nombre: "Plan de Mejoramiento Educativo (PME)", link: "docs/PME_2026.pdf", size: "850 KB" }
            ]
        },
        {
            nombreCategoria: "Reglamentos y Convivencia",
            icon: "⚖️",
            archivos: [
                { nombre: "Reglamento Interno de Convivencia", link: "docs/Reglamento_Interno.pdf", size: "2.1 MB" },
                { nombre: "Protocolo de Accidentes Escolares", link: "docs/Protocolo_Accidentes.pdf", size: "400 KB" }
            ]
        },
        {
            nombreCategoria: "Manuales para Apoderados",
            icon: "📖",
            archivos: [
                { nombre: "Manual de Uso de Plataformas", link: "docs/Manual_Plataformas.pdf", size: "1.5 MB" }
            ]
        }
    ];

    const container = document.getElementById('documentos-container');

    const renderDocumentos = () => {
        if (!container) return;
        
        // Si el repositorio está vacío (o quieres mostrar que está en construcción)
        if (repositorio.length === 0) {
            container.innerHTML = `
                <div class="border-4 border-dashed border-gray-200 p-12 text-center rounded-3xl">
                    <p class="text-gray-400 font-black uppercase italic">Documentación en proceso de actualización</p>
                    <p class="text-xs text-gray-300 uppercase mt-2 font-bold tracking-widest text-black">Próximamente disponible</p>
                </div>
            `;
            return;
        }

        container.innerHTML = '';

        repositorio.forEach((cat, index) => {
            const catId = `cat-${index}`;
            
            container.innerHTML += `
                <div class="border-2 border-black bg-white overflow-hidden animate-fade-in-down">
                    <button onclick="toggleCategory('${catId}')" class="w-full p-6 flex justify-between items-center hover:bg-gray-50 transition-colors">
                        <div class="flex items-center space-x-4">
                            <span class="text-2xl">${cat.icon}</span>
                            <span class="font-black uppercase italic md:text-xl text-left">${cat.nombreCategoria}</span>
                        </div>
                        <span id="icon-${catId}" class="text-xl transition-transform duration-300">＋</span>
                    </button>

                    <div id="${catId}" class="hidden border-t-2 border-gray-100 bg-gray-50">
                        <div class="p-4 space-y-2">
                            ${cat.archivos.map(doc => `
                                <a href="${doc.link}" target="_blank" class="flex items-center justify-between p-4 bg-white border border-gray-200 hover:border-escuela-yellow group transition-all">
                                    <div class="flex items-center space-x-3">
                                        <span class="text-red-500 font-black text-xs italic">PDF</span>
                                        <span class="text-sm font-bold uppercase text-gray-700 group-hover:text-black">${doc.nombre}</span>
                                    </div>
                                    <span class="text-[10px] font-black text-gray-400">${doc.size}</span>
                                </a>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
        });
    };

    // Función global para el Toggle (necesaria para el onclick en el HTML inyectado)
    window.toggleCategory = (id) => {
        const content = document.getElementById(id);
        const icon = document.getElementById(`icon-${id}`);
        
        const isHidden = content.classList.contains('hidden');
        
        if (isHidden) {
            content.classList.remove('hidden');
            icon.style.transform = 'rotate(45deg)';
            icon.innerText = '✕';
        } else {
            content.classList.add('hidden');
            icon.style.transform = 'rotate(0deg)';
            icon.innerText = '＋';
        }
    };

    renderDocumentos();


});