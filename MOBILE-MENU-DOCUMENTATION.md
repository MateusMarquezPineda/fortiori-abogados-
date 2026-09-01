# 📱 MENÚ MÓVIL OFF-CANVAS - FORTIORI ABOGADOS

## 🎯 Sistema Completamente Nuevo - Arquitectura Limpia

Este es un sistema de menú lateral (off-canvas) para móviles construido desde cero, diseñado para reemplazar el menú defectuoso anterior.

---

## 📦 ARCHIVOS CREADOS

### 1. CSS
**Ubicación:** `assets/css/mobile-menu-new.css`

Contiene todos los estilos del nuevo menú móvil:
- Toggle button (hamburguesa)
- Backdrop (overlay oscuro)
- Sidebar panel (menú lateral)
- Navigation links
- Responsive breakpoints
- Accesibilidad

### 2. JavaScript
**Ubicación:** `assets/js/mobile-menu-new.js`

Contiene toda la lógica del menú:
- Abrir/cerrar menú
- Event listeners
- Gestión de clases
- **CRÍTICO:** NO previene navegación en enlaces
- Cierre automático al navegar
- Soporte para ESC key

### 3. HTML Modificado
**Archivo:** `index.html`

Cambios realizados:
- Línea 15: Agregado link al CSS nuevo
- Línea 109-113: Nuevo botón toggle hamburguesa
- Línea 120-162: Nuevo sistema de menú (backdrop + sidebar)
- Línea 998: Agregado script JavaScript nuevo

---

## 🎨 CARACTERÍSTICAS VISUALES

### Sidebar Panel
- **Posición:** Desliza desde la derecha
- **Ancho:** 85vw (máximo 360px)
- **Color de fondo:** #f5f5f5 (gris claro)
- **Animación:** `transform: translateX()` para rendimiento óptimo
- **Sombra:** Box-shadow para profundidad

