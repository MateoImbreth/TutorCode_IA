Create table Usuario(
	id SERIAL primary key,
	nombre VARCHAR(100) NOT NULL,
	email VARCHAR(150) NOT NULL UNIQUE,
	contrasena VARCHAR(100) NOT NULL,
	rol VARCHAR(50) NOT NULL
);

Create table Ejercicio(
	id SERIAL primary key,
	titulo VARCHAR(200) NOT NULL,
	contenido text NOT NULL,
	nivel_dificultad VARCHAR(50) NOT NULL,
	lenguaje_pro VARCHAR(50) NOT NULL
);

CREATE TABLE Progreso (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL,
    ejercicio_id INT NOT NULL,
    resultado INT NOT NULL,
    fecha DATE NOT NULL DEFAULT CURRENT_DATE,
    CONSTRAINT fk_usuario FOREIGN KEY (usuario_id) REFERENCES Usuario (id) ON DELETE CASCADE,
    CONSTRAINT fk_ejercicio FOREIGN KEY (ejercicio_id) REFERENCES Ejercicio (id) ON DELETE CASCADE
);

SELECT * FROM Usuario
