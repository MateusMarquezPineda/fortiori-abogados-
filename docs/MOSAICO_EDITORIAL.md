# SECCIÓN MOSAICO EDITORIAL - ÁREAS DE PRÁCTICA

## Descripción General

Sección destacada de mosaico editorial premium para la página de inicio de FORTIORI ABOGADOS S.A.S. que presenta las principales áreas de práctica de la firma con un diseño asimétrico, elegante y corporativo.

## Ubicación

- **Archivo HTML**: `public_html/index.html` (líneas 171-278)
- **Archivo CSS**: `public_html/assets/css/home.css` (líneas 128-492)
- **Posición**: Inmediatamente después de la sección Hero en la página de inicio

## Estructura del Diseño

### Desktop (>1024px)
```
┌─────────────────────────┬──────────────┬──────────────┐
│                         │              │              │
│                         │     UGPP     │ COLPENSIONES │
│    INSTITUCIONAL        │              │              │
│      (Grande)           ├──────────────┼──────────────┤
│                         │              │   DERECHO    │
│                         │   EMPRESA    │   LABORAL    │
└─────────────────────────┴──────────────┴──────────────┘
```

### Tablet (768px - 1023px)
```
┌─────────────────────────────────────────┐
│           INSTITUCIONAL                 │
├─────────────────────┬───────────────────┤
│       UGPP          │   COLPENSIONES    │
├─────────────────────┼───────────────────┤
│      EMPRESA        │  DERECHO LABORAL  │
└─────────────────────┴───────────────────┘
```

### Mobile (<768px)
Apilado vertical en el siguiente orden:
1. Institucional
2. UGPP
3. Colpensiones
4. Empresa
5. Derecho Laboral

## Bloques/Tiles

### 1. Tile Institucional (Principal)
- **Clase**: `.mosaic-tile-institutional`
- **Tamaño**: Doble de las demás (ocupa 2 filas en desktop)
- **Contenido**: Presentación general de la firma
- **Link**: `/servicios/`
- **Label**: "Nuestra Firma"
- **Título**: "FORTIORI ABOGADOS"

### 2. Tile UGPP
- **Clase**: `.mosaic-tile-ugpp`
- **Link**: `/ugpp/`
- **Label**: "Especialidad"
- **Título**: "FISCALIZACIÓN UGPP"

### 3. Tile Colpensiones
- **Clase**: `.mosaic-tile-colpensiones`
- **Link**: `/depuracion-de-deuda-real-y-presunta-de-colpensiones/`
- **Label**: "Pensiones"
- **Título**: "COLPENSIONES"

### 4. Tile Empresa y Empresario
- **Clase**: `.mosaic-tile-empresa`
- **Link**: `/la-empresa-y-el-empresario/`
- **Label**: "Corporativo"
- **Título**: "LA EMPRESA Y EL EMPRESARIO"

### 5. Tile Derecho Laboral
- **Clase**: `.mosaic-tile-laboral`
- **Link**: `/derecho-laboral-y-seguridad-social/`
- **Label**: "Laboral"
- **Título**: "DERECHO LABORAL Y SEGURIDAD SOCIAL"

## Características Visuales

### Overlays
- Gradiente oscuro sobre las imágenes de fondo
- Aumenta la opacidad al hacer hover
- Transición suave de 0.4s

### Microinteracciones

1. **Hover en toda la tarjeta**:
   - Elevación: `translateY(-4px)`
   - Aumento de sombra
   - Zoom en imagen de fondo: `scale(1.05)`
   - Aumento de opacidad del overlay

2. **CTA (Call-to-Action)**:
   - Oculto por defecto (`opacity: 0`)
   - Aparece en hover con animación de subida
   - Línea roja se expande de izquierda a derecha
   - Flecha se desplaza hacia la derecha

3. **Línea de acento roja**:
   - Aparece en el lado izquierdo de tiles secundarios
   - Crece de arriba hacia abajo en hover
   - Solo visible en tiles no-institucionales

### Tipografía

- **Label**: Uppercase, tracking amplio, texto pequeño sobre fondo blanco
- **Título**: Uppercase, font-black, tracking ajustado
- **Descripción**: Color blanco con 90% opacidad
- **CTA**: Uppercase, font-semibold

### Colores

- **Overlay**: Gradiente negro con opacidad 40%-70% (aumenta al hover)
- **Label background**: Blanco con 95% opacidad
- **Label text**: Rojo corporativo `#B3001B`
- **Texto principal**: Blanco
- **Línea de acento**: Rojo corporativo `#B3001B`

## Cómo Agregar Imágenes de Fondo Reales

### Paso 1: Preparar las imágenes

**Recomendaciones de tamaño y formato**:

| Tile           | Dimensiones  | Tipo de imagen                              |
|----------------|--------------|---------------------------------------------|
| Institucional  | 1200x800px   | Oficina corporativa, escena ejecutiva       |
| UGPP           | 800x800px    | Documentos legales, reunión profesional     |
| Colpensiones   | 800x800px    | Adultos mayores, documentación pensional    |
| Empresa        | 800x800px    | Sala de juntas, espacio corporativo         |
| Laboral        | 800x800px    | Equipo de trabajo, entorno empresarial      |

**Optimización**:
- Formato: JPG
- Calidad: 80-85%
- Peso máximo: 200KB por imagen
- Herramientas recomendadas: TinyJPG, ImageOptim, Squoosh

### Paso 2: Subir las imágenes

Crear la carpeta si no existe:
```bash
mkdir -p public_html/assets/images/mosaic
```

Nombres sugeridos:
- `institutional-bg.jpg`
- `ugpp-bg.jpg`
- `colpensiones-bg.jpg`
- `empresa-bg.jpg`
- `laboral-bg.jpg`

