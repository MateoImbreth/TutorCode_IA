from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv
import os

# Cargar variables de entorno
load_dotenv()

# Obtener la cadena de conexión
DATABASE_URL = os.getenv("DATABASE_URL")

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# Configuración del motor de SQLAlchemy
engine = create_engine(DATABASE_URL)

# Crear una sesión local
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base para modelos
Base = declarative_base()