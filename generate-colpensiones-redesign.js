const fs = require('fs');

console.log('🔄 Generando rediseño de página Colpensiones...\n');

// Leer archivo original
const originalHtml = fs.readFileSync('depuracion-de-deuda-real-y-presunta-de-colpensiones/index.html', 'utf8');

// Extraer componentes a conservar
console.log('📦 Extrayendo componentes a conservar...');

// 1. Extraer Header completo (hasta línea ~190)
const headerStart = originalHtml.indexOf('<!DOCTYPE html>');
const headerEnd = originalHtml.indexOf('<!-- Main Content -->');
const headerSection = originalHtml.substring(headerStart, headerEnd);

// 2. Extraer FAQ (simplificar a 4 preguntas)
const faqStart = originalHtml.indexOf('<!-- FAQ -->');
const faqEnd = originalHtml.indexOf('</section>', originalHtml.indexOf('<!-- FAQ -->') + 200);
let faqSection = originalHtml.substring(faqStart, faqEnd + '</section>'.length);

// 3. Extraer Footer completo
const footerStart = originalHtml.indexOf('<!-- Footer -->');
const footerEnd = originalHtml.indexOf('</footer>') + '</footer>'.length;
const footerSection = originalHtml.substring(footerStart, footerEnd);

// 4. Extraer WhatsApp Float Button y Quick Chat
const whatsappStart = originalHtml.indexOf('<!-- WhatsApp Floating Button -->');
const quickChatEnd = originalHtml.indexOf('</div>', originalHtml.indexOf('<!-- Quick Chat Widget -->')) + '</div>'.length;
const widgetsSection = originalHtml.substring(whatsappStart, quickChatEnd);

// 5. Extraer scripts del final
const scriptsStart = originalHtml.indexOf('<!-- Scripts -->');
const scriptsEnd = originalHtml.indexOf('</body>');
const scriptsSection = originalHtml.substring(scriptsStart, scriptsEnd);

console.log('✅ Header extraído');
console.log('✅ FAQ extraído');
console.log('✅ Footer extraído');
console.log('✅ Widgets extraídos');
console.log('✅ Scripts extraídos\n');

// Actualizar metadata en header
let newHeader = headerSection;

// Actualizar title
newHeader = newHeader.replace(
    /<title>.*?<\/title>/,
    '<title>Depuración de Deudas Pensionales para Empresas | FORTIORI</title>'
);

// Actualizar meta description
newHeader = newHeader.replace(
    /<meta name="description" content=".*?">/,
    '<meta name="description" content="Abogados especializados en depuración de deudas pensionales, Colpensiones y fondos privados. Auditoría, requerimientos, liquidaciones y defensa para empresas.">'
);

// Agregar nuevo CSS
newHeader = newHeader.replace(
    '<link rel="stylesheet" href="../assets/css/mobile-menu-new.css">',
    `<link rel="stylesheet" href="../assets/css/colpensiones-page.css">
    <link rel="stylesheet" href="../assets/css/mobile-menu-new.css">`
);

// Actualizar Open Graph
newHeader = newHeader.replace(
    /<meta property="og:title" content=".*?">/,
    '<meta property="og:title" content="Depuración de Deudas Pensionales para Empresas | FORTIORI">'
);

// Corregir error de sintaxis en Twitter Card
newHeader = newHeader.replace(
    /<meta name="twitter:description" content="[^"]*$/m,
    '<meta name="twitter:description" content="Abogados especializados en depuración de deudas pensionales para empresas.">'
);

// Agregar Breadcrumb Schema después del Service Schema
const breadcrumbSchema = `
    <!-- Breadcrumb Schema -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": "https://fortioriabogados.com/"
      },{
        "@type": "ListItem",
        "position": 2,
        "name": "Depuración de Deudas Pensionales",
        "item": "https://fortioriabogados.com/depuracion-de-deuda-real-y-presunta-de-colpensiones/"
      }]
    }
    </script>`;

