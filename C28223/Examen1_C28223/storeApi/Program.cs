using storeApi.DataBase;
using Core;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

var app = builder.Build();


// Configure the HTTP request pipeline.

string connection = "";

var value = Environment.GetEnvironmentVariable("DB");

if (value == null)
{
 builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
 connection = builder.Configuration.GetSection("ConnectionStrings").GetSection("MyDatabase").Value.ToString();
}else{
        connection = value;
}
Storage.Init(connection);
if (app.Environment.IsDevelopment())
{
    StoreDataBase.CreateMysql();
   
    app.UseSwagger();
    app.UseSwaggerUI();
}



app.UseHttpsRedirection();

app.UseRouting();

// Use CORS
app.UseCors();
app.UseAuthorization();

app.MapControllers();

app.Run();