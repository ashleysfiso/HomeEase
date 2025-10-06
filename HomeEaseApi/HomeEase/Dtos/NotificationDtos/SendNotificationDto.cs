namespace HomeEase.Dtos.NotificationDtos
{
    public class SendNotificationDto
    {
        public string UserId { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public object Data { get; set; }

    }
}
