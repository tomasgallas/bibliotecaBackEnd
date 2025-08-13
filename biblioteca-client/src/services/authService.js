const API = "/api/users";

export async function login(dto) {
  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
    credentials: "include", // ✅ importante para mantener sesión
  });

  if (!res.ok) throw new Error("Login failed");
}

export async function logout() {
  const res = await fetch(`${API}/logout`, {
    method: "POST",
    credentials: "include", // ✅ elimina la cookie
  });

  if (!res.ok) throw new Error("Logout failed");
}

export async function getCurrentUser() {
  const res = await fetch(`${API}/me`, {
    credentials: "include",
  });

  if (!res.ok) return null;
  return await res.json();
}
