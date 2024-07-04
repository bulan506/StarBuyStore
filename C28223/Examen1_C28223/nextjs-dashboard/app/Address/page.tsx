import React, { useState, useEffect } from 'react';
import MetodoPago from "@/app/Pagos/page";
import { Dropdown, DropdownButton } from 'react-bootstrap';

const AddAddress = () => {
  const [showMethodPay, setShowMethodPay] = useState(false);
  const tiendaEnMemoria = JSON.parse(localStorage.getItem('tienda'));
  const [directions, setDirections] = useState({});
  const [provincias, setProvincias] = useState({});
  const [cantones, setCantones] = useState({});
  const [distritos, setDistritos] = useState({});
  const [selectedProvincia, setSelectedProvincia] = useState('');
  const [selectedCanton, setSelectedCanton] = useState('');
  const [selectedDistrito, setSelectedDistrito] = useState('');
  const [direccionDelEnvio, setDireccionDelEnvio] = useState('');
  const URL = process.env.NEXT_PUBLIC_API;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${URL}/api/store/directions`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        setDirections(data.directions);
        setProvincias(data.directions.provincias);
      } catch (error) {
        throw new Error(`Error al intentar crear la campaña: ${error.message}`);
      }
    };
    fetchData();
  }, []);

  const handleProvinciaChange = (provinciaKey) => {
    setSelectedProvincia(provinciaKey);
    setCantones(directions.provincias[provinciaKey].cantones);
    setSelectedCanton('');
    setDistritos({});
    setSelectedDistrito('');
  };

  const handleCantonChange = (cantonKey) => {
    setSelectedCanton(cantonKey);
    setDistritos(directions.provincias[selectedProvincia].cantones[cantonKey].distritos);
    setSelectedDistrito('');
  };

  const handleDistritoChange = (distritoKey) => {
    setSelectedDistrito(distritoKey);
  };

  const enviarForm = (eventoDeEnvio) => {
    eventoDeEnvio.preventDefault();
    if (!selectedProvincia || !selectedCanton || !selectedDistrito || !direccionDelEnvio) {
      alert('Por favor complete todos los campos.');
      return;
    }

    const direccionCompleta = `${provincias[selectedProvincia].nombre}#${cantones[selectedCanton].nombre}#${distritos[selectedDistrito]}#${direccionDelEnvio}`;

    const updatedCart = {
      ...tiendaEnMemoria,
      carrito: {
        ...tiendaEnMemoria.carrito,
        direccionEntrega: direccionCompleta
      }
    };
    localStorage.setItem("tienda", JSON.stringify(updatedCart));
    setShowMethodPay(true);
  };

  return (
    showMethodPay ? <MetodoPago /> :
      <div className="p-pago">
        <div className="data">
          <h1>Agregar Dirección</h1>
          <form onSubmit={enviarForm}>
            <div className="form-group">
              <label htmlFor="provincia">Provincia:</label>
              <DropdownButton id="provincia" title={selectedProvincia ? provincias[selectedProvincia].nombre : "Seleccione Provincia"} onSelect={handleProvinciaChange}>
                {Object.keys(provincias).map(key => (
                  <Dropdown.Item key={key} eventKey={key}>{provincias[key].nombre}</Dropdown.Item>
                ))}
              </DropdownButton>
            </div>
            <div className="form-group">
              <label htmlFor="canton">Cantón:</label>
              <DropdownButton id="canton" title={selectedCanton ? cantones[selectedCanton].nombre : "Seleccione Cantón"} onSelect={handleCantonChange} disabled={!selectedProvincia}>
                {Object.keys(cantones).map(key => (
                  <Dropdown.Item key={key} eventKey={key}>{cantones[key].nombre}</Dropdown.Item>
                ))}
              </DropdownButton>
            </div>
            <div className="form-group">
              <label htmlFor="distrito">Distrito:</label>
              <DropdownButton id="distrito" title={selectedDistrito ? distritos[selectedDistrito] : "Seleccione Distrito"} onSelect={handleDistritoChange} disabled={!selectedCanton}>
                {Object.keys(distritos).map(key => (
                  <Dropdown.Item key={key} eventKey={key}>{distritos[key]}</Dropdown.Item>
                ))}
              </DropdownButton>
            </div>
            <div className="form-group">
              <label htmlFor="direccion">Dirección exacta:</label>
              <input type="text" className="form-control" id="direccion" placeholder="Ingrese su dirección exacta" onChange={(e) => setDireccionDelEnvio(e.target.value)} minLength={5} required />
            </div>
            <button type="submit" className="btn btn-primary">
              Continuar
            </button>
          </form>
        </div>
      </div>
  );
};

export default AddAddress;
