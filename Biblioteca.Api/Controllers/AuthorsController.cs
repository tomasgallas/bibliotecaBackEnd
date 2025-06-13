using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Biblioteca.Api.Data;
using Biblioteca.Api.Models;
using Biblioteca.Api.Dtos;

namespace Biblioteca.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthorsController : ControllerBase
    {
        private readonly BibliotecaContext _ctx;
        public AuthorsController(BibliotecaContext ctx) => _ctx = ctx;

        // GET: api/authors
        [HttpGet]
        public async Task<IEnumerable<AuthorReadDto>> GetAll() =>
            await _ctx.Authors
                .Select(a => new AuthorReadDto { Id = a.Id, Name = a.Name })
                .ToListAsync();

        // GET: api/authors/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<AuthorReadDto>> GetById(int id)
        {
            var a = await _ctx.Authors.FindAsync(id);
            if (a == null) return NotFound();
            return new AuthorReadDto { Id = a.Id, Name = a.Name };
        }

        // POST: api/authors
        [HttpPost]
        public async Task<ActionResult<AuthorReadDto>> Create(AuthorCreateDto dto)
        {
            var author = new Author { Name = dto.Name };
            _ctx.Authors.Add(author);
            await _ctx.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById),
                new { id = author.Id },
                new AuthorReadDto { Id = author.Id, Name = author.Name });
        }

        // PUT: api/authors/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, AuthorCreateDto dto)
        {
            var a = await _ctx.Authors.FindAsync(id);
            if (a == null) return NotFound();
            a.Name = dto.Name;
            await _ctx.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/authors/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var a = await _ctx.Authors.FindAsync(id);
            if (a == null) return NotFound();
            _ctx.Authors.Remove(a);
            await _ctx.SaveChangesAsync();
            return NoContent();
        }
    }
}