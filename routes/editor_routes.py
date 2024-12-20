from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from models import EjerciciosResueltos
from schemas import CodeSubmissionRequest, CodeSubmissionResponse
from llm_client import get_google_llm
from langchain.schema import HumanMessage, SystemMessage
import sys
import io

router = APIRouter()

# Crear una sesión de base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Endpoint 1: Ejecutar código Python y capturar salida
@router.post("/evaluar-codigo-python", response_model=CodeSubmissionResponse)
def evaluate_python_code(request: CodeSubmissionRequest, db: Session = Depends(get_db)):
    try:
            old_stdout = sys.stdout
            redirected_output = io.StringIO()
            sys.stdout = redirected_output

            # Entorno seguro para ejecutar el código
            safe_globals = {"_builtins_": {"print": print, "range": range, "len": len}}
            safe_locals = {}

            try:
                # Intentar ejecutar el código
                exec(request.codigo, safe_globals, safe_locals)
                status = "Éxito"
                output = redirected_output.getvalue().strip()

                # Registrar el ejercicio si es correcto
                ejercicio_resuelto = EjerciciosResueltos(
                    usuario_id=request.usuario_id,
                    ejercicio_id=request.ejercicio_id
                )

                # Comprobar si ya fue resuelto
                ejercicio_existente = db.query(EjerciciosResueltos).filter(
                    EjerciciosResueltos.usuario_id == request.usuario_id,
                    EjerciciosResueltos.ejercicio_id == request.ejercicio_id
                ).first()

                if ejercicio_existente:
                    sys.stdout = old_stdout
                    return {
                        "status": "Ejercicio ya resuelto",
                        "retroalimentacion": None  # Incluimos retroalimentacion
                    }

                db.add(ejercicio_resuelto)
                db.commit()

            except Exception as e:
                # Capturar error como estado
                status = str(e)
                output = None

            sys.stdout = old_stdout

            # Construir la respuesta sin `retroalimentacion` si está vacía
            response = {"status": status, "retroalimentacion": output}

            return response
    
    except Exception as e:
            sys.stdout = old_stdout
            raise HTTPException(status_code=500, detail=f"Error al evaluar el código: {str(e)}")

# Endpoint 2: Retroalimentación con Google Gemini
@router.post("/retroalimentacion-codigo", response_model=CodeSubmissionResponse)
def get_code_feedback(request: CodeSubmissionRequest):
    try:
        llm = get_google_llm()

        # Mensajes de sistema y usuario
        system_message = SystemMessage(
            content="Eres un tutor de programación en Python. Corrige el siguiente código y proporciona sugerencias claras y constructivas."
        )
        user_message = HumanMessage(
            content=f"Corrige y brinda retroalimentación en caso de estar incorrecto el siguiente código en Python:\n{request.codigo}"
        )

        # Llamada al LLM
        response = llm.generate_content(f"{system_message.content} {user_message.content}")

        return {
            "status": "Éxito",
            "retroalimentacion": response.text.strip()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))