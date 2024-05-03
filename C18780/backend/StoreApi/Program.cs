using MediatR;
using StoreApi.Commands;
using StoreApi.Data;
using StoreApi.Handler;
using StoreApi.Models;
using StoreApi.Queries;
using StoreApi.Repositories;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddMediatR(Assembly.GetExecutingAssembly());
builder.Services.AddDbContext<DbContextClass>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<ISalesRepository, SalesRepository>();
builder.Services.AddScoped<ISalesLineRepository, SalesLineRepository>();
builder.Services.AddScoped<ISinpeRepository, SinpeRepository>();
builder.Services.AddScoped<IDailySalesRepository, DailySalesRepository>();
builder.Services.AddScoped<IWeeklySalesRepository, weeklySalesRepository>();

// Registra los manejadores de MediatR específicos
builder.Services.AddTransient<IRequestHandler<GetProductListQuery, List<Product>>, GetProductListHandler>();
builder.Services.AddTransient<IRequestHandler<GetProductByIdQuery, Product>, GetProductByIdHandler>();
builder.Services.AddTransient<IRequestHandler<CreateProductCommand, Product>, CreateProductHandler>();
builder.Services.AddTransient<IRequestHandler<CreateSalesCommand, Sales>, CreateSalesHandler>();
builder.Services.AddTransient<IRequestHandler<CreateSalesLineCommand, SalesLine>, CreateSalesLineHandler>();
builder.Services.AddTransient<IRequestHandler<CreateSinpeCommand, Sinpe>, CreateSinpeHandler>();
builder.Services.AddTransient<IRequestHandler<DeleteProductCommand, int>, DeleteProductHandler>();
builder.Services.AddTransient<IRequestHandler<GetSalesByIdQuery, Sales>, GetSalesByIdHandler>();
builder.Services.AddTransient<IRequestHandler<UpdateProductCommand, int>, UpdateProductHandler>();
builder.Services.AddTransient<IRequestHandler<UpdateSalesCommand, int>, UpdateSalesHandler>();
builder.Services.AddTransient<IRequestHandler<GetSalesByPurchaseNumberQuery, Sales>, GetSalesByPurchaseNumberHandler>();
builder.Services.AddTransient<IRequestHandler<GetDailySalesQuery, List<DailySales>>, GetDailySalesByDateHandler>();
builder.Services.AddTransient<IRequestHandler<GetWeeklySalesByDateQuery, List<WeeklySales>>, GetWeeklySalesByDateHandler>();


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddCors(p => p.AddPolicy("corsapp", builder =>
    {
        builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
    }));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors("corsapp");

app.Run();
