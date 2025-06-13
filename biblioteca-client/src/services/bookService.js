const API = "/api/books";

export async function getBooks() {
  const res = await fetch(API);
  return res.json();
}

export async function createBook(dto) {
  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });
}

export async function updateBook(id, dto) {
  await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });
}

export async function deleteBook(id) {
  await fetch(`${API}/${id}`, { method: "DELETE" });
}
