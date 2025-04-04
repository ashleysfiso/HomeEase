using HomeEase.Data;
using HomeEase.Dtos.BookingDtos;
using HomeEase.Interfaces;
using HomeEase.Models;
using Microsoft.EntityFrameworkCore;

namespace HomeEase.Repository
{
    public class BookingRepository : IBookingRepository
    {
        private readonly ApplicationDbContext _context;
        public BookingRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Booking?> CreateAsync(Booking booking)
        {
            
            var result = await _context.Bookings.AddAsync(booking);
            await _context.SaveChangesAsync();

            return result.Entity;
        }


        public async Task<List<Booking>> GetAllAsync()
        {
            var bookings = await _context.Bookings.Include(b => b.ServiceOffering).ThenInclude(so => so.ServiceProvider)
                                                  .Include(b => b.ServiceOffering).ThenInclude(so => so.Service)
                                                  .Include(b => b.Customer).ThenInclude(c => c.User)
                                                  .ToListAsync();
            return bookings;
        }

        public async Task<Booking?> GetByIdAsync(int id)
        {
            var booking = await _context.Bookings.Include(b => b.ServiceOffering).ThenInclude(so => so.ServiceProvider)
                                                 .Include(b => b.ServiceOffering).ThenInclude(so => so.Service)
                                                 .Include(b => b.Customer).ThenInclude(c => c.User)
                                                 .FirstOrDefaultAsync(b => b.Id == id);
            if(booking == null)
            {
                return null;
            }
            return booking;
        }

        public async Task<bool> Exist(int id)
        {
            return await _context.Bookings.AnyAsync(b => b.Id == id);
        }

        public async Task<Booking?> UpdateAsync(UpdateBookingDto updateBookingDto, int bookingId)
        {
            var booking = await _context.Bookings.Include(b => b.ServiceOffering).ThenInclude(so => so.ServiceProvider)
                                                 .Include(b => b.ServiceOffering).ThenInclude(so => so.Service)
                                                 .Include(b => b.Customer).ThenInclude(c => c.User)
                                                 .FirstOrDefaultAsync(b => b.Id == bookingId);

            if(booking == null)
            {
                return null;
            }

            booking.Status = updateBookingDto.Status;
            booking.BookingDate = updateBookingDto.BookingDate;
            booking.UpdatedAt = DateTime.Now;

            await _context.SaveChangesAsync();

            return booking;
        }

        public async Task<List<Booking>> GetByCustomerIdAsync(int customerId)
        {
            var bookings = await _context.Bookings.Include(b => b.ServiceOffering).ThenInclude(so => so.ServiceProvider)
                                                  .Include(b => b.ServiceOffering).ThenInclude(so => so.Service)
                                                  .Include(b => b.Customer).ThenInclude(c => c.User)
                                                  .Where(b => b.CustomerId == customerId)
                                                  .ToListAsync();
            return bookings;
        }

        public async Task<List<Booking>> GetByServiceProviderIdAsync(int serviceProviderId)
        {
            var bookings = await _context.Bookings.Include(b => b.ServiceOffering).ThenInclude(so => so.ServiceProvider)
                                                  .Include(b => b.ServiceOffering).ThenInclude(so => so.Service)
                                                  .Include(b => b.Customer).ThenInclude(c => c.User)
                                                  .Where(b => b.ServiceProviderId == serviceProviderId)
                                                  .ToListAsync();
            return bookings;
        }
    }
}
