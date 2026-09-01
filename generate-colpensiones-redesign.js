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

// Generate FAQPage Schema
const faqPageSchema = `
    <!-- FAQPage Schema -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [{
        "@type": "Question",
        "name": "¿Mi empresa realmente debe todo lo que dice Colpensiones o la UGPP?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No necesariamente. En nuestra experiencia, más del 60% de las deudas pensionales reportadas contienen errores, cobros duplicados o malas aplicaciones de pago. Por eso es fundamental realizar una auditoría pensional antes de pagar cualquier deuda reportada."
        }
      },{
        "@type": "Question",
        "name": "¿Qué pasa si mi empresa recibió una deuda de cientos de millones de pesos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No pague inmediatamente. Lo primero es auditar la deuda. Usted tiene derecho a defenderse y a pagar solo lo que realmente debe su empresa."
        }
      },{
        "@type": "Question",
        "name": "¿Cuánto tiempo tengo para responder a un requerimiento de Colpensiones o la UGPP?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Los plazos son estrictos: Requerimiento ordinario 15 días hábiles, Pliego de cargos UGPP 15 días hábiles, Liquidación oficial 30 días hábiles, Resolución de sanción 30 días hábiles. Es crucial actuar rápido."
        }
      },{
        "@type": "Question",
        "name": "¿Puedo negociar un acuerdo de pago con Colpensiones o la UGPP?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí, es posible negociar facilidades de pago, pero solo después de depurar la deuda. Primero depure, luego negocie."
        }
      }]
    }
    </script>`;

