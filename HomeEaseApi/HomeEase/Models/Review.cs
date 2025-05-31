namespace HomeEase.Models
{
    public class Review
    {
        public int Id { get; set; }
        public int Rating { get; set; } // 1 to 5
        public string Comment { get; set; }
        public bool IsDeleted { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public int CustomerId { get; set; } 
        public Customer Customer { get; set; }

        public int ServiceId { get; set; }
        public int ServiceProviderId { get; set; }
        
        public ServiceOffering ServiceOffering { get; set; }

        public ServiceProvider ServiceProvider { get; set; }

        public int BookingId { get; set; }
        public Booking Booking { get; set; }
    } 
}
