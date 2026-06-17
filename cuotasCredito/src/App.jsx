import { useState } from "react";

const App = () => {
  const [nombre, setNombre] = useState("");
  const [monto, setMonto] = useState("");
  const [tasaInteresMensual, setTasaInteresMensual] = useState("");
  const [plazo, setPlazo] = useState("");
  const [estado, setEstado] = useState("");
  const [resultado, setResultado] = useState(""); 

  const calcular = (e) => {
    e.preventDefault(); 

    if (!nombre || !monto || !tasaInteresMensual || !plazo) {
      alert("Por favor, ingrese todos los campos");
      return; 
    }

    const cuotaMensual = (monto + (monto * tasaInteresMensual / 100)) / plazo;

    let clasificacion;
    if (cuotaMensual > 250000) {
      clasificacion = "Riesgo / Cuota alta";
    } else if (cuotaMensual >= 100000 && cuotaMensual <= 250000) {
      clasificacion = "Cuota moderada";
    } else {
      clasificacion = "Cuota comoda";
    }
    
    setResultado(cuotaMensual.toFixed(2));
    setEstado(clasificacion);
  };

  const limpiar = () => {
    setNombre("");
    setMonto("");
    setTasaInteresMensual("");
    setPlazo(""); 
    setEstado("");
    setResultado(""); 
  };

  const obtenerColor = () => {
    if (estado === "Riesgo / Cuota alta") return "danger";
    if (estado === "Cuota moderada") return "warning";
    if (estado === "Cuota comoda") return "secondary"; 
    return "success";
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">Simulador de cuotas de credito</h3>
            </div>
            <div className="card-body">
              <form onSubmit={calcular}>
                {/* input nombre */}
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={nombre} 
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </div>
                {/* input monto */}
                <div className="mb-3">
                  <label className="form-label">Monto</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    step={1}
                    value={monto} 
                    onChange={(e) => setMonto(e.target.value)}
                  />
                </div>
                {/* input tasa interes mensual */}
                <div className="mb-3">
                  <label className="form-label">Tasa interes mensual (%)</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    step={0.1}
                    value={tasaInteresMensual} 
                    onChange={(e) => setTasaInteresMensual(e.target.value)}
                  />
                </div>
                {/* input plazo */}
                <div className="mb-3">
                  <label className="form-label">Plazo en meses</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    step={1}
                    value={plazo} 
                    onChange={(e) => setPlazo(e.target.value ? Math.floor(e.target.value) : "")}
                  />
                </div>

                {/* botones */}
                <div className="d-flex gap-2">
                  <button className="btn btn-primary" type="submit">
                    Calcular
                  </button>
                  <button className="btn btn-secondary" type="button" onClick={limpiar}>
                    Limpiar
                  </button>
                </div>
              </form>

              {resultado && (
                <div className={`alert alert-${obtenerColor()} my-4`}>
                  <h5>Resultado</h5>
                  <p><strong>Valor cuota mensual: </strong> ${resultado}</p>
                  <p><strong>Estado: </strong> {estado}</p>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;