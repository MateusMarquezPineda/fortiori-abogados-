<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <!-- Title and Meta -->
    <title><?= $page_title ?? 'FORTIORI ABOGADOS S.A.S. - Expertos en UGPP, Colpensiones y Derecho Empresarial' ?></title>
    <meta name="description" content="<?= $page_description ?? 'Firma de abogados especializada en fiscalización UGPP, depuración de deudas con Colpensiones, derecho empresarial y derecho laboral. Primera asesoría gratis.' ?>">

    <!-- Canonical -->
    <link rel="canonical" href="<?= $canonical_url ?? 'https://fortioriabogados.com' . $_SERVER['REQUEST_URI'] ?>">

    <!-- Open Graph -->
    <meta property="og:type" content="<?= $og_type ?? 'website' ?>">
    <meta property="og:title" content="<?= $og_title ?? $page_title ?? 'FORTIORI ABOGADOS S.A.S.' ?>">
    <meta property="og:description" content="<?= $og_description ?? $page_description ?? '' ?>">
    <meta property="og:image" content="<?= $og_image ?? 'https://fortioriabogados.com/assets/images/og-default.jpg' ?>">
    <meta property="og:url" content="<?= $canonical_url ?? 'https://fortioriabogados.com' . $_SERVER['REQUEST_URI'] ?>">
    <meta property="og:site_name" content="FORTIORI ABOGADOS S.A.S.">
    <meta property="og:locale" content="es_CO">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="<?= $og_title ?? $page_title ?? 'FORTIORI ABOGADOS S.A.S.' ?>">
    <meta name="twitter:description" content="<?= $og_description ?? $page_description ?? '' ?>">
    <meta name="twitter:image" content="<?= $og_image ?? 'https://fortioriabogados.com/assets/images/og-default.jpg' ?>">

    <!-- Favicons -->
    <link rel="icon" type="image/x-icon" href="assets/icons/favicon.ico">
    <link rel="icon" type="image/png" sizes="32x32" href="assets/icons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/icons/favicon-16x16.png">
    <link rel="apple-touch-icon" sizes="180x180" href="assets/icons/apple-touch-icon.png">

    <!-- Preconnect -->
    <link rel="preconnect" href="https://fonts.googleapis.com">

    <!-- Styles -->
    <link rel="stylesheet" href="assets/css/main.css">

    <!-- Additional Head Content -->
    <?php if (isset($additional_head)): ?>
        <?= $additional_head ?>
    <?php endif; ?>
</head>
<body>
    <!-- Skip Link (Accesibilidad) -->
    <a href="#main-content" class="skip-link">Saltar al contenido principal</a>

    <!-- Header -->
    <header class="header" id="header">
        <?php include __DIR__ . '/topbar.php'; ?>
        <?php include __DIR__ . '/navbar.php'; ?>
    </header>
