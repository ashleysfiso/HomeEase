using System.ComponentModel.DataAnnotations;

namespace HomeEase.Dtos.BookingDtos
{
    public class UpdateBookingDto
    {
        [Required]
        public DateTime BookingDate { get; set; }
        [Required]
        public string Status { get; set; }
    }
}
