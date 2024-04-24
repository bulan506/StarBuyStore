using Core;
using TodoApi.db;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
builder.Configuration.AddJsonFile("TodoApi/appsettings.json", optional: false, reloadOnChange: true);
string connection = builder.Configuration.GetSection("ConnectionStrings").GetSection("MyDatabase").Value.ToString();
Storage.Init(connection) ;
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    StoreDB.CreateMysql();
    
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
app.UseCors();
app.Run();
