using HomeEase.Models;
using HomeEase.Utility;
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
        public DbSet<PendingApproval> PendingApprovals => Set<PendingApproval>();
        public DbSet<Subscription> Subscriptions => Set<Subscription>();
        public DbSet<ServiceType> ServiceTypes => Set<ServiceType>();
        public DbSet<PricingOption> PricingOptions => Set<PricingOption>();
        public DbSet<ServiceOfferingPricingOption> ServiceOfferingPricings => Set<ServiceOfferingPricingOption>();
        public DbSet<AuditLog> AuditLogs => Set<AuditLog>();
        public DbSet<NotificationToken> NotificationTokens => Set<NotificationToken>();
        public DbSet<UserNotification> UserNotifications => Set<UserNotification>();
        public DbSet<Message> Messages => Set<Message>();
        public DbSet<Conversation> Conversations => Set<Conversation>();
        public DbSet<ConversationMember> ConversationMembers => Set<ConversationMember>();

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<IdentityRole>().HasData(
                new IdentityRole
                {
                    Id = IdentityRoles.ADMIN_ROLE_ID,
                    Name = "Admin",
                    NormalizedName = "ADMIN",
                },

                new IdentityRole
                {
                    Id = IdentityRoles.CUSTOMER_ROLE_ID,
                    Name = "Customer",
                    NormalizedName = "CUSTOMER",
                },

                new IdentityRole
                {
                    Id = IdentityRoles.SERVICE_PROVIDER_ROLE_ID,
                    Name = "ServiceProvider",
                    NormalizedName = "SERVICEPROVIDER",
                }
            );

            // Many - to - Many between Service and ServiceProvider
            builder.Entity<ServiceOffering>()
            .HasKey(so => new { so.ServiceProviderId, so.ServiceId });

            builder.Entity<ServiceOfferingPricingOption>()
            .HasKey(sop => new { sop.ServiceProviderId, sop.ServiceId, sop.PricingOptionId });

            builder.Entity<ServiceOffering>()
                .HasOne(so => so.ServiceProvider)
                .WithMany(sp => sp.ServiceProviderServices)
                .HasForeignKey(so => so.ServiceProviderId);

            builder.Entity<ServiceOffering>()
                .HasOne(so => so.Service)
                .WithMany(s => s.ServiceProviderServices)
                .HasForeignKey(so => so.ServiceId);


            builder.Entity<Booking>()
                .HasOne(b => b.ServiceOffering)
                .WithMany(so => so.Bookings)
                .HasForeignKey(b => new { b.ServiceProviderId, b.ServiceId })
                .HasPrincipalKey(so => new { so.ServiceProviderId, so.ServiceId })
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Booking>()
                .HasOne(b => b.Review)
                .WithOne(r => r.Booking)
                .HasForeignKey<Review>(r => r.BookingId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Review>()
                .HasOne(r => r.ServiceOffering)
                .WithMany(so => so.Reiviews)
                .HasForeignKey(r => new { r.ServiceProviderId, r.ServiceId })
                .HasPrincipalKey(so => new { so.ServiceProviderId, so.ServiceId })
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Review>()
                .HasOne(r => r.ServiceProvider)
                .WithMany(sp => sp.Reviews)
                .HasForeignKey(r => r.ServiceProviderId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Review>()
                .HasOne(r => r.Booking)
                .WithOne(b => b.Review)
                .HasForeignKey<Review>(r => r.BookingId);

            builder.Entity<ServiceOfferingPricingOption>()
                .HasOne(sop => sop.ServiceOffering)
                .WithMany(so => so.PricingOptions)
                .HasForeignKey(sop => new { sop.ServiceProviderId, sop.ServiceId })
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<ServiceOfferingPricingOption>()
                .HasOne(sop => sop.PricingOption)
                .WithMany()
                .HasForeignKey(sop => sop.PricingOptionId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<ConversationMember>()
                .HasOne(cm => cm.User)
                .WithMany(u => u.Conversations)
                .HasForeignKey(cm => cm.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Message>()
                .HasOne(m => m.Sender)
                .WithMany(u => u.SentMessages)
                .HasForeignKey(m => m.SenderId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Message>()
                .HasOne(m => m.Conversation)
                .WithMany(c => c.Messages)
                .HasForeignKey(m => m.ConversationId)
                .OnDelete(DeleteBehavior.Restrict);

        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder
            .ConfigureWarnings(warnings => warnings.Ignore(RelationalEventId.PendingModelChangesWarning));
        }
    }
}
