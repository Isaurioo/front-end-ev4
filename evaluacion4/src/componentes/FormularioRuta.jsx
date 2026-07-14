const FormularioRuta = ({
  id,
  nombre,
  setNombre,
  tipoMovilidad,
  setTipoMovilidad,
  distancia,
  setDistancia,
  puntoEncuentro,
  setPuntoEncuentro,
  responsable,
  setResponsable,
  estadoActividad,
  setEstadoActividad,
  error,
  mensajeExito,
  onGuardar,
  onCancelar
}) => {
  return (
    <div className="card shadow-sm border-success">
      <div className="card-header bg-success text-white">
        <h4 className="mb-0">{id ? "Editar Ruta" : "Registrar Nueva Ruta"}</h4>
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger">{error}</div>}
        {mensajeExito && <div className="alert alert-success">{mensajeExito}</div>}

        <form onSubmit={onGuardar}>
          <div className="mb-3">
            <label className="form-label fw-bold">Nombre de la ruta</label>
            <input
              type="text"
              className="form-control"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: Ciclovía Norte"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Tipo de movilidad</label>
            <select
              className="form-select"
              value={tipoMovilidad}
              onChange={(e) => setTipoMovilidad(e.target.value)}
            >
              <option value="">Seleccione una opción</option>
              <option value="Bicicleta">Bicicleta</option>
              <option value="Caminata">Caminata</option>
              <option value="Carpooling">Carpooling</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Distancia estimada (km)</label>
            <input
              type="number"
              step="0.1"
              className="form-control"
              value={distancia}
              onChange={(e) => setDistancia(e.target.value)}
              placeholder="Ej: 5.5"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Punto de encuentro</label>
            <input
              type="text"
              className="form-control"
              value={puntoEncuentro}
              onChange={(e) => setPuntoEncuentro(e.target.value)}
              placeholder="Ej: Plaza de Armas"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Responsable de la actividad</label>
            <input
              type="text"
              className="form-control"
              value={responsable}
              onChange={(e) => setResponsable(e.target.value)}
              placeholder="Ej: Juan Pérez"
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold">Estado</label>
            <select
              className="form-select"
              value={estadoActividad}
              onChange={(e) => setEstadoActividad(e.target.value)}
            >
              <option value="">Seleccione una opción</option>
              <option value="Activa">Activa</option>
              <option value="Finalizada">Finalizada</option>
            </select>
          </div>

          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button type="button" className="btn btn-secondary" onClick={onCancelar}>
              {id ? "Cancelar" : "Limpiar"}
            </button>
            <button type="submit" className="btn btn-success">
              {id ? "Actualizar Ruta" : "Guardar Ruta"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioRuta;
