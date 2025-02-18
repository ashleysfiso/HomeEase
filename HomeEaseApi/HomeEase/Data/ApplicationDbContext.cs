using System.Reflection.Emit;
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
        public DbSet<Booking> Bookings => Set<Booking>();
        public DbSet<Customer> Customers => Set<Customer>();
        public DbSet<Review> Reviews => Set<Review>();
        public DbSet<Models.ServiceProvider> ServiceProviders => Set<Models.ServiceProvider>();
        public DbSet<ServiceOffering> ServiceOfferings => Set<ServiceOffering>();

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
                    Name = "Customer",
                    NormalizedName = "CUSTOMER",
                },

                new IdentityRole
                {
                    Name = "ServiceProvider",
                    NormalizedName = "SERVICEPROVIDER",
                }
            );

            // Many - to - Many between Service and ServiceProvider
            builder.Entity<ServiceOffering>()
            .HasKey(so => new { so.ServiceProviderId, so.ServiceId });


            builder.Entity<ServiceOffering>()
                .HasOne(so => so.ServiceProvider)
                .WithMany(sp => sp.ServiceProviderServices)
                .HasForeignKey(so => so.ServiceProviderId);

            builder.Entity<ServiceOffering>()
                .HasOne(so => so.Service)
                .WithMany(s => s.ServiceProviderServices)
                .HasForeignKey(so => so.ServiceId);

            // Configure relationship between Booking and ServiceOffering
            builder.Entity<Booking>()
                .HasOne(b => b.ServiceOffering)
                .WithMany(so => so.Bookings)
                .HasForeignKey(b => new { b.ServiceProviderId, b.ServiceId }) // Foreign key in Booking
                .HasPrincipalKey(so => new { so.ServiceProviderId, so.ServiceId })
                .OnDelete(DeleteBehavior.Restrict); // Principal key in ServiceOffering

            builder.Entity<Review>()
                .HasOne(r => r.ServiceOffering)
                .WithMany(so => so.Reiviews)
                .HasForeignKey(r => new { r.ServiceProviderId, r.ServiceId })
                .HasPrincipalKey(so => new { so.ServiceProviderId, so.ServiceId })
                .OnDelete(DeleteBehavior.Restrict);

        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder
            .ConfigureWarnings(warnings => warnings.Ignore(RelationalEventId.PendingModelChangesWarning));
        }
    }
}
