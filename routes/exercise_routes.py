from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Ejercicio
from typing import List
from schemas import ExerciseResponse

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/ejercicios", response_model=List[ExerciseResponse])
def get_exercises(nivel_dificultad: str = None, lenguaje: str = None, db: Session = Depends(get_db)):
    query = db.query(Ejercicio)
    if nivel_dificultad:
        query = query.filter(Ejercicio.nivel_dificultad == nivel_dificultad)
    if lenguaje:
        query = query.filter(Ejercicio.lenguaje_pro == lenguaje)

    ejercicios = query.all()
    if not ejercicios:
        raise HTTPException(status_code=404, detail="No hay ejercicios disponibles.")
    return ejercicios