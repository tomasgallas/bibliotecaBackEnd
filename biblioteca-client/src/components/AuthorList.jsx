import { useEffect, useState } from "react";
import { getAuthors, deleteAuthor } from "../services/authorService";

export function AuthorList({ onEdit, canEdit = false }) {
  const [authors, setAuthors] = useState([]);

  useEffect(() => { load(); }, []);
  async function load() {
    setAuthors(await getAuthors());
  }
  async function handleDelete(id) {
    await deleteAuthor(id);
    load();
  }

  return (
    <div>
      <h5 className="mb-3">Lista de Autores</h5>
      <ul className="list-group">
        {authors.map(a => (
          <li
            key={a.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {a.name}
            {canEdit && (
              <div>
                <button
                  onClick={() => onEdit(a)}
                  className="btn btn-sm btn-outline-secondary me-2"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(a.id)}
                  className="btn btn-sm btn-outline-danger"
                >
                  🗑️
                </button>
              </div>
            )}
          </li>
        ))}
        {authors.length === 0 && (
          <li className="list-group-item text-muted">
            No hay autores todavía.
          </li>
        )}
      </ul>
    </div>
  );
}