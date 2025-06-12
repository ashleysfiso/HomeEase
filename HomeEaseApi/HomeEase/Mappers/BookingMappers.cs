using HomeEase.Dtos.BookingDtos;
using HomeEase.Models;

namespace HomeEase.Mappers
{
    public static class BookingMappers
    {
        public static BookingDto ToBookingDto(this Booking booking)
        {
            return new BookingDto
            {
                Id = booking.Id,
                CustomerName = booking.Customer.User.UserName,
                ServiceName = booking.ServiceOffering.Service.Name,
                ServiceTypeName = booking.ServiceTypeName,
                CompanyName = booking.ServiceOffering.ServiceProvider.CompanyName,
                BookingDate = booking.BookingDate,
                Time = booking.Time,
                Status = booking.Status,
                Size = booking.Size,
                TotalCost = booking.TotalCost,
                CreatedAt = booking.CreatedAt,
                UpdatedAt = booking.UpdatedAt,
                Address = booking.Address,
                Rating = booking.Review?.Rating,
            };
        }

        public static Booking ToBookingModel(this CreateBookingDto bookingDto)
        {
            return new Booking
            {
                CustomerId = bookingDto.CustomerId,
                ServiceId = bookingDto.ServiceId,
                ServiceProviderId = bookingDto.ServiceProviderId,
                ServiceTypeName = bookingDto.ServiceTypeName,
                Size = bookingDto.Size,
                BookingDate = bookingDto.BookingDate,
                Time = bookingDto.Time,
                TotalCost = bookingDto.TotalCost,
                Address = bookingDto.Address,
            };
        }
    }
}