### Header del Menú
- **Fondo:** Blanco (#ffffff)
- **Contenido:** Logo a la izquierda, botón X a la derecha
- **Borde inferior:** Línea divisora sutil

### Enlaces de Navegación
- **Padding:** 18px 20px (táctil friendly)
- **Color texto:** #2a2a2a (gris muy oscuro)
- **Hover:** Fondo blanco, texto rojo (#c41e3a)
- **Link activo:** Texto rojo, font-weight 600
- **Divisores:** Border-bottom entre items

### Backdrop
- **Color:** rgba(0, 0, 0, 0.6)
- **Comportamiento:** Click para cerrar menú

---

## 🔧 CARACTERÍSTICAS TÉCNICAS

### Z-Index Strategy (Anti-Bugs)
```css
.mobile-menu-backdrop { z-index: 9998; }
.mobile-menu-sidebar { z-index: 9999; }
```
✅ Garantiza que pase por encima de widgets de WhatsApp y otros flotantes

### Pointer Events (Anti-Bloqueos)
```css
.mobile-menu-list { pointer-events: auto; }
.mobile-menu-link { pointer-events: auto; }
```
✅ Asegura que los enlaces sean completamente clickeables

### JavaScript - NO preventDefault()
```javascript
menuLinks.forEach(function(link) {
    link.addEventListener('click', function() {
        closeMenu(); // ✅ Solo cerrar, NO prevenir navegación
    });
});
```
✅ Los enlaces funcionan normalmente, solo se cierra el menú al hacer click

### Ocultar Widgets Flotantes
```css
body.mobile-menu-open .whatsapp-float,
body.mobile-menu-open .quick-chat {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
}
```
✅ Cuando el menú está abierto, se ocultan los widgets de WhatsApp y chat

### Body Scroll Lock
```css
body.mobile-menu-open {
    overflow: hidden;
    touch-action: none;
}
```
✅ Previene scroll del body cuando el menú está abierto

---

## 📱 RESPONSIVE BEHAVIOR

### Mobile (< 1024px)
- Toggle button visible
- Menú lateral funcional
- Sistema completo activo

### Desktop (≥ 1024px)
- Todo el sistema de menú móvil se oculta
- `display: none !important` en toggle, backdrop y sidebar

---

## ♿ ACCESIBILIDAD

### ARIA Attributes
```html
aria-expanded="false/true"  <!-- En toggle button -->
aria-hidden="true/false"    <!-- En sidebar y backdrop -->
aria-label="..."            <!-- En todos los botones -->
aria-controls="..."         <!-- Relación toggle → sidebar -->
```

### Keyboard Support
- **ESC:** Cierra el menú
- **Tab:** Navegación por teclado
- **Focus visible:** Outline rojo en elementos enfocados

### iOS Safe Area
```css
padding-top: max(16px, env(safe-area-inset-top));
padding-bottom: env(safe-area-inset-bottom);
```

---

## 🎬 CÓMO FUNCIONA

### 1. Usuario hace click en hamburguesa
```
Toggle button click → openMenu()
```

### 2. Menú se abre
```javascript
sidebar.classList.add('is-open');
backdrop.classList.add('is-open');
document.body.classList.add('mobile-menu-open');
```

### 3. CSS aplica transformaciones
```css
.mobile-menu-sidebar.is-open {
    transform: translateX(0); /* Desliza hacia la vista */
}
.mobile-menu-backdrop.is-open {
    opacity: 1; /* Aparece backdrop */
}
```

### 4. Usuario hace click en un enlace
```javascript
// ✅ El enlace navega normalmente
// ✅ Solo se cierra el menú
closeMenu();
```

### 5. Usuario hace click en backdrop o X
```
Backdrop/Close button click → closeMenu()
```

---

## 🧪 TESTING CHECKLIST

- [ ] El menú se abre al hacer click en hamburguesa
- [ ] El menú se desliza suavemente desde la derecha
- [ ] El backdrop aparece detrás del menú
- [ ] Los enlaces son clickeables y funcionan
- [ ] Al hacer click en un enlace, el menú se cierra
- [ ] Al hacer click en backdrop, el menú se cierra
- [ ] Al hacer click en X, el menú se cierra
- [ ] Al presionar ESC, el menú se cierra
- [ ] Los widgets de WhatsApp se ocultan cuando el menú está abierto
- [ ] El body no se scrollea cuando el menú está abierto
- [ ] En desktop (≥1024px), el menú móvil no se muestra
- [ ] El link "Inicio" tiene el color rojo (activo)

---

## 🐛 PROBLEMAS RESUELTOS

### ❌ Problema Anterior
El menú viejo tenía estos problemas:
1. Los enlaces no eran clickeables (bloqueados por JS)
2. El z-index incorrecto permitía que widgets quedaran encima
3. El menú no se mostraba visualmente
4. Conflictos entre display: flex y display: block

### ✅ Solución Implementada
1. **NO usar preventDefault()** en enlaces
2. **Z-index absoluto** (9998/9999) garantiza que pase por encima
3. **Transform en lugar de position** para animaciones
4. **Sistema completamente nuevo** sin dependencias del código viejo
5. **Pointer-events: auto** explícito en contenedores de enlaces
6. **Ocultar widgets flotantes** cuando el menú está abierto

---

## 🔄 MIGRACIÓN A OTRAS PÁGINAS

Para agregar este menú a otras páginas del sitio:

1. **Agregar CSS** en el `<head>`:
```html
<link rel="stylesheet" href="assets/css/mobile-menu-new.css">
```

2. **Cambiar toggle button** en navbar:
```html
<button class="mobile-menu-toggle" id="mobile-menu-toggle"
        aria-expanded="false" aria-controls="mobile-menu-sidebar"
        aria-label="Abrir menú de navegación">
    <span class="mobile-menu-toggle-bar"></span>
    <span class="mobile-menu-toggle-bar"></span>
    <span class="mobile-menu-toggle-bar"></span>
</button>
```

3. **Agregar HTML del menú** después del `</header>`:
```html
<!-- Copiar todo el bloque desde líneas 120-162 de index.html -->
```

4. **Agregar JavaScript** antes de `</body>`:
```html
<script src="assets/js/mobile-menu-new.js"></script>
```

5. **Actualizar link activo** según la página actual:
```html
<!-- Ejemplo para página UGPP -->
<a href="ugpp/" class="mobile-menu-link active">Fiscalización UGPP</a>
```

---

## 🎨 PERSONALIZACIÓN

### Cambiar color del texto activo
```css
.mobile-menu-link.active {
    color: #c41e3a; /* ← Cambiar aquí */
}
```

### Cambiar color de fondo del sidebar
```css
.mobile-menu-sidebar {
    background-color: #f5f5f5; /* ← Cambiar aquí */
}
```

### Cambiar ancho del menú
```css
.mobile-menu-sidebar {
    width: 85vw; /* ← Cambiar aquí */
    max-width: 360px; /* ← Y aquí */
}
```

### Cambiar velocidad de animación
```css
.mobile-menu-sidebar {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    /* ↑ Cambiar 0.3s a otro valor */
}
```

---

## 📞 SOPORTE

Si encuentras algún problema:

1. Abre DevTools (F12)
2. Ve a la pestaña Console
3. Busca el mensaje: `✓ Mobile Menu inicializado correctamente`
4. Si no aparece, verifica que los archivos CSS/JS se estén cargando

---

## ✨ CARACTERÍSTICAS PREMIUM

- ✅ **Rendimiento:** Usa `transform` en lugar de `left/right` para animaciones GPU-aceleradas
- ✅ **Accesibilidad:** ARIA completo, soporte de teclado, focus management
- ✅ **Responsive:** Breakpoints limpios, soporte para iOS safe area
- ✅ **UX:** Animaciones suaves, feedback táctil, cierre intuitivo
- ✅ **Mantenibilidad:** Código documentado, arquitectura limpia, sin dependencias
- ✅ **Anti-bugs:** Z-index absoluto, pointer-events explícitos, no preventDefault en enlaces

---

**Desarrollado con arquitectura limpia y mejores prácticas de UI/UX móvil.**
