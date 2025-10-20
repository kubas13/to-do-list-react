using Microsoft.EntityFrameworkCore;
using ToDoBackend.Models;

namespace ToDoBackend.Data
{
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options) : base(options) { }
        public DbSet<TodoItem> TodoItems { get; set; }
    }
}

