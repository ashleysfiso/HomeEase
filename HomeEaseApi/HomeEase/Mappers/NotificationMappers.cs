using HomeEase.Dtos.NotificationDtos;
using HomeEase.Models;

namespace HomeEase.Mappers
{
    public static class NotificationMappers
    {
        public static NotificationDto ToNotificationDto(this UserNotification userNotification)
        {
            return new NotificationDto
            {
                Id = userNotification.Id,
                Body = userNotification.Body,
                Data = userNotification.Data,
                Delivered = userNotification.Delivered,
                ExpoPushToken = userNotification.ExpoPushToken,
                Opened = userNotification.Opened,
                SentAt = userNotification.SentAt,
                Title = userNotification.Title,
                UserId = userNotification.UserId
            };
        }
    }
}
