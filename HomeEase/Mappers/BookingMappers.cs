﻿using HomeEase.Dtos.BookingDtos;
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
                CompanyName = booking.ServiceOffering.ServiceProvider.CompanyName,
                BookingDate = booking.BookingDate,
                Status = booking.Status,
                TotalCost = booking.TotalCost,
                CreatedAt = booking.CreatedAt,
                UpdatedAt = booking.UpdatedAt
            };
        }

        public static Booking ToBookingModel(this CreateBookingDto bookingDto)
        {
            return new Booking
            {
                CustomerId = bookingDto.CustomerId,
                ServiceId = bookingDto.ServiceId,
                ServiceProviderId = bookingDto.ServiceProviderId,
                BookingDate = bookingDto.BookingDate,
                TotalCost = bookingDto.TotalCost
            };
        }
    }
}