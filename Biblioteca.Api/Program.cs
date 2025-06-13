using Microsoft.EntityFrameworkCore;
using Biblioteca.Api.Data;

var builder = WebApplication.CreateBuilder(args);

// 1) Registrar el DbContext con SQLite
builder.Services.AddDbContext<BibliotecaContext>(opts =>
    opts.UseSqlite("Data Source=biblioteca.db"));

// 1.1) Habilitar CORS para el cliente React
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod()
    );
});

// 2) Registrar servicios de Web API y Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// 3) Middlewares de Swagger (sólo en Development)
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// 3.1) Usar CORS
app.UseCors();

// 4) Mapear controladores
app.MapControllers();

app.Run();
