using HomeEase.Dtos.NotificationDtos;
using HomeEase.Models;
using HomeEase.Utility;

namespace HomeEase.Interfaces
{
    public interface INotificationRepository
    {
        public Task<string?> RegisterDeviceAsync(string userId, string expoPushToken);
        public Task<UserNotification> SendNotificationAsync(string userId, string title, string body, object data = null);
        public Task<PagedResult<NotificationDto>> GetUserNotifications(string userId, int skip = 0,
                                                                        int take = 10, string? searchTerm = null);
    }
}
