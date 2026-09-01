# 📄 Instrucciones para Agregar el PDF del Portafolio

## Ubicación del PDF

Debes colocar tu archivo PDF en la siguiente ubicación:

```
fortiori/docs/portafolio-servicios-fortiori-2024.pdf
```

## Nombre Sugerido del Archivo

- **Nombre actual esperado:** `portafolio-servicios-fortiori-2024.pdf`
- **Puedes usar también:** `20211-11-22.pdf` (si ese es tu nombre de archivo)

## Cómo Agregar el PDF

### Opción 1: Usar el nombre esperado por el sistema

1. Renombra tu PDF a: `portafolio-servicios-fortiori-2024.pdf`
2. Cópialo a la carpeta: `docs/`
3. Listo! La página ya está configurada para mostrarlo

### Opción 2: Usar tu nombre de archivo actual

Si quieres mantener el nombre `20211-11-22.pdf`, necesitas actualizar las referencias en el archivo HTML:

**Archivo a editar:** `portafolio/index.html`

**Buscar y reemplazar:**
```
portafolio-servicios-fortiori-2024.pdf
```

**Por:**
```
20211-11-22.pdf
```

## Verificar que Funciona

1. Copia tu PDF a `docs/portafolio-servicios-fortiori-2024.pdf` (o el nombre que uses)
2. Abre en el navegador: `http://localhost:8000/portafolio/`
3. Deberías ver el PDF incrustado en la página
4. Los botones de descarga y "abrir en nueva pestaña" deben funcionar

## Características de la Página

✅ Visor de PDF integrado (iframe)
✅ Botón de descarga directa
✅ Botón para abrir en nueva pestaña
✅ Responsive (funciona en móvil y desktop)
✅ Diseño profesional con hero section
✅ Integrado con el menú del sitio

## Solución de Problemas

### El PDF no se muestra

- Verifica que el archivo existe en `docs/`
- Verifica que el nombre del archivo coincide exactamente
- Algunos navegadores bloquean PDFs en iframes por seguridad
- Solución: Los botones de descarga/abrir siempre funcionarán

### El PDF se muestra muy pequeño en móvil

- Esto es normal, los PDFs no son muy responsive
- Los usuarios pueden usar el botón "Abrir en nueva pestaña" para mejor visualización

## Formato Recomendado del PDF

Para mejor visualización:
- Tamaño: A4 o Letter
- Orientación: Vertical (Portrait)
- Máximo: 10 MB para carga rápida
- Incluir:
  - Portada con logo de FORTIORI
  - Índice de servicios
  - Descripción detallada de cada servicio
  - Casos de éxito
  - Información de contacto

---

**¿Necesitas ayuda?** Si tienes problemas, revisa la consola del navegador (F12) para ver errores.
