import os
from langchain_community.chat_models import ChatGooglePalm
import google.generativeai as genai
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

# Configuración de la API de Google Gemini
def get_google_llm(model_name="gemini-1.5-flash"):
    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key:
        raise ValueError("Falta la clave de API de Google en el archivo .env")

    # Configurar una vez la API
    genai.configure(api_key=api_key)

    # Crear instancia del modelo
    gemini_model = genai.GenerativeModel(model_name)
    return gemini_model
