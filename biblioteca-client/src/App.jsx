import { useState } from "react";
import { AuthorList } from "./components/AuthorList";
import { AuthorForm } from "./components/AuthorForm";
import { BookList } from "./components/BookList";
import { BookForm } from "./components/BookForm";

function App() {
  const [editingAuthor, setEditingAuthor] = useState(null);
  const [reloadAuthors, setReloadAuthors] = useState(false);

  const [editingBook, setEditingBook] = useState(null);
  const [reloadBooks, setReloadBooks] = useState(false);

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">📚 Biblioteca FCEFN</h1>

      <div className="row mb-5">
        <div className="col-md-6">
          <AuthorForm
            author={editingAuthor}
            onSaved={() => {
              setEditingAuthor(null);
              setReloadAuthors(r => !r);
            }}
          />
        </div>
        <div className="col-md-6">
          <AuthorList
            key={reloadAuthors}
            onEdit={a => setEditingAuthor(a)}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <BookForm
            book={editingBook}
            onSaved={() => {
              setEditingBook(null);
              setReloadBooks(r => !r);
            }}
          />
        </div>
        <div className="col-md-6">
          <BookList
            key={reloadBooks}
            onEdit={b => setEditingBook(b)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;