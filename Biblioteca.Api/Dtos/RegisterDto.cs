namespace Biblioteca.Api.Dtos
{
    public class RegisterDto
    {
        public string Email    { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Name     { get; set; } = string.Empty;
        public string Role     { get; set; } = "Alumno"; // Admin, Bibliotecario, Alumno
    }
}
