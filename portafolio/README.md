# 📄 Página de Portafolio de Servicios

## ✅ ¿Qué se ha creado?

1. **Página HTML completa** (`portafolio/index.html`)
   - Hero section con título y descripción
   - Visor de PDF integrado (iframe)
   - Botones de descarga y abrir en nueva pestaña
   - Sección de descarga con información del PDF
   - Diseño responsive para móvil y desktop
   - Integrado con header, footer y menú móvil

2. **Enlaces agregados en todos los menús**
   - Menú desktop (navbar)
   - Menú móvil (sidebar)
   - Todas las páginas del sitio actualizadas

## 📂 Cómo Agregar tu PDF

### Paso 1: Preparar el PDF

Renombra tu archivo PDF a:
```
portafolio-servicios-fortiori-2024.pdf
```

**O si prefieres usar tu nombre actual (`20211-11-22.pdf`):**

Edita el archivo `portafolio/index.html` y busca todas las referencias:
```html
../docs/portafolio-servicios-fortiori-2024.pdf
```

Reemplázalas por:
```html
../docs/20211-11-22.pdf
```

### Paso 2: Copiar el PDF

Copia tu archivo PDF a la carpeta:
```
fortiori/docs/
```

Estructura final:
```
fortiori/
├── docs/
│   └── portafolio-servicios-fortiori-2024.pdf  ← TU PDF AQUÍ
├── portafolio/
│   └── index.html
└── ...
```

### Paso 3: Verificar

1. Abre: `http://localhost:8000/portafolio/`
2. Deberías ver el PDF en el visor
3. Prueba los botones de descarga

## 🎨 Características de la Página

### Hero Section
- Fondo degradado rojo
- Título grande y descripción
- Responsive

### Visor de PDF
- Iframe con el PDF incrustado
- Altura: 80vh en desktop, 60vh en móvil
- Header con título y botones de acción
- Bordes redondeados y sombra elegante

### Botones de Acción
1. **Descargar PDF**: Descarga directa del archivo
2. **Abrir en nueva pestaña**: Para mejor visualización

### Sección de Descarga
- Icono de documento
- Descripción del contenido
- Botón grande de descarga
- Info del archivo (formato, fecha)

## 📱 Responsive

### Desktop
- Visor de 80vh de altura
- Botones lado a lado
- Diseño en dos columnas

### Móvil
- Visor de 60vh (más pequeño para pantallas móviles)
- Botones apilados verticalmente
- Todo centrado
- Texto optimizado

## 🔍 Menús Actualizados

El enlace "Portafolio" aparece en:
- ✅ Página de inicio
- ✅ Blog
- ✅ UGPP
- ✅ Depuración Colpensiones
- ✅ Derecho Empresarial
- ✅ Contacto
- ✅ Cómo Responder Requerimiento UGPP

Posición en el menú:
```
Inicio → UGPP → Colpensiones → Derecho Empresarial → 🆕 Portafolio → Blog → Contacto
```

## 🎯 Navegación

### Desktop
El enlace aparece en la barra de navegación superior

### Móvil
El enlace aparece en el menú hamburguesa lateral

## 🐛 Solución de Problemas

### El PDF no se muestra

**Problema:** El iframe muestra en blanco

**Causas posibles:**
1. El archivo PDF no existe en `docs/`
2. El nombre del archivo no coincide
3. El navegador bloquea PDFs en iframes (Chrome a veces hace esto)

**Solución:**
- Verifica que el archivo existe
- Usa los botones de "Descargar" o "Abrir en nueva pestaña"
- Ambos siempre funcionarán

### El PDF es muy grande

**Problema:** Tarda mucho en cargar

**Solución:**
- Optimiza el PDF (usa herramientas online de compresión)
- Tamaño recomendado: menos de 5 MB
- Máximo aceptable: 10 MB

### No puedo ver el PDF en móvil

**Problema:** El PDF se ve muy pequeño

**Solución:**
- Usa el botón "Abrir en nueva pestaña"
- Los usuarios móviles pueden hacer zoom
- Considera crear una versión móvil del PDF (más simple)

## 💡 Recomendaciones para el PDF

### Contenido sugerido:
1. **Portada**
   - Logo de FORTIORI ABOGADOS
   - Título: "Portafolio de Servicios"
   - Año: 2024

2. **Índice**
   - Lista de servicios

3. **Servicios Detallados**
   - Fiscalización UGPP
   - Depuración Colpensiones
   - Derecho Empresarial
   - Derecho Laboral

4. **Casos de Éxito**
   - Testimonios
   - Resultados

5. **Información de Contacto**
   - Teléfono, email, dirección
   - Redes sociales

### Formato técnico:
- **Tamaño:** A4 o Letter
- **Orientación:** Vertical
- **Peso:** 3-5 MB (máximo 10 MB)
- **Calidad:** Alta resolución (300 DPI)
- **Fuentes:** Incrustadas

## 🚀 URLs

- **Página de portafolio:** `http://localhost:8000/portafolio/`
- **PDF directo:** `http://localhost:8000/docs/portafolio-servicios-fortiori-2024.pdf`

---

**¿Necesitas ayuda?** Revisa el archivo `docs/INSTRUCCIONES-PDF.md` para más detalles.
