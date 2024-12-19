from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from models import SeleccionLenguaje
from schemas import LanguageSelectionRequest, LanguageSelectionResponse
from datetime import date

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Endpoint para guardar la selección del lenguaje
@router.post("/seleccionar-lenguaje", response_model=LanguageSelectionResponse)
def select_language(request: LanguageSelectionRequest, db: Session = Depends(get_db)):
    try:
        # Crear un nuevo registro usando el modelo SeleccionLenguaje
        nueva_seleccion = SeleccionLenguaje(
            usuario_id=request.usuario_id,
            lenguaje=request.lenguaje,
            fecha=date.today()
        )
        db.add(nueva_seleccion)
        db.commit()
        db.refresh(nueva_seleccion)
        
        return {"mensaje": "Lenguaje guardado exitosamente", "lenguaje": request.lenguaje}
    
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Error interno al guardar el lenguaje")