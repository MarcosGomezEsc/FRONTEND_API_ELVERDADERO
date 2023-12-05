import { useState, useEffect } from "react";
import Logica_Crud from "../componentes/Logica_CRUD";
import FormularioAgregar from "../componentes/Agregar";

const Fetch_Autos = () => {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const response = await fetch("http://localhost:3000/");

        if (!response.ok) {
          throw new Error("Error al obtener los datos:", response.status);
        }

        const data = await response.json();
        setDatos(data);
      } catch (error) {
        console.error("Error de red:", error);
      }
    };
    obtenerDatos();
  }, []);
  //DESDE ACA FUNCIONA BIEN

  const obtenerDatos = async () => {
    try {
      const response = await fetch(`http://localhost:3000/`);

      if (!response.ok) {
        throw new Error("Error al obtener los datos:", response.status);
      }

      const data = await response.json();
      setDatos(data);
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  useEffect(() => {
    obtenerDatos();
  }, []);

  const handleAgregarVehiculo = () => {
    // Función para actualizar la lista de vehículos después de agregar uno nuevo
    obtenerDatos();
  };
  //Y ACA RETORNO
  return (
    <>
      <FormularioAgregar onAgregarVehiculo={handleAgregarVehiculo} />
      {datos.length > 0 ? (
        <ul>
          {datos.map((auto, index) => (
            <li key={index}>
              <Logica_Crud auto={auto} setDatos={setDatos}></Logica_Crud>
              <h2>Desde el fetch</h2>
              <p>Marca: {auto.Marca}</p>
              <p>Modelo: {auto.Modelo}</p>
              <p>Color: {auto.Color}</p>
              <p>Precio: U$S{auto.Precio}</p>
              <hr />
            </li>
          ))}
        </ul>
      ) : (
        <p>No se encontraron datos</p>
      )}
    </>
  );
};

export default Fetch_Autos;
