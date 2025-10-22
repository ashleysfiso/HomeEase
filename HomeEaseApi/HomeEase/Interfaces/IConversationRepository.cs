using HomeEase.Models;

namespace HomeEase.Interfaces
{
    public interface IConversationRepository
    {
        Task<Conversation> CreateConversationAsync(string userId1, string userId2);
        Task<Conversation?> GetConversationByIdAsync(int conversationId, string userId);
        Task<List<Conversation>> GetUserConversationsAsync(string userId);
        Task<int> GetUnreadConversationsCountAsync(string userId);
        Task<Message> SendMessageAsync(int conversationId, string senderId, string content);
        Task<List<Message>> GetConversationMessagesAsync(int conversationId, string userId);
        Task MarkConversationAsReadAsync(int conversationId, string userId);
        Task<bool> ConversationExistsAsync(string userId1, string userId2);
    }
}
