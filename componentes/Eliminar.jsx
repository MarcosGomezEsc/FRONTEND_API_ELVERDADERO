import React from "react";

const Eliminar = ({ id, onDelete }) => {
  const handleEliminarAuto = async () => {
    try {
      const response = await fetch(`http://localhost:3000/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error al eliminar el auto: ${errorMessage}`);
      }

      // Llama a la función externa para actualizar la lista después de eliminar
      onDelete(id);
    } catch (error) {
      console.error("Error al eliminar el auto:", error);
    }
    console.log(id);
  };

  return (
    <div>
      <button onClick={handleEliminarAuto}>Eliminar Auto</button>
    </div>
  );
};

export default Eliminar;
