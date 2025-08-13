import { useState } from "react";

export function LoginForm({ onSuccess }) {
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]     = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/Users/login", {
      method: "POST",
      credentials: "include",         // importante para la cookie
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      onSuccess();
    } else {
      const msg = await res.json().catch(() => null);
      setError(msg?.message || "Login fallido");
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form
        onSubmit={handleSubmit}
        className="card p-4 shadow"
        style={{ minWidth: 300 }}
      >
        <h4 className="card-title text-center mb-3">Iniciar Sesión</h4>

        {error && (
          <div className="alert alert-danger py-1" role="alert">
            {error}
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="loginEmail" className="form-label">Email</label>
          <input
            id="loginEmail"
            type="email"
            className="form-control"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="loginPassword" className="form-label">Contraseña</label>
          <input
            id="loginPassword"
            type="password"
            className="form-control"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Entrar
        </button>
      </form>
    </div>
  );
}