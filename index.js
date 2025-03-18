import readline from "readline";
import GestorEstudiantes from "./modules/Gestor.js";

const gestor = new Gestor();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function mostrarMenu() {
  console.log("\nSistema de Gestión de Estudiantes");
  console.log("1. Crear estudiante");
  console.log("2. Listar estudiantes");
  console.log("3. Actualizar estudiante");
  console.log("4. Eliminar estudiante");
  console.log("5. Salir");
  rl.question("Selecciona una opción: ", (opcion) => {
    manejarOpcion(opcion);
  });
}

function manejarOpcion(opcion) {
  switch (opcion) {
    case "1":
      rl.question("Nombre: ", (nombre) => {
        rl.question("Edad: ", (edad) => {
          rl.question("Nivel: ", (nivel) => {
            gestor.crearEstudiante(nombre, parseInt(edad), nivel);
            console.log("Estudiante creado con éxito.");
            mostrarMenu();
          });
        });
      });
      break;
    case "2":
      console.log("Lista de Estudiantes:", gestor.listarEstudiantes());
      mostrarMenu();
      break;
    case "3":
      rl.question("ID del estudiante: ", (id) => {
        rl.question("Nuevo nombre: ", (nombre) => {
          rl.question("Nueva edad: ", (edad) => {
            rl.question("Nuevo nivel: ", (nivel) => {
              gestor.actualizarEstudiante(parseInt(id), nombre, parseInt(edad), nivel);
              console.log("Estudiante actualizado.");
              mostrarMenu();
            });
          });
        });
      });
      break;
    case "4":
      rl.question("ID del estudiante a eliminar: ", (id) => {
        gestor.eliminarEstudiante(parseInt(id));
        console.log("Estudiante eliminado.");
        mostrarMenu();
      });
      break;
    case "5":
      console.log("Saliendo...");
      rl.close();
      break;
    default:
      console.log("Opción no válida.");
      mostrarMenu();
      break;
  }
}

mostrarMenu();