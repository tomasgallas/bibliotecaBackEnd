import { useState, useEffect } from "react";
import { getAuthors } from "../services/authorService";
import { createBook, updateBook } from "../services/bookService";

export function BookForm({ book, onSaved }) {
  const [title, setTitle] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    getAuthors().then(setAuthors);
  }, []);

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthorId(book.authorId?.toString() || "");
    } else {
      setTitle("");
      setAuthorId("");
    }
  }, [book]);

  async function handleSubmit(e) {
    e.preventDefault();
    const dto = { title, authorId: Number(authorId) };
    if (book) await updateBook(book.id, dto);
    else await createBook(dto);
    setTitle("");
    setAuthorId("");
    onSaved();
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title">
          {book ? "✏️ Editar Libro" : "➕ Nuevo Libro"}
        </h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="bookTitle" className="form-label">
              Título
            </label>
            <input
              id="bookTitle"
              type="text"
              className="form-control"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Ej. Rayuela"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="bookAuthor" className="form-label">
              Autor
            </label>
            <select
              id="bookAuthor"
              className="form-select"
              value={authorId}
              onChange={e => setAuthorId(e.target.value)}
              required
            >
              <option value="">Selecciona un autor</option>
              {authors.map(a => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-success">
            {book ? "Actualizar" : "Crear"}
          </button>
        </form>
      </div>
    </div>
  );
}
