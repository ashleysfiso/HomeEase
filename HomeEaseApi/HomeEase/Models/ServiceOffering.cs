namespace HomeEase.Models
{
    public class ServiceOffering
    {
        // FK to ServiceProvider
        public int ServiceProviderId { get; set; } 
        public ServiceProvider ServiceProvider { get; set; }
        // FK to Service
        public int ServiceId { get; set; } 
        public Service Service { get; set; }
        public decimal Rate { get; set; }
        public string Availability { get; set; }
        public string Description { get; set; }
        public string? ImgURL {  get; set; }
        public string Status { get; set; } = "Pending";
        public bool IsDeleted { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public List<Booking> Bookings { get; set; } = new List<Booking>();
        public List<Review> Reiviews { get; set; } = new List<Review>();
        public List<ServiceOfferingPricingOption> PricingOptions { get; set; } = new List<ServiceOfferingPricingOption>();

    }
}
