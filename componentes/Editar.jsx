import React, { useState } from "react";

{
  /*PROFE, MIRA QUE FUNCIONA PERO POR ALGUNA RAZON SALE EL ERROR A LA 
CARGA PERO DESPUES SE LE VA xd
Funciona cuando recargás la pagina se ven los cambios*/
}

const Editar = ({ auto, id }) => {
  const [nuevoPrecio, setNuevoPrecio] = useState(100000);

  const handleActualizarPrecio = async () => {
    // ClickId = id;
    console.log(id);
    try {
      const response = await fetch(`http://localhost:3000/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
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

      // Si necesitas realizar alguna acción después del patch, puedes hacerlo aquí
    } catch (error) {
      console.error("Error al actualizar el precio CATCH:", error);
    }
  };
  return (
    <div>
      <input
        type="number"
        value={nuevoPrecio}
        onChange={(e) => setNuevoPrecio(e.target.value)} // Añade esta línea
      />

      <button onClick={handleActualizarPrecio}>Actualizar Precio</button>
    </div>
  );
};

export default Editar;
