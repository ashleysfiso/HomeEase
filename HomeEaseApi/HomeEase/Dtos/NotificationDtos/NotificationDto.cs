using HomeEase.Models;

namespace HomeEase.Dtos.NotificationDtos
{
    public class NotificationDto
    {
        public int Id { get; set; }
        public string UserId { get; set; }          // Reference  user
        public string ExpoPushToken { get; set; }   // The token used
        public string Title { get; set; }
        public string Body { get; set; }
        public string Data { get; set; }            // JSON string for extra data
        public bool Delivered { get; set; }         // True if Expo confirmed delivery
        public bool Opened { get; set; } = false;
        public DateTime SentAt { get; set; }
    }
}
