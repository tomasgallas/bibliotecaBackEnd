namespace Biblioteca.Api.Dtos
{
    public class BookReadDto
    {
        public int    Id         { get; set; }
        public string Title      { get; set; } = string.Empty;
        public string AuthorName { get; set; } = string.Empty;
    }
}
