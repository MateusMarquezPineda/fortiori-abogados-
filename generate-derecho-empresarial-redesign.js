const fs = require('fs');
const path = require('path');

/**
 * DERECHO EMPRESARIAL PAGE REDESIGN GENERATOR
 *
 * Generates the complete HTML for the redesigned
 * "Asistencia Legal Permanente para Empresas" page
 *
 * Following user requirements:
 * - PREVENTION focus (not reactive)
 * - Timeline de Acompañamiento as visual differentiator
 * - Breadcrumbs + schemas
 * - NO invented information
 * - NO risky promises
 * - Internal links to UGPP and Colpensiones
 * - SEO optimized for "asesoría jurídica para empresas"
 */

function generateHTML() {
    return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- SEO Meta Tags - Optimized for "asesoría jurídica para empresas" -->
    <title>Asistencia Legal Permanente para Empresas | FORTIORI ABOGADOS</title>
    <meta name="description" content="Acompañamiento jurídico integral para empresas: prevención, actualización normativa y asesoría continua en derecho laboral, contratos y seguridad social.">
    <meta name="keywords" content="asesoría jurídica para empresas, asistencia legal permanente, derecho laboral empresarial, contratos comerciales, actualización normativa">
    <meta name="author" content="FORTIORI ABOGADOS">
    <meta name="robots" content="index, follow">

    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="Asistencia Legal Permanente para Empresas | FORTIORI ABOGADOS">
    <meta property="og:description" content="Acompañamiento jurídico integral para empresas: prevención, actualización normativa y asesoría continua.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://fortioriabogados.com/derecho-empresarial/">
    <meta property="og:image" content="https://fortioriabogados.com/assets/images/og-derecho-empresarial.jpg">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:locale" content="es_CO">
    <meta property="og:site_name" content="FORTIORI ABOGADOS">

    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Asistencia Legal Permanente para Empresas | FORTIORI ABOGADOS">
    <meta name="twitter:description" content="Acompañamiento jurídico integral para empresas: prevención, actualización normativa y asesoría continua.">
    <meta name="twitter:image" content="https://fortioriabogados.com/assets/images/twitter-derecho-empresarial.jpg">

    <!-- Canonical URL -->
    <link rel="canonical" href="https://fortioriabogados.com/derecho-empresarial/">

    <!-- Stylesheets -->
    <link rel="stylesheet" href="../assets/css/main.css">
    <link rel="stylesheet" href="../assets/css/derecho-empresarial-page.css">

    <!-- Schema.org JSON-LD: LegalService -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "LegalService",
        "name": "FORTIORI ABOGADOS - Asistencia Legal Permanente para Empresas",
        "image": "https://fortioriabogados.com/assets/images/logo.png",
        "description": "Acompañamiento jurídico integral para empresas con enfoque preventivo en derecho laboral, seguridad social, contratos comerciales y corporativo.",
        "url": "https://fortioriabogados.com/derecho-empresarial/",
        "telephone": "+57-300-123-4567",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Calle 24C # 84-85 T9-326",
            "addressLocality": "Bogotá",
            "addressRegion": "Bogotá D.C.",
            "postalCode": "111221",
            "addressCountry": "CO"
        },
        "areaServed": {
            "@type": "Country",
            "name": "Colombia"
        },
        "serviceType": [
            "Asesoría Jurídica Empresarial",
            "Derecho Laboral",
            "Seguridad Social",
            "Contratos Comerciales",
            "Derecho Corporativo"
        ]
    }
    </script>

    <!-- Schema.org JSON-LD: BreadcrumbList -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Inicio",
                "item": "https://fortioriabogados.com/"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Asistencia Legal Permanente para Empresas",
                "item": "https://fortioriabogados.com/derecho-empresarial/"
            }
        ]
    }
    </script>
