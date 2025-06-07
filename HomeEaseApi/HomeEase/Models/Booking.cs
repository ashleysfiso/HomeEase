namespace HomeEase.Models
{
    public class Booking
    {
        public int Id { get; set; }
        public DateOnly BookingDate { get; set; }
        public string Time { get; set; }
        public string Status { get; set; } = "Pending";
        public string Address { get; set; }
        public string ServiceTypeName {  get; set; }
        public string Size { get; set; }
        public decimal TotalCost { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;

        public int CustomerId { get; set; } // FK to Customer
        public Customer Customer { get; set; }

        public int ServiceProviderId { get; set; }
        public int ServiceId { get; set; }

      
        public ServiceOffering ServiceOffering { get; set; }

        public int ReviewId { get; set; }
        public Review Review { get; set; }
    }
}
