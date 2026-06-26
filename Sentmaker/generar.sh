#!/bin/bash

# Este script prepara el entorno virtual y ejecuta el programa de plantillas

cd "$(dirname "$0")"

VENV_DIR=".venv"

echo "Verificando dependencias..."

if [ ! -d "$VENV_DIR" ]; then
    echo "Creando entorno virtual..."
    python3 -m venv "$VENV_DIR"
    if [ $? -ne 0 ]; then
        echo "Error al crear el entorno virtual. Asegúrate de tener python3-venv instalado."
        exit 1
    fi
fi

# Activar e instalar dependencias si no están
source "$VENV_DIR/bin/activate"

# Instalar python-docx silenciosamente si no está instalado
if ! python -c "import docx" &> /dev/null; then
    echo "Instalando librería python-docx..."
    pip install python-docx > /dev/null 2>&1
    if [ $? -ne 0 ]; then
        echo "Error al instalar python-docx. Verifica tu conexión a internet."
        exit 1
    fi
fi

echo "Iniciando interfaz gráfica..."
python completar_plantilla.py

deactivate
