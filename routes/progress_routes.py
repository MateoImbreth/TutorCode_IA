from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import func
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Progreso, SeleccionLenguaje, Ejercicio, EjerciciosResueltos
from schemas import ProgressRequest, ProgressResponse

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Endpoint GET para obtener el progreso
@router.get("/obtener-progreso", response_model=ProgressResponse)
def get_progress(usuario_id: int, db: Session = Depends(get_db)):
    try:
        # Obtener el progreso del usuario por lenguaje
        progreso = db.query(
            SeleccionLenguaje.id.label("id_lenguaje"),
            SeleccionLenguaje.lenguaje.label("nombre_lenguaje"),
            func.count(Ejercicio.id).label("cantidad_ejercicios"),
            func.count(EjerciciosResueltos.id).label("cantidad_ejercicios_resueltos")
        ).join(
            Ejercicio, SeleccionLenguaje.lenguaje == Ejercicio.lenguaje_pro
        ).outerjoin(
            EjerciciosResueltos, 
            (EjerciciosResueltos.usuario_id == usuario_id) & 
            (EjerciciosResueltos.ejercicio_id == Ejercicio.id)
        ).filter(
            SeleccionLenguaje.usuario_id == usuario_id
        ).group_by(
            SeleccionLenguaje.id, SeleccionLenguaje.lenguaje
        ).first()

        if not progreso:
            raise HTTPException(status_code=404, detail="No se encontró progreso para el usuario")

        # Convertir la respuesta a un diccionario
        return {
            "id_lenguaje": progreso.id_lenguaje,
            "nombre_lenguaje": progreso.nombre_lenguaje,
            "cantidad_ejercicios": progreso.cantidad_ejercicios,
            "cantidad_ejercicios_resueltos": progreso.cantidad_ejercicios_resueltos
        }

    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Error al obtener el progreso")