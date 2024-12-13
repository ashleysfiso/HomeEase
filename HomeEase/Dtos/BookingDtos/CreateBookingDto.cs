using System.ComponentModel.DataAnnotations;

namespace HomeEase.Dtos.BookingDtos
{
    public class CreateBookingDto
    {
        [Required]
        public int CustomerId { get; set; }
        [Required]
        public int ServiceId { get; set; }
        [Required]
        public int ServiceProviderId { get; set; }
        [Required]
        public DateTime BookingDate { get; set; }
        [Required]
        public decimal TotalCost { get; set; }
    }
}
