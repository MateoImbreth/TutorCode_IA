from pydantic import BaseModel

#-- Login

# Modelo para solicitud de login
class LoginRequest(BaseModel):
    email: str
    contrasena: str

# Modelo para respuesta de login
class LoginResponse(BaseModel):
    message: str
    token: str

#-- Seleccion de lenguaje

# Modelo para la solicitud
class LanguageSelectionRequest(BaseModel):
    usuario_id: int
    lenguaje: str  # Ejemplo: "Java", "C++", "Python"

# Modelo para la respuesta
class LanguageSelectionResponse(BaseModel):
    mensaje: str
    lenguaje: str

class ExerciseResponse(BaseModel):
    id: int
    titulo: str
    contenido: str
    nivel_dificultad: str
    lenguaje_pro: str

class Config:
    orm_mode = True

#-- Progreso
class ProgressRequest(BaseModel):
    usuario_id: int
    ejercicio_id: int
    resultado: int  # 1 = éxito, 0 = error

class ProgressResponse(BaseModel):
    mensaje: str
    resultado: int

#-- Editor
class CodeSubmissionRequest(BaseModel):
    ejercicio_id: int  # Identificador del ejercicio
    codigo: str  # El código enviado por el usuario

class CodeSubmissionResponse(BaseModel):
    status: str  # 'Éxito' o 'Error'
    retroalimentacion: str  # Mensaje de retroalimentación

    