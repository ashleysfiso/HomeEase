namespace HomeEase.Models
{
    public class Message
    {
        public int Id { get; set; }

        public int ConversationId { get; set; }
        public Conversation Conversation { get; set; }

        public string SenderId { get; set; }
        public AppUser Sender { get; set; }

        public string Content { get; set; }

        public bool IsRead { get; set; } = false;
        public DateTime SentAt { get; set; } = DateTime.UtcNow;
        public DateTime? ReadAt { get; set; }

        public bool IsDeleted { get; set; } = false;
    }
}
