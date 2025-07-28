namespace HomeEase.Models
{
    public class AuditLog
    {
        public int Id { get; set; }
        public string Action { get; set; }
        public string PerformedBy { get; set; }
        public DateTime PerformedAt { get; set; } = DateTime.UtcNow;
        public string TableName { get; set; }
        public string RecordId { get; set; }
        public string Details { get; set; }
    }
}
