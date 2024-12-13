namespace HomeEase.Models
{
    public class ServiceProvider
    {
        public int Id { get; set; }
        public string CompanyName { get; set; }
        public decimal Rating { get; set; } = 0.0M;
        public bool IsAvailable { get; set; } = true;

        public bool isDeleted = false;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        // FK to ApplicationUser
        public string UserId { get; set; }
        public AppUser User { get; set; }
        public List<ServiceOffering> ServiceProviderServices { get; set; } = new List<ServiceOffering>();
    }
}
