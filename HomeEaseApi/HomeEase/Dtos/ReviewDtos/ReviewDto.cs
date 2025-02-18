using HomeEase.Models;

namespace HomeEase.Dtos.ReviewDtos
{
    public class ReviewDto
    {
        public int Id { get; set; }
        public string? CustomerName { get; set; } // FK to Customer
        public string? ServiceName { get; set; }
        public string? CompanyName { get; set; }
        public int Rating { get; set; } // 1 to 5
        public string? Comment { get; set; }       
        public DateTime CreatedAt { get; set; }
        
    }
}
