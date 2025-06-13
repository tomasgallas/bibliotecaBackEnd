namespace Biblioteca.Api.Dtos
{
    public class BookCreateDto
    {
        public string Title    { get; set; } = string.Empty;
        public int    AuthorId { get; set; }
    }
}