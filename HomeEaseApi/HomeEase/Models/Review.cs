namespace HomeEase.Models
{
    public class Review
    {
        public int Id { get; set; }
        public int Rating { get; set; } // 1 to 5
        public string Comment { get; set; }
        public bool isDeleted = false;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public int CustomerId { get; set; } // FK to Customer
        public Customer Customer { get; set; }

        public int ServiceId { get; set; }
        public int ServiceProviderId { get; set; }
        // Navigation property
        public ServiceOffering ServiceOffering { get; set; }
    } 
}
