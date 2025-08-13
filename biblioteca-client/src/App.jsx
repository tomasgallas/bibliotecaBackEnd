import { useState, useEffect } from "react";
import { LoginForm } from "./components/LoginForm";
import { Header } from "./components/Header";
import { AuthorList } from "./components/AuthorList";
import { AuthorForm } from "./components/AuthorForm";
import { BookList } from "./components/BookList";
import { BookForm } from "./components/BookForm";
import UserForm from "./components/UserForm"; // 👈 agregamos esto

function App() {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [editingAuthor, setEditingAuthor] = useState(null);
  const [reloadAuthors, setReloadAuthors] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [reloadBooks, setReloadBooks] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/Users/me", { credentials: "include" });
        if (res.ok) {
          const u = await res.json();
          setUser(u);
        }
      } catch (_) {}
      setCheckingAuth(false);
    })();
  }, []);

  if (checkingAuth) return null;

  if (!user) {
    return <LoginForm onSuccess={() => window.location.reload()} />;
  }

  const canEdit = ["Admin", "Bibliotecario"].includes(user.role);

  return (
    <div className="container py-5">
      <Header
        user={user}
        onLogout={async () => {
          await fetch("/api/Users/logout", {
            method: "POST",
            credentials: "include",
          });
          window.location.reload();
        }}
      />

      {user.role === "Admin" && (
        <div className="mb-5">
          <UserForm />
        </div>
      )}

      <div className="row mb-5">
        <div className="col-md-6">
          {canEdit && (
            <AuthorForm
              author={editingAuthor}
              onSaved={() => {
                setEditingAuthor(null);
                setReloadAuthors((r) => !r);
              }}
            />
          )}
        </div>
        <div className="col-md-6">
          <AuthorList
            key={reloadAuthors}
            onEdit={(a) => setEditingAuthor(a)}
            canEdit={canEdit}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          {canEdit && (
            <BookForm
              book={editingBook}
              onSaved={() => {
                setEditingBook(null);
                setReloadBooks((r) => !r);
              }}
            />
          )}
        </div>
        <div className="col-md-6">
          <BookList
            key={reloadBooks}
            onEdit={(b) => setEditingBook(b)}
            canEdit={canEdit}
          />
        </div>
      </div>
    </div>
  );
}

export default App;