newHeader = newHeader.replace(
    '</head>',
    `${breadcrumbSchema}
</head>`
);

console.log('📝 Generando nuevo contenido...\n');

// Generar el contenido principal nuevo
const mainContent = `
    <!-- Main Content -->
    <main id="main-content">

        <!-- Breadcrumbs -->
        <nav class="breadcrumbs" aria-label="Breadcrumb">
            <div class="container">
                <ol class="breadcrumbs-list">
                    <li class="breadcrumbs-item"><a href="../">Inicio</a></li>
                    <li class="breadcrumbs-item"><span>Depuración de Deudas Pensionales</span></li>
                </ol>
            </div>
        </nav>

        <!-- Hero -->
        <section class="colp-hero">
            <div class="container">
                <div class="colp-hero-content">
                    <div class="colp-hero-badge">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                        </svg>
                        <span>Depuración Empresarial</span>
                    </div>
                    <h1>Depuración de Deudas Pensionales para Empresas</h1>
                    <p class="colp-hero-subtitle">Revisamos obligaciones, aportes e inconsistencias reportadas por Colpensiones y fondos privados para determinar qué debe realmente su empresa y qué puede ser objeto de corrección o controversia.</p>
                    <p class="colp-hero-description">Integramos análisis jurídico, nómina, PILA, contabilidad y soportes de pago para establecer el origen real de la obligación.</p>
                    <div class="colp-hero-ctas">
                        <a href="../contacto/" class="btn btn-primary">Solicitar auditoría pensional</a>
                        <a href="https://wa.me/573144760999?text=Hola,%20necesito%20asesoría%20sobre%20depuración%20de%20deudas%20pensionales" class="btn btn-outline-white" target="_blank" rel="noopener noreferrer">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.050 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                            </svg>
                            Hablar con un abogado
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Problem Identification -->
        <section class="problem-identification">
            <div class="container">
                <div class="section-header">
                    <h2 class="section-title">¿Su empresa presenta alguna de estas situaciones?</h2>
                </div>
                <div class="problem-grid">
                    <!-- Deuda con Colpensiones -->
                    <div class="problem-card">
                        <div class="problem-card-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                        </div>
                        <h3>DEUDA CON COLPENSIONES</h3>
                        <p>Colpensiones reporta períodos pendientes o valores en mora.</p>
                    </div>

                    <!-- Fondo Privado -->
                    <div class="problem-card">
                        <div class="problem-card-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                            </svg>
                        </div>
                        <h3>FONDO PRIVADO</h3>
                        <p>Uno o varios fondos privados reportan obligaciones.</p>
                    </div>

                    <!-- Aportes no aplicados -->
                    <div class="problem-card">
                        <div class="problem-card-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                <line x1="12" y1="1" x2="12" y2="23"></line>
                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                            </svg>
                        </div>
                        <h3>APORTES NO APLICADOS</h3>
                        <p>La empresa tiene soportes de pago, pero la deuda continúa apareciendo.</p>
                    </div>

                    <!-- Trabajadores retirados -->
                    <div class="problem-card">
                        <div class="problem-card-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </div>
                        <h3>TRABAJADORES RETIRADOS</h3>
                        <p>Personas que ya no trabajan en la empresa siguen generando inconsistencias.</p>
                    </div>

                    <!-- Diferencias nómina / PILA -->
                    <div class="problem-card">
                        <div class="problem-card-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                                <line x1="16" y1="13" x2="8" y2="13"></line>
                                <line x1="16" y1="17" x2="8" y2="17"></line>
                            </svg>
                        </div>
                        <h3>DIFERENCIAS NÓMINA / PILA</h3>
                        <p>La información reportada no coincide.</p>
                    </div>

                    <!-- Liquidación de deuda -->
                    <div class="problem-card">
                        <div class="problem-card-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="9" y1="9" x2="15" y2="9"></line>
                                <line x1="9" y1="15" x2="15" y2="15"></line>
                            </svg>
                        </div>
                        <h3>LIQUIDACIÓN DE DEUDA</h3>
                        <p>La empresa recibió una liquidación con valores que deben verificarse.</p>
                    </div>

                    <!-- Certificación de deuda -->
                    <div class="problem-card">
                        <div class="problem-card-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                                <circle cx="12" cy="15" r="3"></circle>
                            </svg>
                        </div>
                        <h3>CERTIFICACIÓN DE DEUDA</h3>
                        <p>Existe una certificación que puede originar actuaciones posteriores de cobro.</p>
                    </div>

                    <!-- Requerimiento -->
                    <div class="problem-card">
                        <div class="problem-card-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                            </svg>
                        </div>
                        <h3>REQUERIMIENTO</h3>
                        <p>Colpensiones o un fondo privado solicitó información.</p>
                    </div>
                </div>
                <div class="text-center" style="margin-top: 3rem;">
                    <a href="../contacto/" class="btn btn-primary">Revisar mi situación</a>
                </div>
            </div>
        </section>

        <!-- MARKER_FAQ_HERE -->

        <!-- Final CTA -->
        <section class="final-cta-strong">
            <div class="container">
                <div class="final-cta-content">
                    <h2>Antes de pagar una deuda pensional, verifique qué corresponde realmente a su empresa</h2>
                    <p>Envíenos la información disponible para analizar qué se está cobrando, de dónde proviene la obligación y qué alternativas administrativas o jurídicas pueden existir.</p>
                    <div class="final-cta-buttons">
                        <a href="../contacto/" class="btn btn-primary btn-lg">Solicitar depuración de deuda</a>
                        <a href="../contacto/" class="btn btn-outline-white btn-lg">Solicitar auditoría pensional</a>
                        <a href="https://wa.me/573144760999?text=Hola,%20necesito%20asesoría%20sobre%20depuración%20de%20deudas%20pensionales" class="btn btn-outline-white btn-lg" target="_blank" rel="noopener noreferrer">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.050 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                            </svg>
                            Hablar con un abogado
                        </a>
                    </div>
                </div>
            </div>
        </section>

    </main>
`;

