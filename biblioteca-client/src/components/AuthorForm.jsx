import { useState, useEffect } from "react";
import { createAuthor, updateAuthor } from "../services/authorService";

export function AuthorForm({ author, onSaved }) {
  const [name, setName] = useState("");

  useEffect(() => {
    setName(author ? author.name : "");
  }, [author]);

  async function handleSubmit(e) {
    e.preventDefault();
    const dto = { name };
    if (author) await updateAuthor(author.id, dto);
    else await createAuthor(dto);
    setName("");
    onSaved();
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title">
          {author ? "✏️ Editar Autor" : "➕ Nuevo Autor"}
        </h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="authorName" className="form-label">
              Nombre del autor
            </label>
            <input
              id="authorName"
              type="text"
              className="form-control"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Ej. Julio Cortázar"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {author ? "Actualizar" : "Crear"}
          </button>
        </form>
      </div>
    </div>
  );
}
