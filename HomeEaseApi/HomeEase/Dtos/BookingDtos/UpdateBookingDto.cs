using System.ComponentModel.DataAnnotations;

namespace HomeEase.Dtos.BookingDtos
{
    public class UpdateBookingDto
    {
        
        public DateOnly? BookingDate { get; set; }
        public string? Status { get; set; }
    }
}
