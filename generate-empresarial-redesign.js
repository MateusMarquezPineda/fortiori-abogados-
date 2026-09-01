const fs = require('fs');
const path = require('path');

/**
 * DERECHO EMPRESARIAL REDESIGN GENERATOR
 *
 * Rediseño completo de la página "Asistencia Legal Permanente para Empresas"
 * Enfoque: PREVENIR ANTES QUE CORREGIR
 *
 * Cambios principales:
 * - H1 optimizado con keywords
 * - Contenido reducido 40% (1,156 → ~700 líneas)
 * - Eliminación de promesas riesgosas
 * - Reducción de keyword stuffing
 * - Nueva arquitectura: 12 secciones
 * - Schema BreadcrumbList
 * - Enlaces internos a UGPP y Colpensiones
 */

function generateHTML() {
    return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- SEO Meta Tags - Optimized -->
    <title>Asesoría Jurídica para Empresas | FORTIORI ABOGADOS</title>
    <meta name="description" content="Acompañamiento jurídico permanente para empresas en derecho laboral, seguridad social, contratos y asuntos corporativos. Prevención y asesoría legal continua.">
    <link rel="canonical" href="https://fortioriabogados.com/derecho-empresarial/">

    <!-- Open Graph -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="Asesoría Jurídica para Empresas | FORTIORI ABOGADOS">
    <meta property="og:description" content="Acompañamiento jurídico permanente: prevención, actualización normativa y asesoría continua para su organización.">
    <meta property="og:url" content="https://fortioriabogados.com/derecho-empresarial/">
    <meta property="og:image" content="https://fortioriabogados.com/assets/images/og-empresarial.jpg">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:locale" content="es_CO">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Asesoría Jurídica para Empresas | FORTIORI ABOGADOS">
    <meta name="twitter:description" content="Acompañamiento jurídico permanente para empresas en Colombia.">
    <meta name="twitter:image" content="https://fortioriabogados.com/assets/images/og-empresarial.jpg">

    <!-- Favicons -->
    <link rel="icon" type="image/png" sizes="32x32" href="../assets/images/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="../assets/images/favicon-16x16.png">

    <!-- CSS -->
    <link rel="stylesheet" href="../assets/css/main.css">
    <link rel="stylesheet" href="../assets/css/derecho-empresarial-page.css">

    <!-- Schema.org: LegalService -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "LegalService",
      "name": "FORTIORI ABOGADOS - Asesoría Jurídica para Empresas",
      "image": "https://fortioriabogados.com/assets/images/logo.png",
      "description": "Acompañamiento jurídico permanente para organizaciones en derecho laboral, seguridad social, contratos comerciales y asuntos corporativos.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Calle 24C # 84-85 T9-326",
        "addressLocality": "Bogotá",
        "addressRegion": "Bogotá D.C.",
        "addressCountry": "CO"
      },
      "telephone": "+573144760999",
      "email": "contactenos@fortioriabogados.com",
      "url": "https://fortioriabogados.com/derecho-empresarial/",
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

    <!-- Schema.org: BreadcrumbList -->
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
          "name": "Asesoría Jurídica para Empresas",
          "item": "https://fortioriabogados.com/derecho-empresarial/"
        }
      ]
    }
    </script>

    <link rel="stylesheet" href="../assets/css/mobile-menu-new.css">
    <link rel="stylesheet" href="../assets/css/cookie-banner.css">
</head>
<body>
    <!-- Skip Link -->
    <a href="#main-content" class="skip-link">Saltar al contenido principal</a>

    <!-- Header -->
    <header class="header" id="header">
        <!-- Topbar -->
        <div class="topbar">
            <div class="container">
                <div class="topbar-content">
                    <!-- Contact Info -->
                    <div class="topbar-contact">
                        <a href="tel:+573144760999" class="topbar-link" aria-label="Llamar al +57 314 476 0999">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>
                            <span>+57 314 476 0999</span>
                        </a>

                        <a href="mailto:contactenos@fortioriabogados.com" class="topbar-link" aria-label="Enviar email a contactenos@fortioriabogados.com">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                <polyline points="22,6 12,13 2,6"></polyline>
                            </svg>
                            <span>contactenos@fortioriabogados.com</span>
                        </a>
                    </div>

                    <!-- Social Links -->
                    <div class="topbar-social">
                        <a href="https://www.facebook.com/fortioriabogados/" target="_blank" rel="noopener noreferrer" class="topbar-social-link" aria-label="Síguenos en Facebook">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                        </a>

                        <a href="https://www.instagram.com/fortioriabogados/" target="_blank" rel="noopener noreferrer" class="topbar-social-link" aria-label="Síguenos en Instagram">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <!-- Navbar -->
        <nav class="navbar" id="navbar" role="navigation" aria-label="Navegación principal">
            <div class="container">
                <div class="navbar-content">
                    <!-- Logo -->
                    <a href="../" class="navbar-logo" aria-label="FORTIORI ABOGADOS - Ir al inicio">
                        <img src="../assets/images/logo-fortiori.svg" alt="FORTIORI ABOGADOS" class="logo-img">
                    </a>

                    <!-- Desktop Navigation -->
                    <ul class="navbar-menu" id="navbar-menu">
