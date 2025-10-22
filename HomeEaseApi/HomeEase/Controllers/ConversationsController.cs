using HomeEase.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace HomeEase.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConversationsController : ControllerBase
    {
        private readonly IConversationRepository _conversationRepo;

        public ConversationsController(IConversationRepository conversationRepo)
        {
            _conversationRepo = conversationRepo;
        }

        // Helper method to get logged-in user's ID
        private string GetUserId() => User.FindFirstValue(ClaimTypes.NameIdentifier);

        // ✅ Start or get existing conversation
        [Authorize]
        [HttpPost("start")]
        public async Task<IActionResult> StartConversation([FromBody] string otherUserId)
        {
            var userId = GetUserId();

            try
            {
                var conversation = await _conversationRepo.CreateConversationAsync(userId, otherUserId);
                return Ok(conversation);
            }
            catch (InvalidOperationException)
            {
                return BadRequest("Conversation already exists.");
            }
        }

        // ✅ Get all conversations for logged-in user
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetMyConversations()
        {
            var userId = GetUserId();
            var conversations = await _conversationRepo.GetUserConversationsAsync(userId);
            return Ok(conversations);
        }

        // ✅ Get unread conversation count
        [Authorize]
        [HttpGet("unread-count")]
        public async Task<IActionResult> GetUnreadCount()
        {
            var userId = GetUserId();
            var count = await _conversationRepo.GetUnreadConversationsCountAsync(userId);
            return Ok(new { unreadConversations = count });
        }

        // ✅ Get messages in a conversation
        [Authorize]
        [HttpGet("{conversationId}/messages")]
        public async Task<IActionResult> GetMessages(int conversationId)
        {
            var userId = GetUserId();
            var conversation = await _conversationRepo.GetConversationByIdAsync(conversationId, userId);
            if (conversation == null) return NotFound("Conversation not found or you are not a part of it.");

            var messages = await _conversationRepo.GetConversationMessagesAsync(conversationId, userId);
            return Ok(messages);
        }

        // ✅ Send message in a conversation
        [Authorize]
        [HttpPost("{conversationId}/message")]
        public async Task<IActionResult> SendMessage(int conversationId, [FromBody] string content)
        {
            var senderId = GetUserId();
            if (string.IsNullOrWhiteSpace(content)) return BadRequest("Message cannot be empty.");

            var message = await _conversationRepo.SendMessageAsync(conversationId, senderId, content);
            return Ok(message);
        }

        // ✅ Mark conversation as read
        [Authorize]
        [HttpPost("{conversationId}/read")]
        public async Task<IActionResult> MarkAsRead(int conversationId)
        {
            var userId = GetUserId();
            await _conversationRepo.MarkConversationAsReadAsync(conversationId, userId);
            return Ok("Conversation marked as read.");
        }
    }
}
