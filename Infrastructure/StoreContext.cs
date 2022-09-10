using Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Infrastructure
{
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions<StoreContext> options):base(options)
        {
        }
        
        public DbSet<Course> Courses {get; set;}

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.Development.json")
            .Build();

            var connectionString = configuration.GetConnectionString("DefaultConnection");
            optionsBuilder.UseSqlite(connectionString);
        }
    }
}