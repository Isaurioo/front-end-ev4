const Paginacion = ({ paginaActual, totalPaginas, onCambiarPagina }) => {
  if (totalPaginas <= 1) return null;

  return (
    <nav className="mt-3">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${paginaActual === 1 ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => onCambiarPagina(paginaActual - 1)}>
            Anterior
          </button>
        </li>
        {Array.from({ length: totalPaginas }, (_, index) => (
          <li key={index + 1} className={`page-item ${paginaActual === index + 1 ? "active" : ""}`}>
            <button className="page-link" onClick={() => onCambiarPagina(index + 1)}>
              {index + 1}
            </button>
          </li>
        ))}
        <li className={`page-item ${paginaActual === totalPaginas ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => onCambiarPagina(paginaActual + 1)}>
            Siguiente
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Paginacion;
