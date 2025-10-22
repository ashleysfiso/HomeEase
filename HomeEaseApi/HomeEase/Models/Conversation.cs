namespace HomeEase.Models
{
    public class Conversation
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public List<ConversationMember> Members { get; set; } = new List<ConversationMember>();
        public List<Message> Messages { get; set; } = new List<Message>();
    }
}
