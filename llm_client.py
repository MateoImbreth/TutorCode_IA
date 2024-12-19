import os
from langchain_community.chat_models import ChatOpenAI
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

# Configurar el cliente OpenAI LLM a través de LangChain
def get_openai_llm(model_name="gpt-3.5-turbo", temperature=0.7):
    openai_api_key = os.getenv("OPENAI_API_KEY")
    if not openai_api_key:
        raise ValueError("Falta la clave de API de OpenAI en el archivo .env")

    llm = ChatOpenAI(
        model=model_name,
        openai_api_key=openai_api_key,
        temperature=temperature
    )
    return llm