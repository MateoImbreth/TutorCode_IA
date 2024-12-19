from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Progreso
from schemas import ProgressRequest, ProgressResponse

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/guardar-progreso", response_model=ProgressResponse)
def save_progress(request: ProgressRequest, db: Session = Depends(get_db)):
    try:
        nuevo_progreso = Progreso(
            usuario_id=request.usuario_id,
            ejercicio_id=request.ejercicio_id,
            resultado=request.resultado
        )
        db.add(nuevo_progreso)
        db.commit()
        db.refresh(nuevo_progreso)
        return {"mensaje": "Progreso guardado exitosamente", "resultado": request.resultado}
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Error al guardar el progreso")