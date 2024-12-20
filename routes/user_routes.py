from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Usuario
from schemas import LoginRequest, LoginResponse

# Configuración del router
router = APIRouter()

# Dependencia de la sesión
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Endpoint de Login (sin hash, comparación directa)
@router.post("/login", response_model=LoginResponse)
def login(request: LoginRequest, db: Session = Depends(get_db)):
    try:
        # Buscar usuario por email
        usuario = db.query(Usuario).filter(Usuario.email == request.email).first()
        if not usuario:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")
        
        # Comparar contraseñas en texto plano
        if request.contrasena != usuario.contrasena:
            raise HTTPException(status_code=400, detail="Contraseña incorrecta")
        
        # Token ficticio (puedes agregar JWT aquí si lo deseas)
        token = f"fake-token-for-{usuario.email}"
        return {
            "message": "Inicio de sesión exitoso", 
            "token": token,
            "user_id": usuario.id,
            "nombre": usuario.nombre,
            "email": usuario.email
            }
    
    except Exception as e:
        print(f"Error: {e}")  # Imprime el error en la consola para depurar
        raise HTTPException(status_code=500, detail="Error interno del servidor")