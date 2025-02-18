using System.ComponentModel.DataAnnotations;

namespace HomeEase.Dtos.ReviewDtos
{
    public class UpdateReviewDto
    {
        [Required]
        public int Rating { get; set; } // 1 to 5
        [Required]
        public string Comment { get; set; }
    }
}
