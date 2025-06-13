const API = "/api/authors";

export async function getAuthors() {
  const res = await fetch(API);
  return res.json();
}

export async function createAuthor(dto) {
  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });
}

export async function updateAuthor(id, dto) {
  await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });
}

export async function deleteAuthor(id) {
  await fetch(`${API}/${id}`, { method: "DELETE" });
}