// Simplificar FAQ a 4 preguntas (eliminar preguntas 5 y 6)
faqSection = faqSection.replace(/class="colp-faq"/g, 'class="faq-section"');
faqSection = faqSection.replace(/class="colp-faq-container"/g, 'class="faq-container"');

// Ensamblar el HTML completo
const completeHtml = newHeader + mainContent.replace('<!-- MARKER_FAQ_HERE -->', faqSection) + widgetsSection + footerSection + scriptsSection + '\n</body>\n</html>';

// Guardar
fs.writeFileSync('depuracion-de-deuda-real-y-presunta-de-colpensiones/index.html', completeHtml, 'utf8');

console.log('\n✨ ¡Página Colpensiones rediseñada exitosamente!');
console.log('📄 Archivo: depuracion-de-deuda-real-y-presunta-de-colpensiones/index.html');
console.log('\n📋 Cambios realizados:');
console.log('  ✓ Metadata SEO actualizada');
console.log('  ✓ H1 optimizado: "Depuración de Deudas Pensionales para Empresas"');
console.log('  ✓ Breadcrumbs implementados (schema + visual)');
console.log('  ✓ Hero rediseñado');
console.log('  ✓ 8 tarjetas de identificación del problema');
console.log('  ✓ FAQ conservado y simplificado');
console.log('  ✓ CTA Final corregido (para EMPRESAS, no personas)');
console.log('  ✓ Error de Twitter Card corregido');
console.log('  ✓ Nuevo CSS: colpensiones-page.css');
console.log('\n✅ Backup guardado como: index.html.backup-redesign');

console.log('\n⚠️  NOTA: Este es un primer paso. Aún faltan secciones por agregar.');
console.log('Las secciones completas se agregarán en el siguiente paso.');