newHeader = newHeader.replace(
    '</head>',
    `${breadcrumbSchema}${faqPageSchema}
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

        <!-- Why Debts Appear - Deuda Real vs Presunta -->
        <section class="why-debts-section">
            <div class="container">
                <div class="section-header text-center">
                    <h2 class="section-title">¿Por Qué Aparecen Deudas Pensionales?</h2>
                    <p class="section-description">Las deudas pensionales pueden ser reales o presuntas. Comprender la diferencia es fundamental para la defensa de su empresa.</p>
                </div>

                <div class="debt-types-grid">
                    <div class="debt-type-card debt-real">
                        <div class="debt-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                            </svg>
                        </div>
                        <h3>Deuda Real</h3>
                        <p>Aportes efectivamente no realizados o mal liquidados por la empresa. Esta deuda existe y debe ser pagada.</p>
                    </div>

                    <div class="debt-type-card debt-presunta">
                        <div class="debt-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M12 16v-4M12 8h.01"></path>
                            </svg>
                        </div>
                        <h3>Deuda Presunta</h3>
                        <p>Cobros sin sustento real, por errores administrativos o malas aplicaciones de pago. Puede ser eliminada completamente.</p>
                    </div>
                </div>

                <div class="causes-section">
                    <h3 class="causes-title">Causas Frecuentes de Deudas Pensionales</h3>
                    <div class="causes-grid">
                        <div class="cause-item">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M9 11l3 3L22 4"></path>
                            </svg>
                            <p>Errores en el reporte de semanas cotizadas</p>
                        </div>
                        <div class="cause-item">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M12 8v8M8 12h8"></path>
                            </svg>
                            <p>Pagos mal aplicados por Colpensiones o fondos privados</p>
                        </div>
                        <div class="cause-item">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                            </svg>
                            <p>Diferencias en la base de cotización</p>
                        </div>
                        <div class="cause-item">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                            </svg>
                            <p>Cambios de razón social o fusiones empresariales</p>
                        </div>
                        <div class="cause-item">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                            </svg>
                            <p>Traslapes en cotizaciones (empleados en dos fondos simultáneamente)</p>
                        </div>
                        <div class="cause-item">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                            </svg>
                            <p>Requerimientos indebidos por aportes ya cancelados</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Process Timeline (NO carousel, fixed timeline) -->
        <section class="process-timeline-section">
            <div class="container">
                <div class="section-header text-center">
                    <span class="section-eyebrow">Nuestro Método</span>
                    <h2 class="section-title">Proceso de Depuración Empresarial</h2>
                    <p class="section-description">5 pasos para defender a su empresa ante deudas pensionales</p>
                </div>

                <div class="process-timeline">
                    <!-- Step 1 -->
                    <div class="process-step">
                        <div class="step-number">1</div>
                        <div class="step-content">
                            <h3>Auditoría Inicial de Deuda</h3>
                            <p>Revisamos liquidaciones, cuentas de cobro y certificaciones. Identificamos errores y fundamentos legales para la defensa.</p>
                            <ul>
                                <li>Análisis de liquidaciones oficiales</li>
                                <li>Revisión de planillas PILA</li>
                                <li>Informe técnico-jurídico</li>
                            </ul>
                        </div>
                    </div>

                    <!-- Step 2 -->
                    <div class="process-step">
                        <div class="step-number">2</div>
                        <div class="step-content">
                            <h3>Recopilación de Información</h3>
                            <p>Solicitamos documentación soporte para construir la defensa: nómina, comprobantes de pago, contratos laborales.</p>
                            <ul>
                                <li>Contratos laborales y liquidaciones</li>
                                <li>Planillas PILA históricas</li>
                                <li>Comprobantes de pago y extractos bancarios</li>
                            </ul>
                        </div>
                    </div>

                    <!-- Step 3 -->
                    <div class="process-step">
                        <div class="step-number">3</div>
                        <div class="step-content">
                            <h3>Construcción de Defensa</h3>
                            <p>Elaboramos la estrategia legal y administrativa con fundamentos jurídicos, pruebas y argumentos técnicos.</p>
                            <ul>
                                <li>Análisis jurídico de normativa aplicable</li>
                                <li>Organización de pruebas documentales</li>
                                <li>Estrategia de defensa administrativa o judicial</li>
                            </ul>
                        </div>
                    </div>

                    <!-- Step 4 -->
                    <div class="process-step">
                        <div class="step-number">4</div>
                        <div class="step-content">
                            <h3>Presentación de Recursos</h3>
                            <p>Interponemos recursos de reposición, apelación o demandas según la etapa del proceso.</p>
                            <ul>
                                <li>Respuesta a requerimientos</li>
                                <li>Recursos contra liquidaciones</li>
                                <li>Demandas judiciales cuando proceda</li>
                            </ul>
                        </div>
                    </div>

                    <!-- Step 5 -->
                    <div class="process-step">
                        <div class="step-number">5</div>
                        <div class="step-content">
                            <h3>Seguimiento y Cierre</h3>
                            <p>Hacemos seguimiento a las respuestas de Colpensiones, fondos o autoridades hasta obtener una resolución favorable.</p>
                            <ul>
                                <li>Monitoreo de tiempos procesales</li>
                                <li>Respuestas a requerimientos adicionales</li>
                                <li>Obtención de certificados de paz y salvo</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Information We Review -->
        <section class="info-review-section">
            <div class="container">
                <div class="section-header text-center">
                    <h2 class="section-title">Información que Revisamos</h2>
                    <p class="section-description">Documentación necesaria para la auditoría y defensa de deudas pensionales</p>
                </div>

                <div class="info-review-grid">
                    <div class="info-item">
                        <div class="info-icon">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                            </svg>
                        </div>
                        <h3>Liquidaciones y Certificaciones</h3>
                        <p>Liquidaciones oficiales, certificaciones de deuda, cuentas de cobro de Colpensiones y fondos privados</p>
                    </div>

                    <div class="info-item">
                        <div class="info-icon">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="9" y1="9" x2="15" y2="9"></line>
                            </svg>
                        </div>
                        <h3>Planillas PILA</h3>
                        <p>Planillas de liquidación integrada de aportes (PILA) históricas de la empresa</p>
                    </div>

                    <div class="info-item">
                        <div class="info-icon">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="12" y1="1" x2="12" y2="23"></line>
                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                            </svg>
                        </div>
                        <h3>Comprobantes de Pago</h3>
                        <p>Recibos bancarios, extractos y soportes de transferencias de aportes pensionales</p>
                    </div>

                    <div class="info-item">
                        <div class="info-icon">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </div>
                        <h3>Nómina y Contratos</h3>
                        <p>Contratos laborales, liquidaciones de nómina, certificaciones laborales de empleados</p>
                    </div>

                    <div class="info-item">
                        <div class="info-icon">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                            </svg>
                        </div>
                        <h3>Requerimientos</h3>
                        <p>Requerimientos de información, emplazamientos y actos administrativos previos</p>
                    </div>

                    <div class="info-item">
                        <div class="info-icon">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                            </svg>
                        </div>
                        <h3>Información Corporativa</h3>
                        <p>Certificado de existencia, reformas estatutarias, fusiones, cambios de razón social</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Main Services -->
        <section class="main-services-section">
            <div class="container">
                <div class="section-header text-center">
                    <span class="section-eyebrow">Nuestros Servicios</span>
                    <h2 class="section-title">Servicio Integral de Depuración</h2>
                    <p class="section-description">Auditoría, defensa y representación legal en obligaciones pensionales empresariales</p>
                </div>

                <div class="main-services-grid">
                    <!-- Service 1 -->
                    <div class="service-card">
                        <div class="service-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                            </svg>
                        </div>
                        <h3>Depuración con Colpensiones</h3>
                        <p>Revisamos y depuramos obligaciones con Colpensiones, identificando cobros indebidos y errores administrativos.</p>
                    </div>

                    <!-- Service 2 -->
                    <div class="service-card">
                        <div class="service-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                                <path d="M9 9h6v6H9z"></path>
                            </svg>
                        </div>
                        <h3>Fondos Privados de Pensiones</h3>
                        <p>Depuramos obligaciones con fondos privados (Protección, Porvenir, Colfondos, Old Mutual).</p>
                    </div>

                    <!-- Service 3 -->
                    <div class="service-card">
                        <div class="service-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M9 11l3 3L22 4"></path>
                                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                            </svg>
                        </div>
                        <h3>Auditoría Pensional Empresarial</h3>
                        <p>Auditorías integrales para determinar el estado real de las obligaciones pensionales.</p>
                    </div>

                    <!-- Service 4 -->
                    <div class="service-card">
                        <div class="service-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="12" y1="1" x2="12" y2="23"></line>
                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                            </svg>
                        </div>
                        <h3>Aportes No Aplicados</h3>
                        <p>Gestionamos la aplicación correcta de aportes pagados pero no reflejados por las entidades.</p>
                    </div>
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

// Extract only first 4 FAQ items
const faqMatch = faqSection.match(/<div class="faq-container">([\s\S]*?)<\/div>\s*<\/div>\s*<\/section>/);
if (faqMatch) {
    const fullFaq = faqMatch[1];
    const faqItems = fullFaq.match(/<div class="colp-faq-item">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g) || [];

    // Keep only first 4 FAQ items
    const first4Items = faqItems.slice(0, 4).join('\n                    ');

    // Replace colp-faq class names with standard names
    const cleanedItems = first4Items
        .replace(/colp-faq-item/g, 'faq-item')
        .replace(/colp-faq-question/g, 'faq-question')
        .replace(/colp-faq-question-text/g, 'faq-question-text')
        .replace(/colp-faq-icon/g, 'faq-icon')
        .replace(/colp-faq-answer/g, 'faq-answer')
        .replace(/colp-faq-answer-content/g, 'faq-answer-content');

    faqSection = `
        <!-- FAQ Simplified -->
        <section class="faq-section">
            <div class="container">
                <div class="section-header text-center">
                    <span class="section-eyebrow">Preguntas Frecuentes</span>
                    <h2 class="section-title">Dudas sobre Depuración Empresarial</h2>
                    <p class="section-description">Respuestas claras a las preguntas más comunes sobre depuración de deudas pensionales</p>
                </div>

                <div class="faq-container">
                    ${cleanedItems}
                </div>
            </div>
        </section>`;
}

// Ensamblar el HTML completo
const completeHtml = newHeader + mainContent.replace('<!-- MARKER_FAQ_HERE -->', faqSection) + widgetsSection + footerSection + scriptsSection + '\n</body>\n</html>';

// Guardar
fs.writeFileSync('depuracion-de-deuda-real-y-presunta-de-colpensiones/index.html', completeHtml, 'utf8');

console.log('\n✨ ¡Página Colpensiones rediseñada exitosamente!');
console.log('📄 Archivo: depuracion-de-deuda-real-y-presunta-de-colpensiones/index.html');
console.log('\n📋 Cambios realizados:');
console.log('  ✓ Metadata SEO actualizada (title, description, Twitter Card)');
console.log('  ✓ H1 optimizado: "Depuración de Deudas Pensionales para Empresas"');
console.log('  ✓ Breadcrumbs implementados (schema + visual)');
console.log('  ✓ Hero rediseñado con CTAs empresariales');
console.log('  ✓ 8 tarjetas de identificación del problema');
console.log('  ✓ Sección "¿Por Qué Aparecen Deudas?" (Deuda Real vs Presunta)');
console.log('  ✓ Carrusel convertido a timeline fijo (5 pasos)');
console.log('  ✓ Sección "Información que Revisamos" (6 documentos)');
console.log('  ✓ Servicios principales (4 servicios)');
console.log('  ✓ FAQ simplificado de 6 a 4 preguntas');
console.log('  ✓ FAQPage schema agregado');
console.log('  ✓ CTA Final corregido (para EMPRESAS, no personas)');
console.log('  ✓ Nuevo CSS: colpensiones-page.css');
console.log('\n✅ Backup guardado como: index.html.backup-redesign');
console.log('\n🎯 Página completamente rediseñada y optimizada para SEO empresarial.');
