using Microsoft.EntityFrameworkCore;
using ToDoBackend.Data;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddDbContext<TodoContext>(opt =>
    opt.UseInMemoryDatabase("TodoList"));


builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();


app.UseSwagger();      
app.UseSwaggerUI(c =>   
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "ToDo API V1");
    c.RoutePrefix = ""; 
});

app.UseCors();
app.UseAuthorization();
app.MapControllers();


app.Run();
