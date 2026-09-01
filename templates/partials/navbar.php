<!-- Navbar -->
<nav class="navbar" id="navbar" role="navigation" aria-label="Navegación principal">
    <div class="container">
        <div class="navbar-content">
            <!-- Logo -->
            <a href="./" class="navbar-logo" aria-label="FORTIORI ABOGADOS - Ir al inicio">
                <img src="assets/images/logo-fortiori.svg" alt="FORTIORI ABOGADOS" class="logo-img">
            </a>

            <!-- Desktop Navigation -->
            <ul class="navbar-menu" id="navbar-menu">
                <!-- Mobile Menu Header -->
                <li class="navbar-menu-header">
                    <a href="./" class="navbar-menu-logo">
                        <img src="assets/images/logo-fortiori.svg" alt="FORTIORI ABOGADOS">
                    </a>
                    <button class="navbar-menu-close" id="navbar-close" aria-label="Cerrar menú">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </li>

                <!-- Navigation Links -->
                <li class="navbar-item">
                    <a href="./" class="navbar-link">Inicio</a>
                </li>
                <li class="navbar-item">
                    <a href="ugpp/" class="navbar-link">Fiscalización UGPP</a>
                </li>
                <li class="navbar-item">
                    <a href="depuracion-de-deuda-real-y-presunta-de-colpensiones/" class="navbar-link">Depuración Colpensiones</a>
                </li>
                <li class="navbar-item navbar-item-dropdown">
                    <button class="navbar-link navbar-dropdown-toggle" aria-expanded="false" aria-haspopup="true">
                        Derecho Empresarial
                        <svg class="navbar-dropdown-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </button>
                    <ul class="navbar-dropdown">
                        <li><a href="la-empresa-y-el-empresario/" class="navbar-dropdown-link">La Empresa y el Empresario</a></li>
                        <li><a href="derecho-laboral-y-seguridad-social/" class="navbar-dropdown-link">Derecho Laboral y Seguridad Social</a></li>
                    </ul>
                </li>
                <li class="navbar-item">
                    <a href="blog/" class="navbar-link">Blog</a>
                </li>
                <li class="navbar-item">
                    <a href="contacto/" class="navbar-link">Contacto</a>
                </li>
            </ul>

            <!-- CTA Button -->
            <a href="contacto/" class="navbar-cta btn btn-primary">
                Consulta Gratis
            </a>

            <!-- Mobile Menu Toggle -->
            <button class="navbar-toggle" id="navbar-toggle" aria-expanded="false" aria-controls="navbar-menu" aria-label="Abrir menú de navegación">
                <span class="navbar-toggle-icon"></span>
                <span class="navbar-toggle-icon"></span>
                <span class="navbar-toggle-icon"></span>
            </button>
        </div>
    </div>
</nav>

<!-- Mobile Overlay -->
<div class="navbar-overlay" id="navbar-overlay" aria-hidden="true"></div>