### Paso 3: Actualizar el CSS

En `public_html/assets/css/home.css`, descomentar y actualizar las líneas de `background-image`:

```css
.mosaic-tile-institutional .mosaic-tile-bg {
    background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
    background-image: url('/assets/images/mosaic/institutional-bg.jpg');
}

.mosaic-tile-ugpp .mosaic-tile-bg {
    background: linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%);
    background-image: url('/assets/images/mosaic/ugpp-bg.jpg');
}

/* Repetir para cada tile */
```

**Nota**: El gradiente de `background` actúa como fallback si la imagen no carga.

## Personalización

### Cambiar el texto de un tile

Editar `public_html/index.html`, localizar el tile correspondiente y modificar:

```html
<span class="mosaic-tile-label">Nueva etiqueta</span>
<h3 class="mosaic-tile-title">NUEVO TÍTULO</h3>
<p class="mosaic-tile-description">
    Nueva descripción del servicio...
</p>
```

### Cambiar el link de destino

```html
<a href="/nueva-pagina/" class="mosaic-tile mosaic-tile-ugpp">
```

### Ajustar alturas en responsive

En `home.css`, modificar:

```css
/* Desktop */
.mosaic-grid {
    grid-template-rows: repeat(2, 400px); /* Cambiar 400px */
}

/* Tablet */
@media (max-width: 1023px) {
    .mosaic-grid {
        grid-template-rows: repeat(3, 350px); /* Cambiar 350px */
    }
}

/* Mobile */
@media (max-width: 767px) {
    .mosaic-tile {
        min-height: 320px; /* Cambiar 320px */
    }
}
```

### Modificar velocidad de transiciones

```css
.mosaic-tile {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); /* Cambiar 0.4s */
}

.mosaic-tile-bg {
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1); /* Cambiar 0.6s */
}
```

## Accesibilidad

### Características implementadas

1. **Navegación por teclado**: Todas las tiles son completamente navegables con Tab
2. **Focus visible**: Borde rojo de 3px al enfocar con teclado
3. **Reduced motion**: Respeta la preferencia `prefers-reduced-motion`
4. **Semántica HTML**: Uso de elementos `<a>` con estructura clara
5. **Textos legibles**: Alto contraste sobre overlays oscuros

### Testing de accesibilidad

```bash
# Navegación por teclado
- Presionar Tab para navegar entre tiles
- Presionar Enter o Space para activar

# Screen readers
- Cada tile tiene título claro y descripción
- Los labels son leídos correctamente
```

## Rendimiento

### Optimizaciones implementadas

1. **CSS eficiente**: Uso de CSS Grid nativo
2. **Transiciones GPU-accelerated**: `transform` y `opacity`
3. **Lazy loading**: Implementar cuando se agreguen imágenes reales
4. **Gradientes como fallback**: No bloquean rendering

### Métricas esperadas

- **LCP (Largest Contentful Paint)**: <2.5s (con imágenes optimizadas)
- **CLS (Cumulative Layout Shift)**: 0 (dimensiones fijas)
- **FID (First Input Delay)**: <100ms

## Compatibilidad de Navegadores

| Navegador      | Versión mínima | Notas                              |
|----------------|----------------|------------------------------------|
| Chrome         | 57+            | Soporte completo                   |
| Firefox        | 52+            | Soporte completo                   |
| Safari         | 10.1+          | Soporte completo                   |
| Edge           | 16+            | Soporte completo                   |
| iOS Safari     | 10.3+          | Soporte completo                   |
| Chrome Android | 57+            | Soporte completo                   |

## Troubleshooting

### Las imágenes no aparecen

1. Verificar que la ruta sea correcta en el CSS
2. Comprobar que las imágenes estén en `/assets/images/mosaic/`
3. Verificar permisos de lectura en el servidor
4. Revisar la consola del navegador para errores 404

### El layout se ve roto en mobile

1. Verificar que no haya CSS personalizado conflictivo
2. Comprobar que las media queries estén activas
3. Limpiar caché del navegador
4. Verificar viewport meta tag en el HTML

### Los hovers no funcionan

1. Confirmar que JavaScript no esté bloqueando eventos
2. Verificar que no haya overlays con mayor z-index
3. Comprobar que `:hover` no esté deshabilitado por CSS personalizado

### El CTA no aparece en hover

1. Verificar que `.mosaic-tile-cta` tenga las clases correctas
2. Comprobar que no haya `display: none !important` en otro CSS
3. Revisar que las transiciones no estén deshabilitadas

## Mejoras Futuras Sugeridas

1. **Lazy loading de imágenes**: Implementar `loading="lazy"` cuando se agreguen imágenes
2. **Animación de entrada**: Agregar animación cuando la sección entra en viewport
3. **Variantes de color**: Crear temas alternativos (claro/oscuro)
4. **Videos de fondo**: Permitir videos sutiles en lugar de imágenes
5. **Analytics**: Trackear clicks en cada tile

## Recursos Externos

- **Inspiración de diseño**: Sitios web de firmas legales premium internacionales
- **Imágenes stock recomendadas**:
  - Unsplash (gratis): https://unsplash.com/s/photos/lawyer
  - Pexels (gratis): https://www.pexels.com/search/corporate/
  - Shutterstock (pago): https://www.shutterstock.com/

## Contacto y Soporte

Para modificaciones adicionales o soporte técnico, consultar:
- Documentación general del proyecto en `/docs/`
- Variables CSS en `/assets/css/variables.css`
- Guía de componentes en `/docs/COMPONENTS.md`

---

**Última actualización**: 2026-08-26
**Versión**: 1.0.0
