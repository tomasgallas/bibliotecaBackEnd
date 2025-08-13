import React from "react";

export function Header({ user, onLogout }) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2>📚 Biblioteca FCEFN</h2>
        {user?.role === "Admin" && (
          <a href="#crear-usuario" className="text-primary me-3">
            Crear Usuario
          </a>
        )}
      </div>
      <div>
        <span className="me-3">Hola, {user.name}</span>
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={onLogout}
        >
          Salir
        </button>
      </div>
    </div>
  );
}
