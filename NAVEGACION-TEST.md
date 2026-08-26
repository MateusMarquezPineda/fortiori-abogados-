# TEST DE NAVEGACIÓN

## URLs Correctas del Sitio

**Página de Inicio:**
https://mateusmarquezpineda.github.io/fortiori-abogados-/

**Página de UGPP:**
https://mateusmarquezpineda.github.io/fortiori-abogados-/ugpp/

**Página de Colpensiones:**
https://mateusmarquezpineda.github.io/fortiori-abogados-/depuracion-de-deuda-real-y-presunta-de-colpensiones/

## Enlaces en el código (VERIFICADOS ✅)

### Desde index.html (inicio):
- Inicio: `./`
- UGPP: `ugpp/`
- Colpensiones: `depuracion-de-deuda-real-y-presunta-de-colpensiones/`

### Desde ugpp/index.html:
- Inicio: `../`
- UGPP: `./`
- Colpensiones: `../depuracion-de-deuda-real-y-presunta-de-colpensiones/`

### Desde depuracion-de-deuda-real-y-presunta-de-colpensiones/index.html:
- Inicio: `../`
- UGPP: `../ugpp/`
- Colpensiones: `./`

## Cómo probar

1. **Limpiar caché del navegador:**
   - Chrome/Edge: Ctrl+Shift+R (Windows) o Cmd+Shift+R (Mac)
   - Firefox: Ctrl+F5 (Windows) o Cmd+Shift+R (Mac)

2. **Abrir en modo incógnito:**
   - Esto evita problemas de caché

3. **Esperar 2-3 minutos:**
   - GitHub Pages puede tardar en desplegar los cambios

4. **Probar navegación:**
   - Ir a la página de inicio
   - Clic en "Fiscalización UGPP" → debe ir a /ugpp/
   - Clic en "Inicio" → debe volver a /
   - Clic en "Depuración Colpensiones" → debe ir a /depuracion-de-deuda-real-y-presunta-de-colpensiones/

## Último deploy
- Commit: e4214da
- Fecha: 2026-08-26
- Mensaje: "Corregir enlaces de navegación en páginas UGPP y Colpensiones"
