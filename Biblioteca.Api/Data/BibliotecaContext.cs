using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Biblioteca.Api.Models;

namespace Biblioteca.Api.Data
{
    public class BibliotecaContext : IdentityDbContext<ApplicationUser>
    {
        public BibliotecaContext(DbContextOptions<BibliotecaContext> options)
            : base(options) { }

        public DbSet<Author> Authors => Set<Author>();
        public DbSet<Book>    Books   => Set<Book>();
    }
}