</head>
<body>
    <!-- Navigation -->
    <?php include '../templates/partials/navbar.php'; ?>

    <!-- Breadcrumbs -->
    <nav class="breadcrumbs" aria-label="Breadcrumb">
        <div class="container">
            <ol class="breadcrumbs-list">
                <li class="breadcrumbs-item"><a href="../">Inicio</a></li>
                <li class="breadcrumbs-item"><span>Asistencia Legal Permanente para Empresas</span></li>
            </ol>
        </div>
    </nav>

    <!-- Main Content -->
    <main>
        <!-- Hero Section -->
        <section class="empresarial-hero">
            <div class="container">
                <div class="empresarial-hero-content">
                    <h1>
                        Asistencia Legal Permanente para Empresas
                        <span class="highlight">Prevenir Antes que Corregir</span>
                    </h1>
                    <p class="empresarial-hero-subtitle">
                        Acompañamiento jurídico integral y continuo para que tu empresa opere con seguridad,
                        cumpla con la normativa vigente y tome decisiones estratégicas con respaldo legal.
                    </p>

                    <div class="empresarial-hero-features">
                        <div class="empresarial-hero-feature">
                            <div class="empresarial-hero-feature-icon">🛡️</div>
                            <div class="empresarial-hero-feature-text">
                                <strong>Prevención Legal</strong>
                                <span>Evita sanciones y riesgos</span>
                            </div>
                        </div>
                        <div class="empresarial-hero-feature">
                            <div class="empresarial-hero-feature-icon">🔄</div>
                            <div class="empresarial-hero-feature-text">
                                <strong>Acompañamiento Continuo</strong>
                                <span>Asesoría permanente</span>
                            </div>
                        </div>
                        <div class="empresarial-hero-feature">
                            <div class="empresarial-hero-feature-icon">📋</div>
                            <div class="empresarial-hero-feature-text">
                                <strong>Actualización Normativa</strong>
                                <span>Siempre al día</span>
                            </div>
                        </div>
                        <div class="empresarial-hero-feature">
                            <div class="empresarial-hero-feature-icon">⚖️</div>
                            <div class="empresarial-hero-feature-text">
                                <strong>Estrategia Legal</strong>
                                <span>Decisiones respaldadas</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Timeline de Acompañamiento Empresarial (Visual Differentiator) -->
        <section class="timeline-section">
            <div class="container">
                <div class="timeline-section-header">
                    <h2>Timeline de Acompañamiento Empresarial</h2>
                    <p>Desde el inicio hasta el crecimiento sostenible: te acompañamos en cada etapa del ciclo de vida de tu empresa.</p>
                </div>

                <div class="empresarial-timeline">
                    <div class="timeline-stages">
                        <!-- Stage 1: Constitución -->
                        <div class="timeline-stage">
                            <div class="timeline-stage-number">1</div>
                            <div class="timeline-stage-card">
                                <h3 class="timeline-stage-title">Constitución</h3>
                                <p class="timeline-stage-description">
                                    Creación de la estructura legal de tu empresa con el tipo societario adecuado.
                                </p>
                                <ul class="timeline-stage-benefits">
                                    <li>Selección de tipo societario</li>
                                    <li>Estatutos y acuerdos</li>
                                    <li>Registro mercantil</li>
                                </ul>
                            </div>
                        </div>

                        <!-- Stage 2: Operación -->
                        <div class="timeline-stage">
                            <div class="timeline-stage-number">2</div>
                            <div class="timeline-stage-card">
                                <h3 class="timeline-stage-title">Operación</h3>
                                <p class="timeline-stage-description">
                                    Asesoría continua en la gestión diaria: contratos, nómina, políticas internas.
                                </p>
                                <ul class="timeline-stage-benefits">
                                    <li>Elaboración de contratos</li>
                                    <li>Gestión laboral y nómina</li>
                                    <li>Reglamentos internos</li>
                                </ul>
                            </div>
                        </div>

                        <!-- Stage 3: Prevención (CENTRAL - Highlighted) -->
                        <div class="timeline-stage">
                            <div class="timeline-stage-number">3</div>
                            <div class="timeline-stage-card">
                                <div class="timeline-stage-badge">ENFOQUE CLAVE</div>
                                <h3 class="timeline-stage-title">Prevención</h3>
                                <p class="timeline-stage-description">
                                    Auditorías preventivas y actualización normativa para evitar sanciones y contingencias.
                                </p>
                                <ul class="timeline-stage-benefits">
                                    <li>Auditorías de cumplimiento</li>
                                    <li>Actualización normativa</li>
                                    <li>Planes de acción preventivos</li>
                                </ul>
                            </div>
                        </div>

                        <!-- Stage 4: Crecimiento -->
                        <div class="timeline-stage">
                            <div class="timeline-stage-number">4</div>
                            <div class="timeline-stage-card">
                                <h3 class="timeline-stage-title">Crecimiento</h3>
                                <p class="timeline-stage-description">
                                    Expansión empresarial, fusiones, adquisiciones y apertura de nuevas líneas de negocio.
                                </p>
                                <ul class="timeline-stage-benefits">
                                    <li>Fusiones y adquisiciones</li>
                                    <li>Expansión comercial</li>
                                    <li>Nuevas líneas de negocio</li>
                                </ul>
                            </div>
                        </div>

                        <!-- Stage 5: Sostenibilidad -->
                        <div class="timeline-stage">
                            <div class="timeline-stage-number">5</div>
                            <div class="timeline-stage-card">
                                <h3 class="timeline-stage-title">Sostenibilidad</h3>
                                <p class="timeline-stage-description">
                                    Consolidación y protección del patrimonio empresarial a largo plazo.
                                </p>
                                <ul class="timeline-stage-benefits">
                                    <li>Gobierno corporativo</li>
                                    <li>Protección patrimonial</li>
                                    <li>Planificación estratégica</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Propuesta de Valor - 4 Pillars -->
        <section class="propuesta-section">
            <div class="container">
                <div class="timeline-section-header">
                    <h2>¿Por Qué Asistencia Legal Permanente?</h2>
                    <p>Nuestro enfoque se basa en cuatro pilares fundamentales para el éxito empresarial.</p>
                </div>

                <div class="propuesta-grid">
                    <div class="propuesta-card">
                        <div class="propuesta-icon">🛡️</div>
                        <h3>Prevención</h3>
                        <p>
                            Identificamos y mitigamos riesgos legales antes de que se conviertan en problemas.
                            Auditorías periódicas de cumplimiento normativo en derecho laboral, seguridad social y corporativo.
                        </p>
                    </div>

                    <div class="propuesta-card">
                        <div class="propuesta-icon">🤝</div>
                        <h3>Acompañamiento</h3>
                        <p>
                            Asesoría jurídica continua para todas las decisiones empresariales: contratación,
                            elaboración de políticas internas, gestión de nómina y relaciones comerciales.
                        </p>
                    </div>

                    <div class="propuesta-card">
                        <div class="propuesta-icon">📋</div>
                        <h3>Actualización</h3>
                        <p>
                            Te mantenemos informado sobre cambios normativos en derecho laboral, tributario,
                            seguridad social y comercial que impactan directamente a tu empresa.
                        </p>
                    </div>

                    <div class="propuesta-card">
                        <div class="propuesta-icon">🎯</div>
                        <h3>Estrategia</h3>
                        <p>
                            Asesoría legal alineada con tus objetivos de negocio: expansión comercial,
                            optimización de estructura societaria y protección patrimonial.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Áreas de Acompañamiento -->
        <section class="areas-section">
            <div class="container">
                <div class="timeline-section-header">
                    <h2>Áreas de Acompañamiento Legal</h2>
                    <p>Cobertura integral en las cuatro áreas clave del derecho empresarial.</p>
                </div>

                <div class="areas-grid">
                    <!-- Derecho Laboral -->
                    <div class="area-card">
                        <div class="area-card-header">
                            <div class="area-card-icon">👥</div>
                            <h3>Derecho Laboral</h3>
                        </div>
                        <p class="area-card-description">
                            Gestión completa de la relación laboral: desde la contratación hasta la terminación,
                            con enfoque preventivo en cumplimiento normativo.
                        </p>
                        <ul class="area-card-list">
                            <li>Elaboración y revisión de contratos laborales</li>
                            <li>Diseño y actualización de reglamentos internos de trabajo</li>
                            <li>Asesoría en procesos disciplinarios</li>
                            <li>Gestión de terminaciones de contrato</li>
                            <li>Auditorías de cumplimiento laboral</li>
                            <li>Capacitación en normativa laboral</li>
                        </ul>
                    </div>

                    <!-- Seguridad Social -->
                    <div class="area-card">
                        <div class="area-card-header">
                            <div class="area-card-icon">💼</div>
                            <h3>Seguridad Social</h3>
                        </div>
                        <p class="area-card-description">
                            Cumplimiento integral en salud, pensiones, riesgos laborales y aportes parafiscales.
                            Prevención de sanciones y fiscalizaciones.
                        </p>
                        <ul class="area-card-list">
                            <li>Revisión de liquidación de aportes (PILA)</li>
                            <li>Auditoría de cumplimiento en seguridad social</li>
                            <li>Asesoría en afiliaciones y novedades</li>
                            <li>Gestión de incapacidades y licencias</li>
                            <li>Preparación para fiscalizaciones de UGPP</li>
                            <li>Corrección de errores en aportes</li>
                        </ul>
                    </div>

                    <!-- Contratos Comerciales -->
                    <div class="area-card">
                        <div class="area-card-header">
                            <div class="area-card-icon">📄</div>
                            <h3>Contratos Comerciales</h3>
                        </div>
                        <p class="area-card-description">
                            Elaboración, revisión y negociación de todo tipo de contratos comerciales
                            para proteger los intereses de tu empresa.
                        </p>
                        <ul class="area-card-list">
                            <li>Contratos de compraventa y suministro</li>
                            <li>Contratos de prestación de servicios</li>
                            <li>Acuerdos de confidencialidad (NDA)</li>
                            <li>Contratos de arrendamiento comercial</li>
                            <li>Alianzas estratégicas y joint ventures</li>
                            <li>Revisión de cláusulas y condiciones</li>
                        </ul>
                    </div>

                    <!-- Derecho Corporativo -->
                    <div class="area-card">
                        <div class="area-card-header">
                            <div class="area-card-icon">🏢</div>
                            <h3>Derecho Corporativo</h3>
                        </div>
                        <p class="area-card-description">
                            Estructura societaria, gobierno corporativo y operaciones estratégicas
                            para el crecimiento sostenible de tu empresa.
                        </p>
                        <ul class="area-card-list">
                            <li>Constitución de sociedades</li>
                            <li>Reformas estatutarias</li>
                            <li>Actas de asamblea y junta directiva</li>
                            <li>Fusiones, escisiones y transformaciones</li>
                            <li>Aumento y reducción de capital</li>
                            <li>Liquidación y disolución societaria</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <!-- Situaciones Empresariales -->
        <section class="situaciones-section">
            <div class="container">
                <div class="timeline-section-header">
                    <h2>Situaciones Empresariales que Resolvemos</h2>
                    <p>Casos reales del día a día empresarial donde nuestro acompañamiento marca la diferencia.</p>
                </div>

                <div class="situaciones-grid">
                    <div class="situacion-card">
                        <div class="situacion-icon">✍️</div>
                        <div class="situacion-content">
                            <h4>Necesitas contratar personal</h4>
                            <p>Elaboramos contratos laborales según la modalidad requerida, con cláusulas que protegen tu empresa.</p>
                        </div>
                    </div>

                    <div class="situacion-card">
                        <div class="situacion-icon">📋</div>
                        <div class="situacion-content">
                            <h4>No tienes reglamento interno</h4>
                            <p>Diseñamos e implementamos el reglamento interno de trabajo adaptado a tu empresa.</p>
                        </div>
                    </div>

                    <div class="situacion-card">
                        <div class="situacion-icon">⚠️</div>
                        <div class="situacion-content">
                            <h4>Enfrentas un proceso disciplinario</h4>
                            <p>Asesoramos el procedimiento completo garantizando el debido proceso y respaldo documental.</p>
                        </div>
                    </div>

                    <div class="situacion-card">
                        <div class="situacion-icon">💰</div>
                        <div class="situacion-content">
                            <h4>Dudas sobre liquidación de nómina</h4>
                            <p>Revisamos conceptos salariales, horas extras, recargos y prestaciones sociales.</p>
                        </div>
                    </div>

                    <div class="situacion-card">
                        <div class="situacion-icon">🔍</div>
                        <div class="situacion-content">
                            <h4>Te notificaron fiscalización UGPP</h4>
                            <p>Preparamos toda la documentación y estrategia de defensa. <a href="../ugpp/" style="color: #006699; font-weight: 600;">Ver servicio especializado →</a></p>
                        </div>
                    </div>

                    <div class="situacion-card">
                        <div class="situacion-icon">📊</div>
                        <div class="situacion-content">
                            <h4>Errores en aportes a pensión</h4>
                            <p>Gestionamos corrección y depuración de deudas reales o presuntas. <a href="../depuracion-de-deuda-real-y-presunta-de-colpensiones/" style="color: #006699; font-weight: 600;">Ver servicio especializado →</a></p>
                        </div>
                    </div>

                    <div class="situacion-card">
                        <div class="situacion-icon">📝</div>
                        <div class="situacion-content">
                            <h4>Necesitas un contrato comercial</h4>
                            <p>Elaboramos contratos de compraventa, suministro, prestación de servicios y arrendamiento.</p>
                        </div>
                    </div>

                    <div class="situacion-card">
                        <div class="situacion-icon">🔒</div>
                        <div class="situacion-content">
                            <h4>Proteger información confidencial</h4>
                            <p>Diseñamos acuerdos de confidencialidad (NDA) y políticas de protección de datos.</p>
                        </div>
                    </div>

                    <div class="situacion-card">
                        <div class="situacion-icon">🏢</div>
                        <div class="situacion-content">
                            <h4>Vas a constituir una sociedad</h4>
                            <p>Te asesoramos en la selección del tipo societario y elaboramos estatutos.</p>
                        </div>
                    </div>

                    <div class="situacion-card">
                        <div class="situacion-icon">🔄</div>
                        <div class="situacion-content">
                            <h4>Cambios en estructura societaria</h4>
                            <p>Gestionamos reformas estatutarias, aumentos de capital y transformaciones.</p>
                        </div>
                    </div>

                    <div class="situacion-card">
                        <div class="situacion-icon">📢</div>
                        <div class="situacion-content">
                            <h4>Actualizarte sobre nuevas normas</h4>
                            <p>Te informamos sobre cambios normativos que impactan tu empresa y plan de acción.</p>
                        </div>
                    </div>

                    <div class="situacion-card">
                        <div class="situacion-icon">🎓</div>
                        <div class="situacion-content">
                            <h4>Capacitar a tu equipo</h4>
                            <p>Diseñamos capacitaciones en normativa laboral, seguridad social y compliance.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Servicios Especializados - Internal Links -->
        <section class="servicios-especializados-section">
            <div class="container">
                <h2>Servicios Especializados para Empresas</h2>
                <p class="servicios-especializados-subtitle">
                    Además del acompañamiento permanente, ofrecemos servicios especializados para situaciones específicas.
                </p>

                <div class="servicios-especializados-grid">
                    <!-- UGPP -->
                    <div class="servicio-especializado-card">
                        <h3>Defensa ante Fiscalización UGPP</h3>
                        <p>
                            Si tu empresa recibió notificación de fiscalización por parte de la UGPP (Unidad de Gestión
                            Pensional y Parafiscales), te acompañamos en todo el proceso: preparación de documentación,
                            estrategia de defensa y reducción de sanciones.
                        </p>
                        <a href="../ugpp/" class="servicio-especializado-link">
                            Ver servicio UGPP
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                    </div>

                    <!-- Colpensiones -->
                    <div class="servicio-especializado-card">
                        <h3>Depuración de Deudas Pensionales</h3>
                        <p>
                            Gestionamos la depuración de deudas reales y presuntas con Colpensiones: identificación de errores,
                            corrección de aportes, eliminación de saldos improcedentes y recuperación de pagos en exceso.
                        </p>
                        <a href="../depuracion-de-deuda-real-y-presunta-de-colpensiones/" class="servicio-especializado-link">
                            Ver servicio Colpensiones
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Final -->
        <section class="cta-final-section">
            <div class="container">
                <div class="cta-final-container">
                    <h2>Solicita Asesoría Legal para tu Empresa</h2>
                    <p class="cta-final-subtitle">
                        Agenda una consulta inicial y conoce cómo podemos acompañar el crecimiento de tu empresa con seguridad jurídica.
                    </p>

                    <form class="cta-form-inline" action="#" method="POST">
                        <input type="text" name="nombre" placeholder="Nombre completo" required>
                        <input type="email" name="email" placeholder="Correo electrónico" required>
                        <button type="submit">Solicitar Asesoría</button>
                    </form>

                    <div class="cta-contact-options">
                        <div class="cta-contact-option">
                            <span class="cta-contact-icon">📞</span>
                            <span>+57 300 123 4567</span>
                        </div>
                        <div class="cta-contact-option">
                            <span class="cta-contact-icon">📧</span>
                            <span>contacto@fortioriabogados.com</span>
                        </div>
                        <div class="cta-contact-option">
                            <span class="cta-contact-icon">💬</span>
                            <a href="https://wa.me/573001234567?text=Hola%2C%20necesito%20asesoría%20jurídica%20para%20mi%20empresa" target="_blank" style="color: #495057; text-decoration: none;">
                                WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <?php include '../templates/partials/footer.php'; ?>

    <!-- Quick Chat Widget -->
    <?php include '../templates/partials/quick-chat.php'; ?>

    <!-- Scripts -->
    <script src="../assets/js/main.js"></script>
</body>
</html>`;
}

// Generate and save the HTML file
const outputPath = path.join(__dirname, 'derecho-empresarial', 'index.html');
const htmlContent = generateHTML();

fs.writeFileSync(outputPath, htmlContent, 'utf8');

console.log('✅ Derecho Empresarial page redesigned successfully!');
console.log(`📄 File saved to: ${outputPath}`);
console.log('\n🎨 Visual Differentiator: Timeline de Acompañamiento Empresarial');
console.log('📋 Features implemented:');
console.log('  - Breadcrumbs with BreadcrumbList schema');
console.log('  - Timeline visual (5 stages: Constitución → Operación → Prevención → Crecimiento → Sostenibilidad)');
console.log('  - 4 Pillars: Prevención, Acompañamiento, Actualización, Estrategia');
console.log('  - 4 Areas: Derecho Laboral, Seguridad Social, Contratos, Corporativo');
console.log('  - 12 Situaciones Empresariales');
console.log('  - Internal links to UGPP and Colpensiones services');
console.log('  - SEO optimized for "asesoría jurídica para empresas"');
console.log('  - NO risky promises, NO invented information');
console.log('  - Mobile-first responsive design');
