import { useState, useEffect } from "react";
import Editar from "../componentes/Editar";
import FormularioAgregar from "../componentes/Agregar";
import Eliminar from "../componentes/Eliminar";
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

  const handleEliminarAuto = (id) => {
    // Filtra los autos para excluir el auto con el id proporcionado
    const nuevosAutos = datos.filter((auto) => auto.id !== id);
    setDatos(nuevosAutos);
  };

  //Y ACA RETORNO
  return (
    <>
      <FormularioAgregar onAgregarVehiculo={handleAgregarVehiculo} />
      {datos.length > 0 ? (
        <ul>
          {datos.map((auto, index) => (
            <li key={index}>
              <Editar auto={auto} id={index} setDatos={setDatos}></Editar>
              <Eliminar id={index} onDelete={handleEliminarAuto} />
              <h2>Desde el fetch</h2>
              <p>Marca: {auto.Marca}</p>
              <p>Modelo: {auto.Modelo}</p>
              <p>Color: {auto.Color}</p>
              <p>Precio: $ {auto.Precio}</p>
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
