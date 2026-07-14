const Buscador = ({ busqueda, onBuscar }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        className="form-control form-control-lg border-success"
        placeholder="Buscar por Nombre de la ruta o Tipo de movilidad..."
        value={busqueda}
        onChange={(e) => onBuscar(e.target.value)}
      />
    </div>
  );
};

export default Buscador;
