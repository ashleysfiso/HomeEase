using HomeEase.Data;
using HomeEase.Interfaces;
using HomeEase.Models;
using Microsoft.EntityFrameworkCore;

namespace HomeEase.Repository
{
    public class ConversationRepository : IConversationRepository
    {
        private readonly ApplicationDbContext _context;

        public ConversationRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        // ✅ Check if conversation between two users already exists
        public async Task<bool> ConversationExistsAsync(string userId1, string userId2)
        {
            return await _context.Conversations
                .AnyAsync(c => c.Members.Any(m => m.UserId == userId1)
                            && c.Members.Any(m => m.UserId == userId2));
        }

        // ✅ Create a new conversation between two users
        public async Task<Conversation> CreateConversationAsync(string userId1, string userId2)
        {
            if (await ConversationExistsAsync(userId1, userId2))
                throw new InvalidOperationException("Conversation already exists.");

            var conversation = new Conversation();
            conversation.Members.Add(new ConversationMember { UserId = userId1 });
            conversation.Members.Add(new ConversationMember { UserId = userId2 });

            _context.Conversations.Add(conversation);
            await _context.SaveChangesAsync();
            return conversation;
        }

        // ✅ Get conversation details
        public async Task<Conversation?> GetConversationByIdAsync(int conversationId, string userId)
        {
            return await _context.Conversations
                .Include(c => c.Members)
                .Include(c => c.Messages.OrderByDescending(m => m.SentAt))
                .FirstOrDefaultAsync(c => c.Id == conversationId &&
                                          c.Members.Any(m => m.UserId == userId));
        }

        // ✅ Get all conversations for a user with latest message and unread count
        public async Task<List<Conversation>> GetUserConversationsAsync(string userId)
        {
            return await _context.Conversations
                .Include(c => c.Members)
                .Include(c => c.Messages)
                .Where(c => c.Members.Any(m => m.UserId == userId))
                .Select(c => new Conversation
                {
                    Id = c.Id,
                    CreatedAt = c.CreatedAt,
                    Members = c.Members,
                    Messages = c.Messages.OrderByDescending(m => m.SentAt).Take(1).ToList() // last message only
                })
                .ToListAsync();
        }

        // ✅ Count unread conversations
        public async Task<int> GetUnreadConversationsCountAsync(string userId)
        {
            return await _context.ConversationMembers
                .Where(cm => cm.UserId == userId)
                .CountAsync(cm => cm.Conversation.Messages
                    .Any(m => m.SentAt > cm.LastReadAt && m.SenderId != userId));
        }

        // ✅ Send a message
        public async Task<Message> SendMessageAsync(int conversationId, string senderId, string content)
        {
            var message = new Message
            {
                ConversationId = conversationId,
                SenderId = senderId,
                Content = content
            };

            _context.Messages.Add(message);
            await _context.SaveChangesAsync();
            return message;
        }

        // ✅ Get messages in a conversation
        public async Task<List<Message>> GetConversationMessagesAsync(int conversationId, string userId)
        {
            return await _context.Messages
                .Where(m => m.ConversationId == conversationId && !m.IsDeleted)
                .OrderBy(m => m.SentAt)
                .ToListAsync();
        }

        // ✅ Mark conversation as read by updating LastReadAt
        public async Task MarkConversationAsReadAsync(int conversationId, string userId)
        {
            var member = await _context.ConversationMembers
                .FirstOrDefaultAsync(cm => cm.ConversationId == conversationId && cm.UserId == userId);

            if (member != null)
            {
                member.LastReadAt = DateTime.UtcNow;
                await _context.SaveChangesAsync();
            }
        }
    }
}
