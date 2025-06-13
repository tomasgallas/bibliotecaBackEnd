// Data/BibliotecaContextFactory.cs
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Biblioteca.Api.Data
{
    public class BibliotecaContextFactory
        : IDesignTimeDbContextFactory<BibliotecaContext>
    {
        public BibliotecaContext CreateDbContext(string[] args)
        {
            var options = new DbContextOptionsBuilder<BibliotecaContext>()
                .UseSqlite("Data Source=biblioteca.db")
                .Options;

            return new BibliotecaContext(options);
        }
    }
}
