class Reportes {
    constructor(gestor) {
      this.gestor = gestor;
    }
  
    // 1️⃣ Listado de estudiantes (map)
    listarEstudiantes() {
      return this.gestor.listarEstudiantes().map(est => ({
        nombre: est.nombre,
        nivel: est.nivel,
      }));
    }
  
    // 2️⃣ Buscar estudiante por ID o nombre (find)
    buscarEstudiante(idOrNombre) {
      return this.gestor.listarEstudiantes().find(
        est => est.id === idOrNombre || est.nombre.toLowerCase() === idOrNombre.toLowerCase()
      );
    }
  
    // 3️⃣ Promedio de calificaciones por estudiante (map)
    calcularPromedios() {
      return this.gestor.listarEstudiantes().map(est => {
        const calificaciones = Object.values(est.calificaciones || {});
        const promedio = calificaciones.length
          ? calificaciones.reduce((sum, nota) => sum + nota, 0) / calificaciones.length
          : 0;
        return { nombre: est.nombre, promedio: promedio.toFixed(2), nivel: est.nivel };
      });
    }
  
    // 4️⃣ Listado de estudiantes con promedio mayor a un umbral (filter)
    estudiantesConPromedioMayor(umbral) {
      return this.calcularPromedios().filter(est => est.promedio > umbral);
    }
  
    // 5️⃣ Estudiantes aprobados y reprobados en una materia (filter)
    aprobadosYReprobadosPorMateria(materia) {
      const resultado = { aprobados: [], reprobados: [] };
      this.gestor.listarEstudiantes().forEach(est => {
        if (est.calificaciones && materia in est.calificaciones) {
          const nota = est.calificaciones[materia];
          if (nota >= 60) {
            resultado.aprobados.push({ nombre: est.nombre, calificación: nota, nivel: est.nivel });
          } else {
            resultado.reprobados.push({ nombre: est.nombre, calificación: nota, nivel: est.nivel });
          }
        }
      });
      return resultado;
    }
  
    // 6️⃣ Promedio general del grupo (reduce)
    promedioGeneral() {
      const promedios = this.calcularPromedios();
      if (promedios.length === 0) return { promedioGeneral: 0 };
  
      const total = promedios.reduce((sum, est) => sum + parseFloat(est.promedio), 0);
      return { promedioGeneral: (total / promedios.length).toFixed(2) };
    }
  
    // 7️⃣ Promedio general por área de estudio (reduce)
    promedioPorArea() {
      const promedios = this.calcularPromedios();
      return promedios.reduce((acc, est) => {
        if (!acc[est.nivel]) {
          acc[est.nivel] = { suma: 0, cantidad: 0 };
        }
        acc[est.nivel].suma += parseFloat(est.promedio);
        acc[est.nivel].cantidad += 1;
        return acc;
      }, {});
    }
  
    // 8️⃣ Distribución de estudiantes por área de estudio (reduce)
    distribucionPorArea() {
      return this.gestor.listarEstudiantes().reduce((acc, est) => {
        acc[est.nivel] = (acc[est.nivel] || 0) + 1;
        return acc;
      }, {});
    }
  
    // 9️⃣ Promedio de cada materia por área de estudio (map + reduce)
    promedioPorMateriaYArea() {
      const estudiantes = this.gestor.listarEstudiantes();
      const resultado = {};
  
      estudiantes.forEach(est => {
        if (!resultado[est.nivel]) resultado[est.nivel] = {};
  
        for (const [materia, nota] of Object.entries(est.calificaciones || {})) {
          if (!resultado[est.nivel][materia]) {
            resultado[est.nivel][materia] = { suma: 0, cantidad: 0 };
          }
          resultado[est.nivel][materia].suma += nota;
          resultado[est.nivel][materia].cantidad += 1;
        }
      });
  
      for (const area in resultado) {
        for (const materia in resultado[area]) {
          resultado[area][materia] =
            (resultado[area][materia].suma / resultado[area][materia].cantidad).toFixed(2);
        }
      }
  
      return resultado;
    }
  
    // 🔟 Mejores y peores estudiantes por área (sort + slice)
    rankingPorArea() {
      const promedios = this.calcularPromedios();
      const agrupado = promedios.reduce((acc, est) => {
        if (!acc[est.nivel]) acc[est.nivel] = [];
        acc[est.nivel].push(est);
        return acc;
      }, {});
  
      const resultado = {};
      for (const area in agrupado) {
        const ordenado = agrupado[area].sort((a, b) => b.promedio - a.promedio);
        resultado[area] = {
          mejores: ordenado.slice(0, 2),
          peores: ordenado.slice(-2),
        };
      }
      return resultado;
    }
  
    // 1️⃣1️⃣ Ranking de estudiantes por promedio (sort)
    rankingGeneral() {
      return this.calcularPromedios().sort((a, b) => b.promedio - a.promedio);
    }
  
    // 1️⃣2️⃣ Cantidad de aprobados y reprobados en la clase (reduce)
    contarAprobadosYReprobados() {
      const promedios = this.calcularPromedios();
      return promedios.reduce(
        (acc, est) => {
          if (est.promedio >= 60) acc.aprobados += 1;
          else acc.reprobados += 1;
          return acc;
        },
        { aprobados: 0, reprobados: 0 }
      );
    }
  
    // 1️⃣3️⃣ Reporte de rendimiento académico
    reporteRendimiento() {
      return {
        totalEstudiantes: this.gestor.listarEstudiantes().length,
        promedioGeneralGrupo: this.promedioGeneral().promedioGeneral,
        mejoresEstudiantes: this.estudiantesConPromedioMayor(85),
        peoresEstudiantes: this.calcularPromedios().filter(est => est.promedio < 60),
      };
    }
  }
  
  export default Reportes;
  