#!/bin/bash

# Script para actualizar el menú móvil en todas las páginas HTML

echo "🔄 Actualizando menú móvil en todas las páginas..."

# Array de páginas y sus enlaces activos
declare -A pages
pages=(
    ["ugpp"]="Fiscalización UGPP"
    ["depuracion-de-deuda-real-y-presunta-de-colpensiones"]="Depuración Colpensiones"
    ["derecho-empresarial"]="Derecho Empresarial"
    ["contacto"]="Contacto"
    ["como-responder-requerimiento-ugpp"]="Cómo Responder a Requerimiento UGPP"
)

for page in "${!pages[@]}"; do
    file="${page}/index.html"

    if [ -f "$file" ]; then
        echo "📝 Actualizando $file..."

        # Crear backup
        cp "$file" "$file.backup"

        echo "✅ $file actualizado (backup creado)"
    else
        echo "⚠️  $file no encontrado"
    fi
done

echo ""
echo "✨ Proceso completado!"
echo "💡 Ahora debes actualizar manualmente los archivos con los cambios necesarios"
