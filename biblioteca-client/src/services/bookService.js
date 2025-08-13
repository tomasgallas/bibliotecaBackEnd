const API = "/api/books";

export async function getBooks() {
  const res = await fetch(API, {
    credentials: "include",
  });
  return res.json();
}

export async function createBook(dto) {
  await fetch(API, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });
}

export async function updateBook(id, dto) {
  await fetch(`${API}/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });
}

export async function deleteBook(id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
}