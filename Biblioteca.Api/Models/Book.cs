// Models/Book.cs
namespace Biblioteca.Api.Models
{
    public class Book
    {
        public int    Id       { get; set; }
        public string Title    { get; set; } = string.Empty;
        public int    AuthorId { get; set; }

        // Propiedad de navegación
        public Author? Author  { get; set; }
    }
}
