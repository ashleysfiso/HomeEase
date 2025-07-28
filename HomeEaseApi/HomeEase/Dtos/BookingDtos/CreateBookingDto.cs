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
        public string ServiceTypeName { get; set; }
        [Required]
        public string Size { get; set; }
        [Required]
        public DateOnly BookingDate { get; set; }
        [Required]
        [RegularExpression(@"^(?:[01]\d|2[0-3]):[0-5]\d$", ErrorMessage = "Time must be in 24-hour format (HH:mm)")]
        public string Time { get; set; }
        [Required]
        public decimal TotalCost { get; set; }
        [Required]
        public string Address { get; set; }
    }
}
