import React, { useState } from "react";

const Logica_Crud = ({ auto, setDatos }) => {
  const [nuevoPrecio, setNuevoPrecio] = useState(0);

  const handleActualizarPrecio = async () => {
    try {
      const response = await fetch(`http://localhost:3000/${auto.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Marca: auto.Marca,
          Anio: auto.Anio,
          Motor: auto.Motor,
          Imagen: auto.Imagen,
          Modelo: auto.Modelo,
          Precio: Number(nuevoPrecio),
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error al actualizar el precio: ${errorMessage}`);
      }

      // Actualizar los datos después de la actualización
      const nuevosDatos = setDatos.map((autoData) =>
        autoData.id === auto.id
          ? { ...autoData, Precio: Number(nuevoPrecio) }
          : autoData
      );

      setDatos(nuevosDatos);
    } catch (error) {
      console.error("Error al actualizar el precio:", error);
    }
  };

  return (
    <div>
      <input
        type="number"
        value={nuevoPrecio}
        onChange={(e) => setNuevoPrecio(e.target.value)}
      />
      <button onClick={handleActualizarPrecio}>Actualizar Precio</button>
    </div>
  );
};

export default Logica_Crud;
