using Microsoft.AspNetCore.Identity;

namespace HomeEase.Models
{
    public class AppUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime RefreshTokenExpiryTime { get; set; }
        public Customer? Customer { get; set; }
        public ServiceProvider? ServiceProvider { get; set; }
        public List<NotificationToken> NotificationTokens { get; set; }
        public List<UserNotification> UserNotifications { get; set; }
        public List<Message> SentMessages { get; set; } = new();
        public List<ConversationMember> Conversations { get; set; } = new();
    }
}
