using HomeEase.Data;
using HomeEase.Dtos.BookingDtos;
using HomeEase.Interfaces;
using HomeEase.Models;
using HomeEase.Services;
using HomeEase.Utility;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace HomeEase.Repository
{
    public class BookingRepository : IBookingRepository
    {
        private readonly ApplicationDbContext _context;
        public BookingRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ApiResponse<Booking>> CreateAsync(Booking booking)
        {
            if (!await _context.Customers.AnyAsync(c => c.Id == booking.CustomerId))
            {

                return ApiResponse<Booking>.Fail("Customer not found with the provided ID.");
            }

            if (!await _context.ServiceOfferings.AnyAsync(so => so.ServiceProviderId == booking.ServiceProviderId &&
                                                              so.ServiceId == booking.ServiceId))
            {

                return ApiResponse<Booking>.Fail("Service offering not found for the specified service provider and service.");
            }

            if (DateTime.Now >= booking.BookingDate.ToDateTime(TimeOnly.MinValue))
            {
                return ApiResponse<Booking>.Fail("The booking date cannot be in the past. Please select a date starting from tomorrow.");
            }

            var result = await _context.Bookings.AddAsync(booking);
            await _context.SaveChangesAsync();

            return ApiResponse<Booking>.Ok(result.Entity);
        }


        public async Task<List<Booking>> GetAllAsync()
        {
            var bookings = await _context.Bookings.OrderByDescending(b => b.CreatedAt)
                                                  .Include(b => b.Review)
                                                  .Include(b => b.ServiceOffering).ThenInclude(so => so.ServiceProvider)
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
                                                 .Include(b => b.Review)
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
                                                 .Include(b => b.Review)
                                                 .FirstOrDefaultAsync(b => b.Id == bookingId);

            if(booking == null)
            {
                return null;
            }
            if (updateBookingDto.Status != null)
            {
                booking.Status = updateBookingDto.Status;
            }
            if (updateBookingDto.BookingDate != null)
            {
                booking.BookingDate = (DateOnly)updateBookingDto.BookingDate;
            }
            booking.UpdatedAt = DateTime.Now;

            await _context.SaveChangesAsync();

            return booking;
        }

        public async Task<List<Booking>> GetByCustomerIdAsync(int customerId)
        {
            var bookings = await _context.Bookings.OrderByDescending(b => b.CreatedAt)
                                                  .Include(b => b.Review)
                                                  .Include(b => b.ServiceOffering).ThenInclude(so => so.ServiceProvider)
                                                  .Include(b => b.ServiceOffering).ThenInclude(so => so.Service)
                                                  .Include(b => b.Customer).ThenInclude(c => c.User)
                                                  .Where(b => b.CustomerId == customerId)
                                                  .ToListAsync();
            return bookings;
        }

        public async Task<List<Booking>> GetByServiceProviderIdAsync(int serviceProviderId)
        {
            var bookings = await _context.Bookings.Include(b => b.Review)
                                                  .Include(b => b.ServiceOffering).ThenInclude(so => so.ServiceProvider)
                                                  .Include(b => b.ServiceOffering).ThenInclude(so => so.Service)
                                                  .Include(b => b.Customer).ThenInclude(c => c.User)
                                                  .Where(b => b.ServiceProviderId == serviceProviderId)
                                                  .ToListAsync();
            return bookings;
        }

        public async Task<ProviderDashboardDto> GetProviderDashboard(int serviceProviderId)
        {
            var bookings = await _context.Bookings.Include(b => b.Review)
                                                 .Include(b => b.ServiceOffering).ThenInclude(so => so.ServiceProvider)
                                                 .Include(b => b.ServiceOffering).ThenInclude(so => so.Service)
                                                 .Include(b => b.Customer).ThenInclude(c => c.User)
                                                 .Where(b => b.ServiceProviderId == serviceProviderId)
                                                 .ToListAsync();

            var data = DashboardData.ToProviderDashboardData(bookings);

            return data;
        }

        public async Task<AdminDashboardDto> GetAdminDashboard()
        {
            var bookings = await _context.Bookings.Include(b => b.Review)
                                                 .Include(b => b.ServiceOffering).ThenInclude(so => so.ServiceProvider)
                                                 .Include(b => b.ServiceOffering).ThenInclude(so => so.Service)
                                                 .Include(b => b.Customer).ThenInclude(c => c.User)
                                                 .ToListAsync();

            var serviceProviders = await _context.ServiceProviders.ToListAsync();

            var pendingapprovals = await _context.PendingApprovals.ToListAsync();

            var data = DashboardData.ToAdminDashboardData(bookings, serviceProviders, pendingapprovals);

            return data;
        }
    }
}
