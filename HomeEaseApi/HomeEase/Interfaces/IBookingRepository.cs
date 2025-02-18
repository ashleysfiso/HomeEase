using HomeEase.Dtos.BookingDtos;
using HomeEase.Models;
using Microsoft.AspNetCore.Mvc;

namespace HomeEase.Interfaces
{
    public interface IBookingRepository
    {
        public Task<List<Booking>> GetAllAsync();
        public Task<Booking?> GetByIdAsync(int id);
        public Task<Booking?> CreateAsync(Booking booking);
        public Task<Booking?> UpdateAsync(UpdateBookingDto updateBookingDto, int bookingId);
    }
}
