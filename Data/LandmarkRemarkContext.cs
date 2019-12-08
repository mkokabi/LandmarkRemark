using Microsoft.EntityFrameworkCore;
using Tigerspike.LandmarkRemark.Data.DataModels;

namespace Tigerspike.LandmarkRemark.Data
{
    public class LandmarkRemarkContext : DbContext
    {
        public LandmarkRemarkContext(DbContextOptions<LandmarkRemarkContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Note> Notes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Username)
                .IsUnique();
        }
    }
}
