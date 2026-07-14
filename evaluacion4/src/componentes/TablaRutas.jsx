const TablaRutas = ({ rutas, onEditar, onEliminar }) => {
  return (
    <div className="table-responsive">
      <table className="table table-hover table-bordered align-middle text-center">
        <thead className="table-light">
          <tr>
            <th>Nombre</th>
            <th>Movilidad</th>
            <th>Distancia</th>
            <th>Encuentro</th>
            <th>Responsable</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {rutas.length > 0 ? (
            rutas.map((ruta) => (
              <tr key={ruta.id}>
                <td className="fw-bold">{ruta.nombre}</td>
                <td>
                  <span className={`badge ${
                    ruta.tipoMovilidad === 'Bicicleta' ? 'bg-primary' :
                    ruta.tipoMovilidad === 'Caminata' ? 'bg-success' : 'bg-info text-dark'
                  }`}>
                    {ruta.tipoMovilidad}
                  </span>
                </td>
                <td>{ruta.distancia} km</td>
                <td>{ruta.puntoEncuentro}</td>
                <td>{ruta.responsable}</td>
                <td>
                  <span className={`badge ${ruta.estadoActividad === 'Activa' ? 'bg-success' : 'bg-secondary'}`}>
                    {ruta.estadoActividad}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => onEditar(ruta)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onEliminar(ruta.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center text-muted py-4">
                No se encontraron rutas registradas.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TablaRutas;
