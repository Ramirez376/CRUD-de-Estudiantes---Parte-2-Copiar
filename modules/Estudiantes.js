let contadorId = 1;

class Estudiante {
  constructor(nombre, edad, nivel, calificaciones = {}) {
    this.id = contadorId++;
    this.nombre = nombre;
    this.edad = edad;
    this.nivel = nivel;
    this.calificaciones = calificaciones; // Objeto donde cada materia tiene una calificación
  }

  actualizarCalificacion(materia, nota) {
    this.calificaciones[materia] = nota;
  }
}

export default Estudiante;
