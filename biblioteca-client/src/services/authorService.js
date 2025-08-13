const API = "/api/authors";

export async function getAuthors() {
  const res = await fetch(API, {
    credentials: "include",
  });
  return res.json();
}

export async function createAuthor(dto) {
  await fetch(API, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });
}

export async function updateAuthor(id, dto) {
  await fetch(`${API}/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });
}

export async function deleteAuthor(id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
}