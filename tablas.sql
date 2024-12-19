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

INSERT INTO usuario (nombre, email, contrasena, rol)
VALUES 
    ('glendy', 'glendynap@gmail.com', '123', 'estudiante'),
    ('mateo', 'imbrethmateo10@gmail.com', '456', 'estudiante'),
    ('carlos', 'carlosalv@gmail.com', '789', 'estudiante');

INSERT INTO Ejercicio (titulo, contenido, nivel_dificultad, lenguaje_pro)
VALUES
-- Ejercicios Fáciles
('Soluciona los errores de sintaxis', 
'Corrige los errores en el siguiente código para que funcione correctamente:
  ```python
  def multiplicar(a, b)
      resultado = a * b
      return resultado
  print(multiplicar(5, 3)
  ```', 
'Fácil', 'Python'),
('Corrección de errores en listas', 
'Corrige el siguiente código para evitar un error de índice fuera de rango:
  ```python
  numeros = [1, 2, 3]
  print(numeros[5])
  ```', 
'Fácil', 'Python'),
('Manejo de errores en tipos de datos', 
'Corrige el siguiente código para que no ocurra un error al sumar diferentes tipos de datos:
  ```python
  texto = "El resultado es: "
  numero = 10
  resultado = texto + numero
  print(resultado)
  ```', 
'Fácil', 'Python'),
('Manejo de errores en funciones', 
'Corrige el siguiente código para evitar errores relacionados con funciones inexistentes:
  ```python
  import math
  print(math.raiz(25))
  ```', 
'Fácil', 'Python'),
('Corregir errores en métodos de listas', 
'Corrige el siguiente código para evitar errores de atributos incorrectos:
  ```python
  numeros = [1, 2, 3]
  numeros.appendd(4)
  print(numeros)
  ```', 
'Fácil', 'Python'),
('Errores de indentación', 
'Corrige el error de indentación en el siguiente código:
  ```python
  def mostrar_mensaje():
  print("Hola, mundo")
  print("Función ejecutada.")
  ```', 
'Fácil', 'Python'),
('Manejo de métodos incorrectos en cadenas', 
'Corrige el siguiente código para evitar errores relacionados con el uso de métodos inexistentes:
  ```python
  cadena = "Hola, mundo"
  cadena.append("!")
  print(cadena)
  ```', 
'Fácil', 'Python'),
('Operaciones básicas entre variables', 
'Completa el código para que realice la suma y multiplicación correctamente:
  ```python
  a = 5
  b = 3
  suma = # Escribe aquí la operación de suma
  producto = # Escribe aquí la operación de multiplicación
  print("Suma:", suma)
  print("Producto:", producto)
  ```', 
'Fácil', 'Python'),
('Cálculo de área', 
'Escribe un programa que calcule el área de un rectángulo usando dos variables:
  ```python
  base = 10
  altura = 5
  # Escribe aquí la operación para calcular el área
  print("El área del rectángulo es:", area)
  ```', 
'Fácil', 'Python'),
('Condicional con operaciones', 
'Completa el código para imprimir si la suma de dos números es mayor o igual a 10:
  ```python
  a = 7
  b = 5
  suma = a + b
  if # Completa aquí la condición:
      print("La suma es mayor o igual a 10")
  else:
      print("La suma es menor a 10")
  ```', 
'Fácil', 'Python'),

-- Ejercicios Intermedios
('División segura', 
'Corrige el siguiente código para evitar errores al realizar una división entre cero:
  ```python
  def division_segura(a, b):
      return a / b
  print(division_segura(10, 0))
  ```', 
'Intermedio', 'Python'),
('Acceso seguro a índices de listas', 
'Completa el siguiente código para verificar si un índice existe antes de acceder a una lista:
  ```python
  mi_lista = [10, 20, 30]
  indice = 5
  # Verifica si el índice es válido antes de acceder a él
  print(mi_lista[indice])
  ```', 
'Intermedio', 'Python'),
('Manejo de valores no convertibles', 
'Escribe una función que intente convertir una cadena en un número entero. Si no es posible, debe mostrar un mensaje:
  ```python
  def convertir_a_entero(cadena):
      return int(cadena)
  print(convertir_a_entero("texto"))
  ```', 
'Intermedio', 'Python'),
('Sumar elementos de una lista', 
'Escribe un programa que sume los elementos de una lista y maneje el caso en que esté vacía:
  ```python
  numeros = [4, 7, 2, 9]
  suma_total = 0
  if len(numeros) == 0:
      print("La lista está vacía.")
  else:
      # Escribe aquí un bucle para sumar los elementos
      print("La suma total es:", suma_total)
  ```', 
'Intermedio', 'Python'),
('Encontrar el número mayor en una lista', 
'Escribe un programa que encuentre el número mayor de una lista de enteros:
  ```python
  numeros = [3, 8, 1, 6, 7]
  mayor = numeros[0]
  # Escribe aquí un bucle para encontrar el número mayor
  print("El número mayor es:", mayor)
  ```', 
'Intermedio', 'Python'),
('Filtrar números pares', 
'Completa el siguiente código para obtener una lista solo con los números pares de otra lista:
  ```python
  numeros = [10, 15, 20, 25, 30]
  pares = []
  # Escribe aquí un bucle para filtrar los números pares
  print("Números pares:", pares)
  ```', 
'Intermedio', 'Python'),
('Ordenar lista manualmente', 
'Completa el código para ordenar una lista de forma ascendente sin usar métodos integrados:
  ```python
  numeros = [7, 3, 9, 1, 4]
  # Implementa aquí el algoritmo de ordenamiento (por ejemplo, burbuja)
  print("Lista ordenada:", numeros)
  ```', 
'Intermedio', 'Python'),
('Eliminar duplicados de una lista', 
'Escribe un programa que elimine los elementos duplicados de una lista:
  ```python
  numeros = [1, 2, 2, 3, 4, 4, 5]
  unicos = []
  # Escribe aquí el código para eliminar duplicados
  print("Lista sin duplicados:", unicos)
  ```', 
'Intermedio', 'Python'),
('Verificar número par o impar', 
'Completa el código para verificar si un número es par o impar:
  ```python
  numero = 15
  if # Completa aquí la condición:
      print("El número es par")
  else:
      print("El número es impar")
  ```', 
'Intermedio', 'Python');


