from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from models import EjerciciosResueltos
from schemas import EjercicioResueltoResponse

router = APIRouter()

# Dependencia para la base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Endpoint GET para validar si un ejercicio fue resuelto
@router.get("/validar-ejercicio", response_model=EjercicioResueltoResponse)
def validar_ejercicio(usuario_id: int, ejercicio_id: int, db: Session = Depends(get_db)):
    try:
        # Buscar si el ejercicio fue resuelto
        ejercicio_resuelto = db.query(EjerciciosResueltos).filter(
            EjerciciosResueltos.usuario_id == usuario_id,
            EjerciciosResueltos.ejercicio_id == ejercicio_id
        ).first()

        if ejercicio_resuelto:
            return {"mensaje": "Ejercicio resuelto"}
        else:
            return {"mensaje": "Ejercicio no resuelto"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al validar el ejercicio: {str(e)}")
