import Estudiante from "./Estudiante.js";

class Gestor {
  constructor() {
    this.estudiantes = [];
  }

  crearEstudiante(nombre, edad, nivel) {
    const estudiante = new Estudiante(nombre, edad, nivel);
    this.estudiantes.push(estudiante);
    return estudiante;
  }

  listarEstudiantes() {
    return this.estudiantes;
  }

  buscarEstudiante(id) {
    return this.estudiantes.find(est => est.id === id) || null;
  }

  actualizarEstudiante(id, nombre, edad, nivel) {
    let estudiante = this.buscarEstudiante(id);
    if (estudiante) {
      estudiante.nombre = nombre || estudiante.nombre;
      estudiante.edad = edad || estudiante.edad;
      estudiante.nivel = nivel || estudiante.nivel;
    }
  }

  eliminarEstudiante(id) {
    this.estudiantes = this.estudiantes.filter(est => est.id !== id);
  }

  actualizarCalificacion(id, materia, nota) {
    let estudiante = this.buscarEstudiante(id);
    if (estudiante) {
      estudiante.actualizarCalificacion(materia, nota);
    }
  }
}

export default Gestor;
