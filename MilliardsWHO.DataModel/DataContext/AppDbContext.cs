using Microsoft.EntityFrameworkCore;
using MilliardsWHO.DataModel.Entities;


namespace MilliardsWHO.DataModel.DataContext
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            //modelBuilder.Entity<ProductTag>()
            //    .HasKey(e => new { e.TagId, e.ProductId });
            base.OnModelCreating(modelBuilder);
        }
        public DbSet<Login> Login { get; set; }
  
    }
}