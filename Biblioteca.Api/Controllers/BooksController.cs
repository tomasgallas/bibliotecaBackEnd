using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Biblioteca.Api.Data;
using Biblioteca.Api.Models;
using Biblioteca.Api.Dtos;

namespace Biblioteca.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
        private readonly BibliotecaContext _ctx;
        public BooksController(BibliotecaContext ctx) => _ctx = ctx;

        // GET: api/books
        [HttpGet]
        public async Task<IEnumerable<BookReadDto>> GetAll()
        {
            var books = await _ctx.Books.Include(b => b.Author).ToListAsync();
            return books.Select(b => new BookReadDto {
                Id         = b.Id,
                Title      = b.Title,
                AuthorName = b.Author?.Name ?? "Desconocido"
            });
        }

        // GET: api/books/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<BookReadDto>> GetById(int id)
        {
            var b = await _ctx.Books
                              .Include(x => x.Author)
                              .FirstOrDefaultAsync(x => x.Id == id);
            if (b == null) return NotFound();
            return new BookReadDto {
                Id         = b.Id,
                Title      = b.Title,
                AuthorName = b.Author?.Name ?? "Desconocido"
            };
        }

        // POST: api/books
        [HttpPost]
        public async Task<ActionResult<BookReadDto>> Create(BookCreateDto dto)
        {
            var book = new Book { Title = dto.Title, AuthorId = dto.AuthorId };
            _ctx.Books.Add(book);
            await _ctx.SaveChangesAsync();

            var author = await _ctx.Authors.FindAsync(book.AuthorId);
            return CreatedAtAction(nameof(GetById),
                new { id = book.Id },
                new BookReadDto {
                    Id         = book.Id,
                    Title      = book.Title,
                    AuthorName = author?.Name ?? "Desconocido"
                });
        }

        // PUT: api/books/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, BookCreateDto dto)
        {
            var book = await _ctx.Books.FindAsync(id);
            if (book == null) return NotFound();
            book.Title    = dto.Title;
            book.AuthorId = dto.AuthorId;
            await _ctx.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/books/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var book = await _ctx.Books.FindAsync(id);
            if (book == null) return NotFound();
            _ctx.Books.Remove(book);
            await _ctx.SaveChangesAsync();
            return NoContent();
        }
    }
}