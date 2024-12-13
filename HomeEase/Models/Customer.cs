namespace HomeEase.Models
{
    public class Customer
    {
        public int Id { get; set; }
        // FK to AppUser
        public string UserId { get; set; }
        public AppUser User { get; set; }

        public bool isDeleted = false;
        public string? Address { get; set; } 
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        
        public List<Booking> Booking { get; set; } = new List<Booking>();
        public List<Review> Reviews { get; set; } = new List<Review>();
    }
}
