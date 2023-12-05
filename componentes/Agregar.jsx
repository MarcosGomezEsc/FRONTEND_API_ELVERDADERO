import React, { useState } from "react";

const FormularioAgregar = ({ onAgregarVehiculo }) => {
  const [nuevoVehiculo, setNuevoVehiculo] = useState({
    Marca: "",
    Modelo: "",
    Color: "",
    Precio: 0,
    Anio: 2012,
    Motor: "Gasolina",
    Imagen: "https/imagen",
    TipoCombustible: "Gasoil",
    NumPuertas: 4,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoVehiculo((prevVehiculo) => ({
      ...prevVehiculo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoVehiculo),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error al agregar el vehículo: ${errorMessage}`);
      }

      onAgregarVehiculo();

      setNuevoVehiculo({
        Marca: "",
        Modelo: "",
        Color: "",
        Anio: 2012,
        Precio: 0,
        Motor: "Gasolina",
        Imagen: "https/imagen",
        TipoCombustible: "Gasoil",
        NumPuertas: 4,
      });
    } catch (error) {
      console.error("Error al agregar el vehículo:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Marca:
        <input
          type="text"
          name="Marca"
          value={nuevoVehiculo.Marca}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Modelo:
        <input
          type="text"
          name="Modelo"
          value={nuevoVehiculo.Modelo}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Color:
        <input
          type="text"
          name="Color"
          value={nuevoVehiculo.Color}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Precio:
        <input
          type="number"
          name="Precio"
          value={nuevoVehiculo.Precio}
          onChange={handleChange}
        />
      </label>
      <br />
      {/* Agrega más campos según sea necesario */}
      <button type="submit">Agregar Vehículo</button>
    </form>
  );
};

export default FormularioAgregar;
