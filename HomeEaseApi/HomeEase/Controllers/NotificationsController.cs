using HomeEase.Dtos.NotificationDtos;
using HomeEase.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HomeEase.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationsController : ControllerBase
    {
        private readonly INotificationRepository _notificationRepository;

        public NotificationsController(INotificationRepository notificationRepository)
        {
            _notificationRepository = notificationRepository;
        }

        // 🔹 1. Get user’s notifications (with pagination + search)
        [Authorize]
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUserNotifications(
            string userId,
            [FromQuery] int skip = 0,
            [FromQuery] int take = 10,
            [FromQuery] string? searchTerm = null)
        {
            var result = await _notificationRepository.GetUserNotifications(userId, skip, take, searchTerm);
            return Ok(result);
        }

        // 🔹 2. Register a device push token

        [HttpPost("register")]
        public async Task<IActionResult> RegisterDevice([FromBody] RegisterTokenRequest request)
        {
            if (string.IsNullOrEmpty(request.UserId) || string.IsNullOrEmpty(request.ExpoPushToken))
                return BadRequest(new { message = "UserId and ExpoPushToken are required." });

            var message = await _notificationRepository.RegisterDeviceAsync(request.UserId, request.ExpoPushToken);
            if(message == null)
            {
                return BadRequest("Invalid user Id");
            }
            return Ok(new { message });
        }

        // 🔹 3. Send a notification to a user
        [Authorize(Roles = "Admin")]
        [HttpPost("send")]
        public async Task<IActionResult> SendNotification([FromBody] SendNotificationDto request)
        {
            if (string.IsNullOrEmpty(request.UserId))
                return BadRequest(new { message = "UserId is required." });

            var notification = await _notificationRepository.SendNotificationAsync(
                request.UserId,
                request.Title,
                request.Body,
                request.Data
            );

            return Ok(notification);
        }

        // 🔹 4. Send a notification to a use
        [Authorize]
        [HttpPost("mark-as-opened/{id:int}")]
        public async Task<IActionResult> MarkNotificationAsOpened([FromRoute] int id)
        {
            var result = await _notificationRepository.MarkNotificationsAsOpened(id);
            if(result == null)
            {
                return BadRequest("Invalid notification id");
            }

            return Ok(result);
        }

        [Authorize]
        [HttpGet("unread-count/{userId}")]
        public async Task<IActionResult> GetUnreadNotificationCount([FromRoute] string userId)
        {
            var count = await _notificationRepository.GetUnreadNotificationCount(userId);
            return Ok(count);
        }

    }
}
