using System.ComponentModel.DataAnnotations;

namespace HomeEase.Dtos.ReviewDtos
{
    public class CreateReviewDto
    {
        [Required]
        public int BookingId { get; set; }
        [Required]
        public int Rating { get; set; } // 1 to 5
        [Required]
        public string Comment { get; set; }
    }
}