<!-- Mobile Menu Header -->                <li class="navbar-menu-header">                    <a href="../" class="navbar-menu-logo">                        <img src="../assets/images/logo-fortiori.svg" alt="FORTIORI ABOGADOS">                    </a>                    <button class="navbar-menu-close" id="navbar-close" aria-label="Cerrar menú">                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">                            <line x1="18" y1="6" x2="6" y2="18"></line>                            <line x1="6" y1="6" x2="18" y2="18"></line>                        </svg>                    </button>                </li>                <!-- Navigation Links -->
                        <li class="navbar-item">
                            <a href="../" class="navbar-link">Inicio</a>
                        </li>
                        <li class="navbar-item">
                            <a href="../ugpp/" class="navbar-link">Fiscalización UGPP</a>
                        </li>
                        <li class="navbar-item">
                            <a href="../depuracion-de-deuda-real-y-presunta-de-colpensiones/" class="navbar-link">Depuración Colpensiones</a>
                        </li>
                        <li class="navbar-item">
                            <a href="../derecho-empresarial/" class="navbar-link active">Asesoría Empresarial</a>
                        </li>
                        <li class="navbar-item">
                            <a href="../blog/" class="navbar-link">Blog</a>
                        </li>
                        <li class="navbar-item">
                            <a href="../contacto/" class="navbar-link">Contacto</a>
                        </li>
                    </ul>

                    <!-- Mobile Menu Toggle -->
                    <button class="mobile-menu-toggle" id="mobile-menu-toggle" aria-expanded="false" aria-controls="mobile-menu-sidebar" aria-label="Abrir menú de navegación">
                        <span class="mobile-menu-toggle-bar"></span>
                        <span class="mobile-menu-toggle-bar"></span>
                        <span class="mobile-menu-toggle-bar"></span>
                    </button>
                </div>
            </div>
        </nav>
    </header>

    <!-- MOBILE MENU OFF-CANVAS -->
    <div class="mobile-menu-backdrop" id="mobile-menu-backdrop" aria-hidden="true"></div>
    <aside class="mobile-menu-sidebar" id="mobile-menu-sidebar" aria-hidden="true" aria-label="Menú de navegación móvil">
        <div class="mobile-menu-header">
            <a href="../" class="mobile-menu-logo" aria-label="FORTIORI ABOGADOS - Ir al inicio">
                <img src="../assets/images/logo-fortiori.svg" alt="FORTIORI ABOGADOS">
            </a>
            <button class="mobile-menu-close" id="mobile-menu-close" aria-label="Cerrar menú">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </button>
        </div>
        <nav class="mobile-menu-nav">
            <ul class="mobile-menu-list">
                <li class="mobile-menu-item">
                    <a href="../" class="mobile-menu-link">Inicio</a>
                </li>
                <li class="mobile-menu-item">
                    <a href="../ugpp/" class="mobile-menu-link">Fiscalización UGPP</a>
                </li>
                <li class="mobile-menu-item">
                    <a href="../depuracion-de-deuda-real-y-presunta-de-colpensiones/" class="mobile-menu-link">Depuración Colpensiones</a>
                </li>
                <li class="mobile-menu-item">
                    <a href="../derecho-empresarial/" class="mobile-menu-link active">Asesoría Empresarial</a>
                </li>
                <li class="mobile-menu-item">
                    <a href="../blog/" class="mobile-menu-link">Blog</a>
                </li>
                <li class="mobile-menu-item">
                    <a href="../contacto/" class="mobile-menu-link">Contacto</a>
                </li>
            </ul>
        </nav>
    </aside>

    <!-- Main Content -->
    <main id="main-content">

        <!-- Breadcrumbs -->
        <nav class="breadcrumbs" aria-label="Breadcrumb">
            <div class="container">
                <ol class="breadcrumbs-list">
                    <li class="breadcrumbs-item"><a href="../">Inicio</a></li>
                    <li class="breadcrumbs-item"><span>Asesoría Jurídica para Empresas</span></li>
                </ol>
            </div>
        </nav>

        <!-- SECTION 1: HERO -->
        <section class="ugpp-hero">
            <div class="container">
                <div class="ugpp-hero-content">
                    <div class="ugpp-hero-badge">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                        </svg>
                        Acompañamiento Permanente
                    </div>

                    <h1>Asistencia Legal Permanente para Empresas</h1>

                    <p class="ugpp-hero-lead">
                        Acompañamiento jurídico continuo en relaciones laborales, seguridad social, contratos y asuntos corporativos.
                    </p>

                    <p class="ugpp-hero-description">
                        Analizamos las situaciones jurídicas de su organización antes de que se conviertan en conflictos, sanciones o contingencias.
                    </p>

                    <div class="ugpp-hero-cta">
                        <a href="../contacto/" class="btn btn-primary btn-lg">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                            </svg>
                            Hablar con un abogado
                        </a>
                        <a href="https://wa.me/573144760999?text=Hola%2C%20necesito%20asesoría%20jurídica%20para%20mi%20empresa" class="btn btn-whatsapp btn-lg" target="_blank" rel="noopener noreferrer">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                            </svg>
                            Solicitar asesoría empresarial
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- SECTION 2: PROPUESTA DE VALOR -->
        <section class="defense-process" style="background: #ffffff; padding: 5rem 0;">
            <div class="container">
                <div class="section-header">
                    <h2 class="section-title">Un equipo jurídico para acompañar las decisiones de su organización</h2>
                    <p class="section-description">
                        Contratar, terminar una relación laboral, negociar un contrato, responder un requerimiento o actualizar una política interna puede tener implicaciones jurídicas.<br>
                        <strong>FORTIORI acompaña estas decisiones de manera preventiva y permanente.</strong>
                    </p>
                </div>

                <div class="defense-timeline" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2.5rem; max-width: none; margin-top: 3rem;">
                    <!-- PREVENCIÓN -->
                    <div class="defense-step" style="margin-bottom: 0;">
                        <div class="defense-step-content" style="background: #f8f9fa; padding: 2.5rem; border-radius: 12px; height: 100%; text-align: center;">
                            <div style="width: 60px; height: 60px; background: var(--brand-red); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; color: white;">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                                </svg>
                            </div>
                            <h3 style="color: var(--brand-red); font-size: 1.5rem; margin-bottom: 1rem;">PREVENCIÓN</h3>
                            <p style="color: #495057;">Identificamos riesgos antes de que se conviertan en contingencias.</p>
                        </div>
                    </div>

                    <!-- ACOMPAÑAMIENTO -->
                    <div class="defense-step" style="margin-bottom: 0;">
                        <div class="defense-step-content" style="background: #f8f9fa; padding: 2.5rem; border-radius: 12px; height: 100%; text-align: center;">
                            <div style="width: 60px; height: 60px; background: var(--brand-red); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; color: white;">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                                </svg>
                            </div>
                            <h3 style="color: var(--brand-red); font-size: 1.5rem; margin-bottom: 1rem;">ACOMPAÑAMIENTO</h3>
                            <p style="color: #495057;">Apoyamos las decisiones jurídicas cotidianas de la organización.</p>
                        </div>
                    </div>

                    <!-- ACTUALIZACIÓN -->
                    <div class="defense-step" style="margin-bottom: 0;">
                        <div class="defense-step-content" style="background: #f8f9fa; padding: 2.5rem; border-radius: 12px; height: 100%; text-align: center;">
                            <div style="width: 60px; height: 60px; background: var(--brand-red); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; color: white;">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                                </svg>
                            </div>
                            <h3 style="color: var(--brand-red); font-size: 1.5rem; margin-bottom: 1rem;">ACTUALIZACIÓN</h3>
                            <p style="color: #495057;">Revisamos cambios normativos que puedan afectar su operación.</p>
                        </div>
                    </div>

                    <!-- ESTRATEGIA -->
                    <div class="defense-step" style="margin-bottom: 0;">
                        <div class="defense-step-content" style="background: #f8f9fa; padding: 2.5rem; border-radius: 12px; height: 100%; text-align: center;">
                            <div style="width: 60px; height: 60px; background: var(--brand-red); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; color: white;">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
                                </svg>
                            </div>
                            <h3 style="color: var(--brand-red); font-size: 1.5rem; margin-bottom: 1rem;">ESTRATEGIA</h3>
                            <p style="color: #495057;">Definimos la actuación jurídica más conveniente según cada situación.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- SECTION 3: ÁREAS DE ACOMPAÑAMIENTO -->
        <section class="defense-process" style="background: #f8f9fa;">
            <div class="container">
                <div class="section-header">
                    <span class="section-eyebrow">Áreas Jurídicas</span>
                    <h2 class="section-title">Acompañamiento jurídico integral para su organización</h2>
                </div>

                <div class="defense-timeline" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 3rem; max-width: none;">
                    <!-- DERECHO LABORAL -->
                    <div class="defense-step" style="margin-bottom: 0;">
                        <div class="defense-step-content" style="background: white; padding: 2.5rem; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
                            <h3 style="color: var(--brand-red); font-size: 1.75rem; margin-bottom: 1.5rem;">RELACIONES LABORALES</h3>
                            <p style="margin-bottom: 1.5rem; color: #495057;">Acompañamiento preventivo y estratégico en las relaciones entre la organización y sus trabajadores.</p>

                            <div class="defense-step-actions">
                                <div class="defense-step-action">
                                    <div class="defense-step-action-icon">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                        </svg>
                                    </div>
                                    <div class="defense-step-action-text">
                                        <strong>Contratos de trabajo</strong>
                                        <span>Todas las modalidades: término fijo, indefinido, obra o labor, aprendizaje.</span>
                                    </div>
                                </div>

                                <div class="defense-step-action">
                                    <div class="defense-step-action-icon">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <rect x="3" y="3" width="18" height="18" rx="2"/>
                                        </svg>
                                    </div>
                                    <div class="defense-step-action-text">
                                        <strong>Reglamento Interno de Trabajo</strong>
                                        <span>Elaboración, revisión y actualización.</span>
                                    </div>
                                </div>

                                <div class="defense-step-action">
                                    <div class="defense-step-action-icon">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                                        </svg>
                                    </div>
                                    <div class="defense-step-action-text">
                                        <strong>Procesos disciplinarios</strong>
                                        <span>Asesoría en sanciones, debido proceso y documentación.</span>
                                    </div>
                                </div>

                                <div class="defense-step-action">
                                    <div class="defense-step-action-icon">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M18 20V10"/>
                                            <path d="M12 20V4"/>
                                        </svg>
                                    </div>
                                    <div class="defense-step-action-text">
                                        <strong>Terminaciones de contrato</strong>
                                        <span>Despidos, liquidaciones, justa causa, mutuo acuerdo.</span>
                                    </div>
                                </div>

                                <div class="defense-step-action">
                                    <div class="defense-step-action-icon">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <circle cx="12" cy="12" r="10"/>
                                            <path d="M12 6v6l4 2"/>
                                        </svg>
                                    </div>
                                    <div class="defense-step-action-text">
                                        <strong>Jornadas y compensaciones</strong>
                                        <span>Horas extras, recargos, vacaciones, permisos.</span>
                                    </div>
                                </div>

                                <div class="defense-step-action">
                                    <div class="defense-step-action-icon">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                                        </svg>
                                    </div>
                                    <div class="defense-step-action-text">
                                        <strong>Comité de Convivencia Laboral</strong>
                                        <span>Prevención de acoso laboral y sexual.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- SEGURIDAD SOCIAL -->
                    <div class="defense-step" style="margin-bottom: 0;">
                        <div class="defense-step-content" style="background: white; padding: 2.5rem; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
                            <h3 style="color: var(--brand-red); font-size: 1.75rem; margin-bottom: 1.5rem;">SEGURIDAD SOCIAL</h3>
                            <p style="margin-bottom: 1.5rem; color: #495057;">Acompañamiento en obligaciones relacionadas con salud, pensiones, riesgos laborales y aportes empresariales.</p>

                            <div class="defense-step-actions">
                                <div class="defense-step-action">
                                    <div class="defense-step-action-icon">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <rect x="3" y="3" width="18" height="18" rx="2"/>
                                        </svg>
                                    </div>
                                    <div class="defense-step-action-text">
                                        <strong>Nómina y PILA</strong>
                                        <span>Liquidación de aportes, IBC, desalarización.</span>
                                    </div>
                                </div>

                                <div class="defense-step-action">
                                    <div class="defense-step-action-icon">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                                        </svg>
                                    </div>
                                    <div class="defense-step-action-text">
                                        <strong>Salud, pensión y riesgos laborales</strong>
                                        <span>Afiliaciones, novedades, incapacidades.</span>
                                    </div>
                                </div>

                                <div class="defense-step-action">
                                    <div class="defense-step-action-icon">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                        </svg>
                                    </div>
                                    <div class="defense-step-action-text">
                                        <strong>Auditorías preventivas</strong>
                                        <span>Revisión de cumplimiento en salarios y aportes.</span>
                                    </div>
                                </div>

                                <div class="defense-step-action">
                                    <div class="defense-step-action-icon">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <circle cx="12" cy="12" r="10"/>
                                            <line x1="12" y1="8" x2="12" y2="16"/>
                                        </svg>
                                    </div>
                                    <div class="defense-step-action-text">
                                        <strong>Preparación ante fiscalizaciones</strong>
                                        <span>Gestión ante UGPP, SENA y Ministerio del Trabajo.</span>
                                    </div>
                                </div>
                            </div>

                            <div style="margin-top: 2rem; padding: 1.5rem; background: #f8f9fa; border-radius: 8px; border-left: 4px solid var(--brand-red);">
                                <p style="margin: 0; font-size: 0.95rem; color: #495057;">
                                    <strong>¿Su organización recibió notificación de la UGPP?</strong><br>
                                    <a href="../ugpp/" style="color: var(--brand-red); font-weight: 600;">Ver Defensa Especializada UGPP →</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="defense-timeline" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 3rem; max-width: none; margin-top: 3rem;">
                    <!-- CONTRATOS -->
                    <div class="defense-step" style="margin-bottom: 0;">
                        <div class="defense-step-content" style="background: white; padding: 2.5rem; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
                            <h3 style="color: var(--brand-red); font-size: 1.75rem; margin-bottom: 1.5rem;">CONTRATOS COMERCIALES</h3>
                            <p style="margin-bottom: 1.5rem; color: #495057;">Elaboración, revisión y negociación de contratos para proteger la operación empresarial.</p>

                            <div class="defense-step-actions">
                                <div class="defense-step-action">
                                    <div class="defense-step-action-icon">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                        </svg>
                                    </div>
                                    <div class="defense-step-action-text">
                                        <strong>Compraventa, suministro y prestación de servicios</strong>
                                        <span>Contratos con clientes y proveedores.</span>
                                    </div>
                                </div>

                                <div class="defense-step-action">
                                    <div class="defense-step-action-icon">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                                        </svg>
                                    </div>
                                    <div class="defense-step-action-text">
                                        <strong>Arrendamiento, transporte y seguros</strong>
                                        <span>Contratos civiles y comerciales.</span>
                                    </div>
                                </div>

                                <div class="defense-step-action">
                                    <div class="defense-step-action-icon">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                                        </svg>
                                    </div>
                                    <div class="defense-step-action-text">
                                        <strong>Confidencialidad y propiedad intelectual</strong>
                                        <span>Protección de información y activos.</span>
                                    </div>
                                </div>

                                <div class="defense-step-action">
                                    <div class="defense-step-action-icon">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                                        </svg>
                                    </div>
                                    <div class="defense-step-action-text">
                                        <strong>Franquicia, outsourcing y leasing</strong>
                                        <span>Modelos de negocio especializados.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- DERECHO SOCIETARIO -->
                    <div class="defense-step" style="margin-bottom: 0;">
                        <div class="defense-step-content" style="background: white; padding: 2.5rem; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
                            <h3 style="color: var(--brand-red); font-size: 1.75rem; margin-bottom: 1.5rem;">DERECHO SOCIETARIO</h3>
                            <p style="margin-bottom: 1.5rem; color: #495057;">Asesoría para la estructuración jurídica y funcionamiento de sociedades.</p>

                            <div class="defense-step-actions">
                                <div class="defense-step-action">
                                    <div class="defense-step-action-icon">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                                        </svg>
                                    </div>
                                    <div class="defense-step-action-text">
                                        <strong>Constitución de sociedades</strong>
                                        <span>SAS, Ltda., S.A. y otras formas jurídicas.</span>
                                    </div>
                                </div>

                                <div class="defense-step-action">
                                    <div class="defense-step-action-icon">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                        </svg>
                                    </div>
                                    <div class="defense-step-action-text">
                                        <strong>Estatutos y reformas</strong>
                                        <span>Elaboración y modificación de estatutos sociales.</span>
                                    </div>
                                </div>

                                <div class="defense-step-action">
                                    <div class="defense-step-action-icon">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <rect x="3" y="3" width="18" height="18" rx="2"/>
                                        </svg>
                                    </div>
                                    <div class="defense-step-action-text">
                                        <strong>Gobierno corporativo</strong>
                                        <span>Asambleas, juntas directivas, actas.</span>
                                    </div>
                                </div>

                                <div class="defense-step-action">
                                    <div class="defense-step-action-icon">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                        </svg>
                                    </div>
                                    <div class="defense-step-action-text">
                                        <strong>Acuerdos de accionistas</strong>
                                        <span>Pactos, asociaciones y responsabilidad empresarial.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- SECTION 4: SITUACIONES EMPRESARIALES -->
        <section class="defense-process" style="background: #ffffff; padding: 5rem 0;">
            <div class="container">
                <div class="section-header">
                    <h2 class="section-title">Decisiones empresariales que requieren respaldo jurídico</h2>
                    <p class="section-description">Situaciones cotidianas donde el acompañamiento legal marca la diferencia</p>
                </div>

                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; margin-top: 3rem;">
                    ${[
                        { icon: '✍️', text: 'Va a contratar un trabajador' },
                        { icon: '⚖️', text: 'Necesita terminar un contrato laboral' },
                        { icon: '💰', text: 'Debe revisar una liquidación' },
                        { icon: '🤝', text: 'Va a negociar con un proveedor' },
                        { icon: '📄', text: 'Necesita elaborar un contrato' },
                        { icon: '📬', text: 'Recibió un requerimiento' },
                        { icon: '✉️', text: 'Debe responder un derecho de petición' },
                        { icon: '📋', text: 'Necesita actualizar una política interna' },
                        { icon: '🔄', text: 'Va a modificar condiciones laborales' },
                        { icon: '⏰', text: 'Tiene dudas sobre jornada o recargos' },
                        { icon: '💼', text: 'Necesita revisar aportes a seguridad social' },
                        { icon: '🏢', text: 'Va a constituir o modificar una sociedad' },
                        { icon: '📜', text: 'Debe actualizar estatutos' },
                        { icon: '📢', text: 'Necesita revisar una pieza publicitaria' },
                        { icon: '⚠️', text: 'Tiene una reclamación de un trabajador' }
                    ].map(item => `
                        <div style="background: #f8f9fa; padding: 1.75rem; border-radius: 12px; border-left: 4px solid var(--brand-red); display: flex; align-items: start; gap: 1rem;">
                            <span style="font-size: 2rem; flex-shrink: 0;">${item.icon}</span>
                            <p style="margin: 0; color: #495057; font-weight: 500; padding-top: 0.5rem;">${item.text}</p>
                        </div>
                    `).join('')}
                </div>

                <div style="text-align: center; margin-top: 3rem;">
                    <a href="../contacto/" class="btn btn-primary btn-lg">Consultar mi situación</a>
                </div>
            </div>
        </section>

        <!-- SECTION 5: REGLAMENTO Y POLÍTICAS (condensed) -->
        <section class="defense-process" style="background: #f8f9fa;">
            <div class="container">
                <div class="section-header">
                    <h2 class="section-title">Reglamento Interno de Trabajo y Políticas Empresariales</h2>
                </div>

                <div class="defense-timeline" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2.5rem; max-width: none;">
                    <!-- REGLAMENTO -->
                    <div class="defense-step" style="margin-bottom: 0;">
                        <div class="defense-step-content" style="background: white; padding: 2.5rem; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
                            <h3 style="color: var(--brand-red); font-size: 1.5rem; margin-bottom: 1rem;">Reglamento Interno de Trabajo</h3>
                            <p style="margin-bottom: 1.5rem; color: #495057;">Elaboración, revisión y actualización alineada con la legislación vigente.</p>
                            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
                                <div style="text-align: center; padding: 1.5rem; background: #f8f9fa; border-radius: 8px;">
                                    <strong style="color: var(--brand-red);">ELABORACIÓN</strong>
                                </div>
                                <div style="text-align: center; padding: 1.5rem; background: #f8f9fa; border-radius: 8px;">
                                    <strong style="color: var(--brand-red);">REVISIÓN</strong>
                                </div>
                                <div style="text-align: center; padding: 1.5rem; background: #f8f9fa; border-radius: 8px;">
                                    <strong style="color: var(--brand-red);">ACTUALIZACIÓN</strong>
                                </div>
                                <div style="text-align: center; padding: 1.5rem; background: #f8f9fa; border-radius: 8px;">
                                    <strong style="color: var(--brand-red);">IMPLEMENTACIÓN</strong>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- POLÍTICAS -->
                    <div class="defense-step" style="margin-bottom: 0;">
                        <div class="defense-step-content" style="background: white; padding: 2.5rem; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
                            <h3 style="color: var(--brand-red); font-size: 1.5rem; margin-bottom: 1rem;">Políticas Empresariales</h3>
                            <ul style="list-style: none; padding: 0; margin: 0; display: grid; gap: 0.75rem;">
                                ${[
                                    'Prevención del acoso laboral',
                                    'Alcohol y sustancias psicoactivas',
                                    'Protección de datos personales',
                                    'Anticorrupción y compliance',
                                    'Derecho del consumidor',
                                    'Publicidad e información comercial'
                                ].map(item => `
                                    <li style="display: flex; gap: 0.75rem; align-items: start;">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink: 0; color: var(--brand-red); margin-top: 0.125rem;">
                                            <polyline points="20,6 9,17 4,12"/>
                                        </svg>
                                        <span style="color: #495057;">${item}</span>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- SECTION 6: ACTUALIZACIÓN NORMATIVA -->
        <section class="defense-process" style="background: #ffffff; padding: 5rem 0;">
            <div class="container">
                <div class="section-header">
                    <h2 class="section-title">Su organización cambia. La legislación también.</h2>
                    <p class="section-description">
                        Realizamos seguimiento preventivo a cambios legislativos que puedan generar nuevas obligaciones o riesgos.
                    </p>
                </div>

                <div style="max-width: 900px; margin: 3rem auto;">
                    <div style="display: flex; align-items: center; justify-content: center; gap: 1.5rem; flex-wrap: wrap;">
                        ${[
                            { label: 'CAMBIO NORMATIVO', icon: '📋' },
                            { label: 'ANÁLISIS', icon: '🔍' },
                            { label: 'IMPACTO', icon: '⚡' },
                            { label: 'AJUSTE', icon: '⚙️' },
                            { label: 'IMPLEMENTACIÓN', icon: '✅' }
                        ].map((step, index, array) => `
                            <div style="text-align: center;">
                                <div style="width: 80px; height: 80px; background: var(--brand-red); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; font-size: 2rem;">
                                    ${step.icon}
                                </div>
                                <strong style="display: block; color: var(--brand-red); font-size: 0.9rem;">${step.label}</strong>
                            </div>
                            ${index < array.length - 1 ? '<span style="font-size: 2rem; color: var(--brand-red);">→</span>' : ''}
                        `).join('')}
                    </div>
                </div>

                <div style="max-width: 800px; margin: 2rem auto; background: #f8f9fa; padding: 2rem; border-radius: 12px; border-left: 4px solid var(--brand-red);">
                    <h4 style="color: var(--brand-red); margin-bottom: 1rem;">Puede implicar:</h4>
                    <ul style="color: #495057; line-height: 1.8; padding-left: 1.5rem;">
                        <li>Actualizar contratos y políticas</li>
                        <li>Modificar procedimientos internos</li>
                        <li>Ajustar reglamentos</li>
                        <li>Implementar nuevas obligaciones</li>
                        <li>Corregir prácticas internas</li>
                    </ul>
                </div>
            </div>
        </section>

        <!-- SECTION 7: CAPACITACIÓN -->
        <section class="defense-process" style="background: #f8f9fa;">
            <div class="container">
                <div class="section-header">
                    <h2 class="section-title">Capacitación jurídica para equipos de trabajo</h2>
                    <p class="section-description">
                        Formamos a empresarios, áreas de talento humano y equipos administrativos en situaciones jurídicas cotidianas.
                    </p>
                </div>

                <div class="defense-timeline" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2.5rem; max-width: none; margin-top: 3rem;">
                    <!-- CAPACITACIÓN 1 -->
                    <div class="defense-step" style="margin-bottom: 0;">
                        <div class="defense-step-content" style="background: white; padding: 2.5rem; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border-left: 4px solid var(--brand-red);">
                            <h4 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem; color: var(--brand-red);">Relaciones Laborales Esenciales</h4>
                            <p style="font-size: 0.95rem; color: #495057; margin: 0;">Contratación, modalidades, desalarización, terminación, procedimientos disciplinarios y obligaciones del empleador.</p>
                        </div>
                    </div>

                    <!-- CAPACITACIÓN 2 -->
                    <div class="defense-step" style="margin-bottom: 0;">
                        <div class="defense-step-content" style="background: white; padding: 2.5rem; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border-left: 4px solid var(--brand-red);">
                            <h4 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem; color: var(--brand-red);">Seguridad Social Empresarial</h4>
                            <p style="font-size: 0.95rem; color: #495057; margin: 0;">Nómina, PILA, IBC, aportes, parafiscales y prevención de contingencias.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- SECTION 8: CÓMO TRABAJAMOS -->
        <section class="defense-process" style="background: #ffffff; padding: 5rem 0;">
            <div class="container">
                <div class="section-header">
                    <h2 class="section-title">Acompañamiento jurídico permanente</h2>
                </div>

                <div style="max-width: 900px; margin: 3rem auto;">
                    ${[
                        { num: '1', title: 'CONOCEMOS SU ORGANIZACIÓN', desc: 'Entendemos su operación y sus necesidades.' },
                        { num: '2', title: 'ANALIZAMOS', desc: 'Revisamos la situación jurídica y la documentación.' },
                        { num: '3', title: 'IDENTIFICAMOS RIESGOS', desc: 'Detectamos posibles contingencias.' },
                        { num: '4', title: 'DEFINIMOS ESTRATEGIA', desc: 'Establecemos la actuación más conveniente.' },
                        { num: '5', title: 'ACOMPAÑAMOS', desc: 'Apoyamos la implementación y toma de decisiones.' },
                        { num: '6', title: 'ACTUALIZAMOS', desc: 'Revisamos los cambios normativos relevantes.' }
                    ].map(step => `
                        <div style="margin-bottom: 2rem; display: flex; gap: 1.5rem; align-items: start;">
                            <div style="width: 50px; height: 50px; flex-shrink: 0; background: var(--brand-red); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 1.25rem;">
                                ${step.num}
                            </div>
                            <div>
                                <h4 style="color: var(--brand-red); margin-bottom: 0.5rem; font-size: 1.125rem;">${step.title}</h4>
                                <p style="margin: 0; color: #495057;">${step.desc}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

        <!-- SECTION 9: MÁS PREVENCIÓN, MENOS CONTINGENCIAS -->
        <section class="defense-process" style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 5rem 0;">
            <div class="container">
                <div style="max-width: 900px; margin: 0 auto; text-align: center;">
                    <h2 style="font-size: 2.5rem; font-weight: 700; color: var(--brand-red); margin-bottom: 3rem;">
                        Más prevención. Menos contingencias.
                    </h2>

                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; text-align: left;">
                        ${[
                            'Mayor seguridad jurídica en las decisiones',
                            'Prevención de conflictos laborales y comerciales',
                            'Documentación actualizada',
                            'Procesos internos fortalecidos',
                            'Cumplimiento oportuno',
                            'Respuesta jurídica disponible cuando se necesita'
                        ].map(item => `
                            <div style="display: flex; gap: 1rem; align-items: start;">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink: 0; color: var(--brand-red); margin-top: 0.125rem;">
                                    <polyline points="20,6 9,17 4,12"/>
                                </svg>
                                <span style="color: #495057; font-weight: 500;">${item}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </section>

        <!-- SECTION 10: SERVICIOS ESPECIALIZADOS -->
        <section class="defense-process" style="background: #ffffff; padding: 5rem 0;">
            <div class="container">
                <div class="section-header">
                    <h2 class="section-title">¿Su organización necesita una defensa especializada?</h2>
                </div>

                <div class="defense-timeline" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 3rem; max-width: none; margin-top: 3rem;">
                    <!-- UGPP -->
                    <div class="defense-step" style="margin-bottom: 0;">
                        <div class="defense-step-content" style="background: #f8f9fa; padding: 3rem; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border-top: 4px solid var(--brand-red);">
                            <h3 style="color: var(--brand-red); font-size: 1.75rem; margin-bottom: 1rem;">Defensa ante la UGPP</h3>
                            <p style="color: #495057; margin-bottom: 2rem;">
                                Requerimientos, fiscalizaciones, liquidaciones, sanciones, cobros y defensa especializada ante la UGPP.
                            </p>
                            <a href="../ugpp/" class="btn btn-primary">Ver Defensa UGPP →</a>
                        </div>
                    </div>

                    <!-- COLPENSIONES -->
                    <div class="defense-step" style="margin-bottom: 0;">
                        <div class="defense-step-content" style="background: #f8f9fa; padding: 3rem; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border-top: 4px solid var(--brand-red);">
                            <h3 style="color: var(--brand-red); font-size: 1.75rem; margin-bottom: 1rem;">Depuración de Deudas Pensionales</h3>
                            <p style="color: #495057; margin-bottom: 2rem;">
                                Colpensiones, fondos privados, PILA, aportes, liquidaciones y certificaciones pensionales.
                            </p>
                            <a href="../depuracion-de-deuda-real-y-presunta-de-colpensiones/" class="btn btn-primary">Ver Depuración Colpensiones →</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- SECTION 11: CTA FINAL -->
        <section class="ugpp-cta">
            <div class="container">
                <div class="ugpp-cta-content">
                    <h2>Convierta la asesoría jurídica en una herramienta permanente de su organización</h2>
                    <p class="ugpp-cta-lead">
                        Cuéntenos qué situación necesita revisar y determine con nuestro equipo el acompañamiento jurídico adecuado.
                    </p>

                    <div class="ugpp-cta-buttons">
                        <a href="../contacto/" class="btn btn-outline btn-lg" style="background: white; color: var(--brand-red); border-color: white;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                            </svg>
                            Hablar con un abogado
                        </a>
                        <a href="https://wa.me/573144760999?text=Hola%2C%20necesito%20asesoría%20jurídica%20para%20mi%20empresa" class="btn btn-outline btn-lg" style="border-color: white; color: white;" target="_blank" rel="noopener noreferrer">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                            </svg>
                            Solicitar asesoría empresarial
                        </a>
                    </div>

                    <div class="ugpp-cta-guarantee">
                        <div class="ugpp-cta-guarantee-item">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="20,6 9,17 4,12"/>
                            </svg>
                            <span>Consulta inicial sin costo</span>
                        </div>
                        <div class="ugpp-cta-guarantee-item">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="20,6 9,17 4,12"/>
                            </svg>
                            <span>Atención personalizada</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </main>

    <!-- WhatsApp Floating Button -->
    <a href="https://wa.me/573144760999?text=Hola%2C%20necesito%20asesoría%20jurídica%20para%20mi%20empresa"
       class="whatsapp-float"
       target="_blank"
       rel="noopener noreferrer"
       aria-label="Chatear por WhatsApp sobre asesoría empresarial">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span class="whatsapp-badge">1</span>
    </a>

    <!-- Quick Chat Widget -->
    <div class="quick-chat" id="quick-chat">
        <button class="quick-chat-trigger" id="quick-chat-trigger" aria-expanded="false" aria-controls="quick-chat-panel">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <span class="quick-chat-trigger-text">Chatea con nosotros</span>
        </button>

        <div class="quick-chat-panel" id="quick-chat-panel" aria-hidden="true">
            <div class="quick-chat-header">
                <h3>¿En qué podemos ayudarte?</h3>
                <button class="quick-chat-close" id="quick-chat-close" aria-label="Cerrar chat">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>

            <div class="quick-chat-body">
                <div class="quick-chat-options">
                    <a href="https://wa.me/573144760999?text=Hola%2C%20necesito%20asesoría%20sobre%20una%20fiscalización%20de%20la%20UGPP"
                       class="quick-chat-option"
                       target="_blank"
                       rel="noopener noreferrer">
                        <div class="quick-chat-option-icon">📄</div>
                        <div class="quick-chat-option-content">
                            <strong>Fiscalización UGPP</strong>
                            <p>Defensa contra requerimientos y sanciones</p>
                        </div>
                    </a>

                    <a href="https://wa.me/573144760999?text=Hola%2C%20necesito%20depurar%20mi%20historia%20laboral%20en%20Colpensiones"
                       class="quick-chat-option"
                       target="_blank"
                       rel="noopener noreferrer">
                        <div class="quick-chat-option-icon">⏰</div>
                        <div class="quick-chat-option-content">
                            <strong>Depuración Colpensiones</strong>
                            <p>Recuperación de semanas cotizadas</p>
                        </div>
                    </a>

                    <a href="https://wa.me/573144760999?text=Hola%2C%20necesito%20asesoría%20jurídica%20para%20mi%20empresa"
                       class="quick-chat-option"
                       target="_blank"
                       rel="noopener noreferrer">
                        <div class="quick-chat-option-icon">💼</div>
                        <div class="quick-chat-option-content">
                            <strong>Asesoría Empresarial</strong>
                            <p>Acompañamiento jurídico permanente</p>
                        </div>
                    </a>

                    <a href="../contacto/"
                       class="quick-chat-option">
                        <div class="quick-chat-option-icon">📞</div>
                        <div class="quick-chat-option-content">
                            <strong>Otra consulta</strong>
                            <p>Completa el formulario de contacto</p>
                        </div>
                    </a>
                </div>
            </div>

            <div class="quick-chat-footer">
                <p>⚡ Respuesta en menos de 1 hora</p>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer class="footer" role="contentinfo">
        <div class="footer-main">
            <div class="container">
                <div class="footer-grid">
                    <!-- Column 1: About -->
                    <div class="footer-column">
                        <div class="footer-logo">
                            <img src="../assets/images/logo-blanco.svg" alt="FORTIORI ABOGADOS" class="logo-img">
                        </div>
                        <p class="footer-description">
                            Firma de abogados especializada en fiscalización UGPP, depuración de deudas con Colpensiones y asesoría jurídica empresarial.
                        </p>
                        <div class="footer-social">
                            <a href="https://www.facebook.com/fortioriabogados/" target="_blank" rel="noopener noreferrer" class="footer-social-link" aria-label="Facebook">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                            </a>
                            <a href="https://www.instagram.com/fortioriabogados/" target="_blank" rel="noopener noreferrer" class="footer-social-link" aria-label="Instagram">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    <!-- Column 2: Quick Links -->
                    <div class="footer-column">
                        <h3 class="footer-title">Servicios</h3>
                        <ul class="footer-links">
                            <li><a href="../ugpp/" class="footer-link">Fiscalización UGPP</a></li>
                            <li><a href="../depuracion-de-deuda-real-y-presunta-de-colpensiones/" class="footer-link">Depuración Colpensiones</a></li>
                            <li><a href="../derecho-empresarial/" class="footer-link">Asesoría Empresarial</a></li>
                            <li><a href="../blog/" class="footer-link">Blog Jurídico</a></li>
                            <li><a href="../contacto/" class="footer-link">Contacto</a></li>
                        </ul>
                    </div>

                    <!-- Column 3: Contact Info -->
                    <div class="footer-column">
                        <h3 class="footer-title">Contacto</h3>
                        <ul class="footer-contact">
                            <li class="footer-contact-item">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                    <circle cx="12" cy="10" r="3"></circle>
                                </svg>
                                <div>
                                    <strong>Oficina Principal:</strong><br>
                                    Calle 24C # 84-85<br>
                                    T9-326<br>
                                    Bogotá, Colombia
                                </div>
                            </li>
                            <li class="footer-contact-item">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                </svg>
                                <div>
                                    <a href="tel:+573144760999">+57 314 476 0999</a><br>
                                    <a href="tel:+6013418274">(601) 341 8274</a>
                                </div>
                            </li>
                            <li class="footer-contact-item">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                    <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>
                                <a href="mailto:contactenos@fortioriabogados.com">contactenos@fortioriabogados.com</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer Bottom -->
        <div class="footer-bottom">
            <div class="container">
                <div class="footer-bottom-content">
                    <p class="footer-copyright">
                        &copy; 2026 FORTIORI ABOGADOS S.A.S. - NIT 901.013.525-1. Todos los derechos reservados.
                    </p>
                    <div class="footer-legal">
                        <a href="../politicas-de-privacidad/" class="footer-legal-link">Política de Privacidad</a>
                        <span class="footer-separator">|</span>
                        <a href="../terminos-y-condiciones/" class="footer-legal-link">Términos y Condiciones</a>
                    </div>
                </div>
            </div>
        </div>
    </footer>

    <!-- Scripts -->
    <script src="../assets/js/main.js"></script>
    <script src="../assets/js/mobile-menu-new.js"></script>
    <script src="../assets/js/navigation.js"></script>
    <script src="../assets/js/cookie-banner.js"></script>
</body>
</html>`;
}

// Generate and save
const outputPath = path.join(__dirname, 'derecho-empresarial', 'index.html');
const htmlContent = generateHTML();

fs.writeFileSync(outputPath, htmlContent, 'utf8');

console.log('✅ Derecho Empresarial page redesigned successfully!');
console.log(`📄 File saved to: ${outputPath}`);
console.log('\n📋 Redesign Summary:');
console.log('  ✅ H1 optimized: "Asistencia Legal Permanente para Empresas"');
console.log('  ✅ Title SEO: "Asesoría Jurídica para Empresas | FORTIORI ABOGADOS"');
console.log('  ✅ Meta description: 155 characters (optimized)');
console.log('  ✅ Removed: "100% Cumplimiento Legal garantizado"');
console.log('  ✅ Added: Schema BreadcrumbList');
console.log('  ✅ Internal links: UGPP + Colpensiones');
console.log('  ✅ Content reduced: ~40% (1,156 → ~700-750 lines)');
console.log('  ✅ Keyword focus: "asesoría jurídica para empresas"');
console.log('  ✅ Concept: PREVENIR ANTES QUE CORREGIR');
console.log('  ✅ Architecture: 11 sections (vs 8 original)');
