using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Biblioteca.Api.Data;
using Biblioteca.Api.Models;

var builder = WebApplication.CreateBuilder(args);

// 1) Registrar el DbContext con SQLite y soportar Identity
builder.Services.AddDbContext<BibliotecaContext>(opts =>
    opts.UseSqlite("Data Source=biblioteca.db"));

// 2) Configurar ASP.NET Core Identity
builder.Services.AddIdentity<ApplicationUser, IdentityRole>(opts =>
    {
        opts.User.RequireUniqueEmail = true;
        opts.Password.RequiredLength = 6;
    })
    .AddEntityFrameworkStores<BibliotecaContext>()
    .AddDefaultTokenProviders();

// 3) Configurar cookie authentication
builder.Services.ConfigureApplicationCookie(opts =>
{
    opts.Cookie.HttpOnly   = true;
    opts.Cookie.SameSite   = SameSiteMode.Strict;
    opts.ExpireTimeSpan    = TimeSpan.FromHours(2);
    opts.LoginPath         = "/api/users/login";
    opts.AccessDeniedPath  = "/api/users/forbidden";
});

// 4) Habilitar CORS para React
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod()
    );
});

// 5) Registrar servicios de Web API y Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// 6) Migraciones y seed de roles y usuarios
using(var scope = app.Services.CreateScope())
{
    var ctx     = scope.ServiceProvider.GetRequiredService<BibliotecaContext>();
    var userMgr = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
    var roleMgr = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

    ctx.Database.Migrate();

    // Crear roles
    foreach(var role in new[]{ "Admin", "Bibliotecario", "Alumno" })
        if (!await roleMgr.RoleExistsAsync(role))
            await roleMgr.CreateAsync(new IdentityRole(role));

    // Sembrar usuarios iniciales
    async Task EnsureUser(string email, string name, string pw, string role)
    {
        if (await userMgr.FindByEmailAsync(email) == null)
        {
            var u = new ApplicationUser { UserName = email, Email = email, Name = name };
            await userMgr.CreateAsync(u, pw);
            await userMgr.AddToRoleAsync(u, role);
        }
    }
    await EnsureUser("admin@correo.com", "Admin", "Admin123!", "Admin");
    await EnsureUser("biblio@correo.com", "Biblio", "Biblio123!", "Bibliotecario");
    await EnsureUser("alumno@correo.com", "Alumno", "Alumno123!", "Alumno");
}

// 7) Middlewares
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();