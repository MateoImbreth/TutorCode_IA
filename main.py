from fastapi import FastAPI
from database import engine
from models import Base
from routes import user_routes, languaje_routes, exercise_routes, progress_routes, editor_routes

# Inicializar la aplicación FastAPI
app = FastAPI()

# Crear las tablas en la base de datos
Base.metadata.create_all(bind=engine)

# Incluir rutas
app.include_router(user_routes.router)
app.include_router(languaje_routes.router, tags=["Lenguaje"])
app.include_router(exercise_routes.router, tags=["Ejercicios"])
app.include_router(progress_routes.router, tags=["Progreso"])
app.include_router(editor_routes.router, tags=["Editor de Codigo"])

@app.get("/")
def root():
    return {"message": "Bienvenido a TutorCode AI"}