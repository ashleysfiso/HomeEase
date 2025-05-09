namespace HomeEase.Models
{
    public class ServiceProvider
    {
        public int Id { get; set; }
        public string CompanyName { get; set; }
        public bool IsAvailable { get; set; } = true;

        public bool isDeleted = false;
        public string Status { get; set; } = "Active";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public string UserId { get; set; }
        public AppUser User { get; set; }
        public int ReviewsId { get; set; }
        public List<Review> Reviews { get; set; } = new List<Review>();
        public int SubscriptionId { get; set; }
        public List<Subscription> Subscriptions { get; set; } = new List<Subscription>();
        public List<ServiceOffering> ServiceProviderServices { get; set; } = new List<ServiceOffering>();
    }
}
