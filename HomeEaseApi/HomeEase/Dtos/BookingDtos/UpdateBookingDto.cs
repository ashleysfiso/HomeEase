using System.ComponentModel.DataAnnotations;

namespace HomeEase.Dtos.BookingDtos
{
    public class UpdateBookingDto
    {
        [Required]
        public DateOnly BookingDate { get; set; }
        [Required]
        public string Status { get; set; }
    }
}
