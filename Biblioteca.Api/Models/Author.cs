namespace Biblioteca.Api.Models
{
    public class Author
    {
        public int    Id    { get; set; }
        public string Name  { get; set; } = string.Empty;

        // Relación 1‑a‑muchos
        public ICollection<Book> Books { get; set; } = new List<Book>();
    }
}