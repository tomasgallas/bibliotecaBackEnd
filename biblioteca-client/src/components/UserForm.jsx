import { useState } from "react";

export default function UserForm({ onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Alumno",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.message || "Error al registrar el usuario.");
      return;
    }

    setForm({ name: "", email: "", password: "", role: "Alumno" });
    onSuccess?.(); // si querés hacer algo cuando se crea bien
    alert("Usuario creado correctamente");
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded space-y-4">
      <h2 className="text-xl font-bold">Registrar Usuario</h2>

      {error && <p className="text-red-600">{error}</p>}

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Nombre"
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Contraseña"
        className="w-full border p-2 rounded"
        required
      />

      <select
        name="role"
        value={form.role}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        <option>Admin</option>
        <option>Bibliotecario</option>
        <option>Alumno</option>
      </select>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Crear usuario
      </button>
    </form>
  );
}