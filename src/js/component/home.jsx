import React, { useState, useEffect } from "react";

const Home = () => {
  const [listaTareas, setListaTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState("");
  const [tareaSeleccionada, setTareaSeleccionada] = useState(null);

  // Cargar tareas desde localStorage al montar el componente
  useEffect(() => {
    const tareasGuardadas = localStorage.getItem("listaTareas");
    if (tareasGuardadas) {
      setListaTareas(JSON.parse(tareasGuardadas));
    }
  }, []);

  // Guardar tareas en localStorage cada vez que listaTareas cambie
  useEffect(() => {
    localStorage.setItem("listaTareas", JSON.stringify(listaTareas));
  }, [listaTareas]);

  // Función para limpiar todas las tareas
  const limpiarTareas = () => {
    setListaTareas([]);
    localStorage.removeItem("listaTareas");
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center titulo-personalizado">Lista de Tareas</h1>
      <div className="mx-auto col-6 todo-container">
        <input
          type="text"
          className="form-control input-task"
          placeholder="¿Qué necesitas hacer?"
          value={nuevaTarea}
          onChange={(evento) => {
            setNuevaTarea(evento.target.value);
          }}
          onKeyUp={(evento) => {
            if (evento.key === "Enter" && nuevaTarea.trim() !== "") {
              setListaTareas([...listaTareas, nuevaTarea]);
              setNuevaTarea("");
            }
          }}
        />
        <div className="card mt-3 shadow-sm">
          <ul className="list-group list-group-flush">
            {listaTareas.map((item, index) => (
              <li
                key={index}
                className="list-group-item task-item"
                onMouseEnter={() => setTareaSeleccionada(index)}
                onMouseLeave={() => setTareaSeleccionada(null)}
              >
                {item}{" "}
                {tareaSeleccionada === index && (
                  <i
                    onClick={() => {
                      const aux = listaTareas.filter((task, ind) => ind !== index);
                      setListaTareas(aux);
                    }}
                    className="fa fa-times icono-oculto"
                  ></i>
                )}
              </li>
            ))}
          </ul>
          <div className="card-footer text-muted">
            {listaTareas.length} {listaTareas.length === 1 ? "item" : "items"} left
          </div>
        </div>

        <button
          className="btn btn-danger mt-3 w-100"
          onClick={limpiarTareas}
        >
          Limpiar todas las tareas
        </button>
      </div>
    </div>
  );
};

export default Home;
