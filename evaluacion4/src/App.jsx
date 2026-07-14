import { useState, useEffect } from "react";
import FormularioRuta from "./componentes/FormularioRuta";
import Buscador from "./componentes/Buscador";
import TablaRutas from "./componentes/TablaRutas";
import Paginacion from "./componentes/Paginacion";

const App = () => {
  const [id, setId] = useState(null);
  const [nombre, setNombre] = useState("");
  const [tipoMovilidad, setTipoMovilidad] = useState("");
  const [distancia, setDistancia] = useState("");
  const [puntoEncuentro, setPuntoEncuentro] = useState("");
  const [responsable, setResponsable] = useState("");
  const [estadoActividad, setEstadoActividad] = useState("");

  const [rutas, setRutas] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const [error, setError] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");

  const REGISTROS_POR_PAGINA = 5;

  useEffect(() => {
    const rutasGuardadas = localStorage.getItem("rutasEcoMove");
    if (rutasGuardadas) {
      setRutas(JSON.parse(rutasGuardadas));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("rutasEcoMove", JSON.stringify(rutas));
  }, [rutas]);

  const limpiarFormulario = () => {
    setId(null);
    setNombre("");
    setTipoMovilidad("");
    setDistancia("");
    setPuntoEncuentro("");
    setResponsable("");
    setEstadoActividad("");
    setError("");
  };

  const guardarRuta = (e) => {
    e.preventDefault();
    setError("");
    setMensajeExito("");

    // Validación: Todos los campos son obligatorios
    if (!nombre || !tipoMovilidad || !distancia || !puntoEncuentro || !responsable || !estadoActividad) {
      setError("Por favor, complete todos los campos obligatorios.");
      return;
    }

    // Validación: La distancia debe ser un número mayor que 0
    if (parseFloat(distancia) <= 0) {
      setError("La distancia estimada debe ser mayor a 0 km.");
      return;
    }

    // Validación: El responsable debe contener al menos 3 caracteres
    if (responsable.trim().length < 3) {
      setError("El nombre del responsable debe tener al menos 3 caracteres.");
      return;
    }

    // Validación: El nombre de la ruta no puede repetirse
    const rutaDuplicada = rutas.find(
      (ruta) => ruta.nombre.toLowerCase() === nombre.trim().toLowerCase() && ruta.id !== id
    );
    if (rutaDuplicada) {
      setError("Ya existe una ruta con ese nombre. Ingrese un nombre distinto.");
      return;
    }

    const nuevaRuta = {
      id: id || Date.now(),
      nombre: nombre.trim(),
      tipoMovilidad,
      distancia: parseFloat(distancia),
      puntoEncuentro: puntoEncuentro.trim(),
      responsable: responsable.trim(),
      estadoActividad
    };

    if (id) {
      setRutas(rutas.map((ruta) => (ruta.id === id ? nuevaRuta : ruta)));
      setMensajeExito("Ruta actualizada exitosamente.");
    } else {
      setRutas([...rutas, nuevaRuta]);
      setMensajeExito("Ruta registrada exitosamente.");
    }

    limpiarFormulario();

    setTimeout(() => setMensajeExito(""), 3000);
  };

  const cargarParaEditar = (ruta) => {
    setId(ruta.id);
    setNombre(ruta.nombre);
    setTipoMovilidad(ruta.tipoMovilidad);
    setDistancia(ruta.distancia);
    setPuntoEncuentro(ruta.puntoEncuentro);
    setResponsable(ruta.responsable);
    setEstadoActividad(ruta.estadoActividad);
    setError("");
    setMensajeExito("");
  };

  const eliminarRuta = (idRuta) => {
    if (window.confirm("¿Está seguro de que desea eliminar esta ruta?")) {
      setRutas(rutas.filter((ruta) => ruta.id !== idRuta));

      const totalPaginasRestantes = Math.ceil((rutas.length - 1) / REGISTROS_POR_PAGINA);
      if (paginaActual > totalPaginasRestantes && totalPaginasRestantes > 0) {
        setPaginaActual(totalPaginasRestantes);
      }
    }
  };

  const rutasFiltradas = rutas.filter(
    (ruta) =>
      ruta.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      ruta.tipoMovilidad.toLowerCase().includes(busqueda.toLowerCase())
  );

  const manejarBusqueda = (valor) => {
    setBusqueda(valor);
    setPaginaActual(1); 
  };

  const indiceUltimoRegistro = paginaActual * REGISTROS_POR_PAGINA;
  const indicePrimerRegistro = indiceUltimoRegistro - REGISTROS_POR_PAGINA;
  const rutasPaginadas = rutasFiltradas.slice(indicePrimerRegistro, indiceUltimoRegistro);
  const totalPaginas = Math.ceil(rutasFiltradas.length / REGISTROS_POR_PAGINA) || 1;

  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  return (
    <div className="container-fluid my-4 px-4">
      <h2 className="text-center mb-4">Plataforma de Registro de Rutas "EcoMove"</h2>

      <div className="row">
        {/* COLUMNA FORMULARIO */}
        <div className="col-lg-4 mb-4">
          <FormularioRuta
            id={id}
            nombre={nombre}
            setNombre={setNombre}
            tipoMovilidad={tipoMovilidad}
            setTipoMovilidad={setTipoMovilidad}
            distancia={distancia}
            setDistancia={setDistancia}
            puntoEncuentro={puntoEncuentro}
            setPuntoEncuentro={setPuntoEncuentro}
            responsable={responsable}
            setResponsable={setResponsable}
            estadoActividad={estadoActividad}
            setEstadoActividad={setEstadoActividad}
            error={error}
            mensajeExito={mensajeExito}
            onGuardar={guardarRuta}
            onCancelar={limpiarFormulario}
          />
        </div>

        {/* COLUMNA TABLA E INVENTARIO */}
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Inventario de Rutas</h4>
              <span className="badge bg-light text-dark">Total: {rutasFiltradas.length}</span>
            </div>
            <div className="card-body">
              <Buscador busqueda={busqueda} onBuscar={manejarBusqueda} />

              <TablaRutas
                rutas={rutasPaginadas}
                onEditar={cargarParaEditar}
                onEliminar={eliminarRuta}
              />

              <Paginacion
                paginaActual={paginaActual}
                totalPaginas={totalPaginas}
                onCambiarPagina={cambiarPagina}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;