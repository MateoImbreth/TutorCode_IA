from fastapi import APIRouter, HTTPException
from schemas import CodeSubmissionRequest, CodeSubmissionResponse
from llm_client import get_openai_llm
from langchain.schema import HumanMessage, SystemMessage
import sys
import io

router = APIRouter()

# Endpoint 1: Ejecutar código Python y capturar salida
@router.post("/evaluar-codigo-python", response_model=CodeSubmissionResponse)
def evaluate_python_code(request: CodeSubmissionRequest):
    try:
        old_stdout = sys.stdout
        redirected_output = io.StringIO()
        sys.stdout = redirected_output

        # Entorno seguro
        safe_globals = {"_builtins_": {"print": print, "range": range, "len": len}}
        safe_locals = {}

        try:
            exec(request.codigo, safe_globals, safe_locals)
            output = redirected_output.getvalue()
            status = "Éxito"
        except Exception as e:
            output = f"Error: {str(e)}"
            status = "Error"

        sys.stdout = old_stdout
        return {"status": status, "retroalimentacion": output.strip()}
    except Exception as e:
        sys.stdout = old_stdout
        raise HTTPException(status_code=500, detail=f"Error al evaluar el código: {str(e)}")

# Endpoint 2: Retroalimentación con OpenAI LLM
@router.post("/retroalimentacion-codigo", response_model=CodeSubmissionResponse)
def get_code_feedback(request: CodeSubmissionRequest):
    try:
        llm = get_openai_llm()

        system_message = SystemMessage(
            content="Eres un tutor de programación en Python. Corrige el siguiente código y proporciona sugerencias claras y constructivas."
        )
        user_message = HumanMessage(
            content=f"Corrige y brinda retroalimentación para el siguiente código en Python:\n{request.codigo}"
        )

        response = llm([system_message, user_message])

        return {
            "status": "Éxito",
            "retroalimentacion": response.content
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al generar retroalimentación: {str(e)}")