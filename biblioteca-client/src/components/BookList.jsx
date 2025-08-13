import { useEffect, useState } from "react";
import { getBooks, deleteBook } from "../services/bookService";

export function BookList({ onEdit, canEdit = false }) {
  const [books, setBooks] = useState([]);

  useEffect(() => { load(); }, []);
  async function load() {
    setBooks(await getBooks());
  }
  async function handleDelete(id) {
    await deleteBook(id);
    load();
  }

  return (
    <div>
      <h5 className="mb-3">Lista de Libros</h5>
      <ul className="list-group">
        {books.map(b => (
          <li
            key={b.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>{b.title}</strong>
              <br />
              <small className="text-muted">{b.authorName}</small>
            </div>
            {canEdit && (
              <div>
                <button
                  onClick={() => onEdit(b)}
                  className="btn btn-sm btn-outline-secondary me-2"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(b.id)}
                  className="btn btn-sm btn-outline-danger"
                >
                  🗑️
                </button>
              </div>
            )}
          </li>
        ))}
        {books.length === 0 && (
          <li className="list-group-item text-muted">
            No hay libros aún.
          </li>
        )}
      </ul>
    </div>
  );
}