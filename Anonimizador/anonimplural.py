import spacy
import fitz  # PyMuPDF
import sys
import os
import re

# Cargamos el modelo de spaCy una sola vez al inicio para ganar velocidad
try:
    print("Cargando modelo de lenguaje...")
    nlp = spacy.load("es_core_news_lg")
except OSError:
    print("Error: No se encontró el modelo 'es_core_news_lg'.")
    print("Ejecuta: python -m spacy download es_core_news_lg")
    sys.exit(1)

def limpiar_patrones_fijos(texto):
    """Reemplaza números de 7 u 8 dígitos, CUITs y correos."""
    # Reemplazar DNI (7 u 8 dígitos) por 'x'
    texto = re.sub(r'\b\d{7,8}\b', lambda m: 'x' * len(m.group()), texto)
    # Reemplazar CUIT/CUIL
    texto = re.sub(r'\d{2}-\d{8}-\d', '[ID]', texto)
    # Correos electrónicos
    texto = re.sub(r'\S+@\S+', '[EMAIL]', texto)
    return texto

def extraer_texto_pdf(ruta_pdf):
    """Extrae todo el texto de un archivo PDF."""
    texto = ""
    try:
        with fitz.open(ruta_pdf) as doc:
            for pagina in doc:
                texto += pagina.get_text()
        return texto
    except Exception as e:
        print(f"Error al leer el PDF {ruta_pdf}: {e}")
        return None

def anonimizar_texto(texto):
    """Aplica lógica de anonimización preservando citas y paréntesis."""
    texto = limpiar_patrones_fijos(texto)
    doc = nlp(texto)
    resultado = []
    
    en_cita_doble = False
    en_cita_simple = False
    en_parentesis = False
    
    for token in doc:
        if '"' in token.text or '«' in token.text or '»' in token.text:
            en_cita_doble = not en_cita_doble
        if "'" in token.text:
            en_cita_simple = not en_cita_simple
        if '(' in token.text:
            en_parentesis = True
        
        dentro_de_omision = en_cita_doble or en_cita_simple or en_parentesis
        
        if not dentro_de_omision:
            # Detectar personas o palabras en mayúsculas (PROPN/NOUN)
            es_mayuscula_propia = token.text.isupper() and len(token.text) > 2 and token.pos_ in ["PROPN", "NOUN"]
            
            if token.ent_type_ == "PER" or es_mayuscula_propia:
                inicial = f"{token.text[0]}."
                resultado.append(inicial + (" " if token.whitespace_ else ""))
            else:
                resultado.append(token.text_with_ws)
        else:
            resultado.append(token.text_with_ws)

        if ')' in token.text:
            en_parentesis = False
            
    return "".join(resultado)

def procesar_archivo(archivo_entrada):
    """Procesa un archivo individual: extraer, anonimizar y guardar."""
    if not os.path.exists(archivo_entrada):
        print(f"Omitiendo: El archivo '{archivo_entrada}' no existe.")
        return

    if not archivo_entrada.lower().endswith('.pdf'):
        print(f"Omitiendo: '{archivo_entrada}' no parece ser un PDF.")
        return

    print(f"Procesando: {archivo_entrada}...")
    
    texto_original = extraer_texto_pdf(archivo_entrada)
    if texto_original is None:
        return

    texto_limpio = anonimizar_texto(texto_original)
    
    nombre_salida = os.path.splitext(archivo_entrada)[0] + "_anonimizado.txt"
    try:
        with open(nombre_salida, "w", encoding="utf-8") as f:
            f.write(texto_limpio)
        print(f"✓ Guardado: {nombre_salida}")
    except Exception as e:
        print(f"Error al guardar {nombre_salida}: {e}")

def main():
    # sys.argv[1:] captura todos los argumentos pasados (uno o varios)
    argumentos = sys.argv[1:]
    
    if not argumentos:
        print("Uso:")
        print("  Para un archivo:   python3 anonim.py sentencia.pdf")
        print("  Para muchos:       python3 anonim.py *.pdf")
        sys.exit(1)

    print(f"Archivos detectados: {len(argumentos)}")
    
    for item in argumentos:
        procesar_archivo(item)
    
    print("\n--- Tarea finalizada ---")

if __name__ == "__main__":
    main()
