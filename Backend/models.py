from sqlalchemy import Column, Date, Integer, String, ForeignKey, Text
from sqlalchemy.orm import relationship
from database import Base

# Modelo de la tabla Usuario
class Usuario(Base):
    __tablename__ = "usuario" #Define el nombre de la tabla en la BD

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, nullable=False)
    contrasena = Column(String(100), nullable=False)
    rol = Column(String(50), nullable=False)

class SeleccionLenguaje(Base):
    __tablename__ = "seleccionlenguaje"

    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("usuario.id", ondelete="CASCADE"), nullable=False)
    lenguaje = Column(String(50), nullable=False)
    fecha = Column(Date, nullable=False)

class Ejercicio(Base):
    __tablename__ = "ejercicio"

    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String(200), nullable=False)
    contenido = Column(Text, nullable=False)
    nivel_dificultad = Column(String(50), nullable=False)
    lenguaje_pro = Column(String(50), nullable=False)

# Modelo para la tabla Progreso
class Progreso(Base):
    __tablename__ = "progreso"

    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("usuario.id", ondelete="CASCADE"), nullable=False)
    ejercicio_id = Column(Integer, ForeignKey("ejercicio.id", ondelete="CASCADE"), nullable=False)
    resultado = Column(Integer, nullable=False)  # 1 = éxito, 0 = error
    fecha = Column(Date, nullable=False)

    # Relaciones con otras tablas
    usuario = relationship("Usuario", backref="progreso_usuario")
    ejercicio = relationship("Ejercicio", backref="progreso_ejercicio")

class EjerciciosResueltos(Base):
    __tablename__ = "ejerciciosresueltos"

    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("usuario.id", ondelete="CASCADE"), nullable=False)
    ejercicio_id = Column(Integer, ForeignKey("ejercicio.id", ondelete="CASCADE"), nullable=False)

    # Relaciones
    usuario = relationship("Usuario", backref="ejercicios_resueltos")
    ejercicio = relationship("Ejercicio", backref="ejercicios_resueltos")