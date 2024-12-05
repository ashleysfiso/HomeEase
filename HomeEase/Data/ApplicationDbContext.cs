using HomeEase.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace HomeEase.Data
{
    public class ApplicationDbContext : IdentityDbContext<AppUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {         
        }

        public DbSet<Service> Services => Set<Service>();

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<IdentityRole>().HasData(
                new IdentityRole
                {
                    Name = "Admin",
                    NormalizedName = "ADMIN",
                },

                new IdentityRole
                {
                    Name = "User",
                    NormalizedName = "USER",
                }
            );

        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder
            .ConfigureWarnings(warnings => warnings.Ignore(RelationalEventId.PendingModelChangesWarning));
        }
    }
}
