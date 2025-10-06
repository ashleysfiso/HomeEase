namespace HomeEase.Models
{
    public class NotificationToken
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public AppUser User { get; set; }
        public string ExpoPushToken { get; set; }
    }
}
