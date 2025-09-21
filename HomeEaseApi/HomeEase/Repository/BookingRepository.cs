using HomeEase.Data;
using HomeEase.Dtos.BookingDtos;
using HomeEase.Dtos.ServiceOfferingDtos;
using HomeEase.Interfaces;
using HomeEase.Mappers;
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

        public async Task<Booking?> UpcomingCustomerBooking(int customerId)
        {
            var today = DateOnly.FromDateTime(DateTime.Now);
            var nextBooking = await _context.Bookings
                                            .Include(b => b.Review)
                                            .Include(b => b.ServiceOffering).ThenInclude(so => so.ServiceProvider)
                                            .Include(b => b.ServiceOffering).ThenInclude(so => so.Service)
                                            .Include(b => b.Customer).ThenInclude(c => c.User)
                                            .Where(b => b.CustomerId == customerId && b.BookingDate >= today)
                                            .OrderBy(b => b.BookingDate)
                                            .FirstOrDefaultAsync();
            return nextBooking;
        }

        public async Task<Booking?> UpcomingProviderBooking(int providerId)
        {
            var today = DateOnly.FromDateTime(DateTime.Now);
            var nextBooking = await _context.Bookings
                                           .Include(b => b.Review)
                                           .Include(b => b.ServiceOffering).ThenInclude(so => so.ServiceProvider)
                                           .Include(b => b.ServiceOffering).ThenInclude(so => so.Service)
                                           .Include(b => b.Customer).ThenInclude(c => c.User)
                                           .Where(b => b.ServiceProviderId == providerId && b.BookingDate >= today)
                                           .OrderBy(b => b.BookingDate)
                                           .FirstOrDefaultAsync();
            return nextBooking;
        }

        public async Task<List<Booking>> Recent5CustomerBookings(int customerId)
        {
            var bookings = await _context.Bookings.OrderByDescending(b => b.CreatedAt)
                                                  .Include(b => b.Review)
                                                  .Include(b => b.ServiceOffering).ThenInclude(so => so.ServiceProvider)
                                                  .Include(b => b.ServiceOffering).ThenInclude(so => so.Service)
                                                  .Include(b => b.Customer).ThenInclude(c => c.User)
                                                  .Where(b => b.CustomerId == customerId)
                                                  .Take(3)
                                                  .ToListAsync();
            return bookings;
        }

        public async Task<List<Booking>> Recent5ProviderBookings(int serviceProviderId)
        {
            var bookings = await _context.Bookings.OrderByDescending(b => b.CreatedAt)
                                                  .Include(b => b.Review)
                                                  .Include(b => b.ServiceOffering).ThenInclude(so => so.ServiceProvider)
                                                  .Include(b => b.ServiceOffering).ThenInclude(so => so.Service)
                                                  .Include(b => b.Customer).ThenInclude(c => c.User)
                                                  .Where(b => b.ServiceProviderId == serviceProviderId)
                                                  .Take(3)
                                                  .ToListAsync();

            return bookings;
        }

        public async Task<PagedResult<BookingDto>> GetPagedByCustomerIdAsync(int customerId, int skip = 0, int take = 10, string? searchTerm = null)
        {
            var query = _context.Bookings.OrderByDescending(b => b.CreatedAt)
                                         .Include(b => b.Review)
                                         .Include(b => b.ServiceOffering).ThenInclude(so => so.ServiceProvider)
                                         .Include(b => b.ServiceOffering).ThenInclude(so => so.Service)
                                         .Include(b => b.Customer).ThenInclude(c => c.User)
                                         .Where(b => b.CustomerId == customerId)
                                         .AsQueryable();

            if (!string.IsNullOrEmpty(searchTerm))
            {
                query = query.Where(b => b.ServiceOffering.Service.Name.Contains(searchTerm) || 
                                         b.ServiceOffering.ServiceProvider.CompanyName.Contains(searchTerm));
            }

            var totalCount = await query.CountAsync();

            var items = await query.Skip(skip)
                                   .Take(take)
                                   .Select(b => b.ToBookingDto())
                                   .ToListAsync();

            return new PagedResult<BookingDto>
            {
                Items = items,
                TotalCount = totalCount,
                PageNumber = (skip / take) + 1,
                PageSize = take
            };
        }

        public async Task<PagedResult<BookingDto>> GetPagedByProviderIdAsync(int serviceProviderId, int skip = 0, int take = 10, string? searchTerm = null)
        {
            var query = _context.Bookings.OrderByDescending(b => b.CreatedAt)
                                         .Include(b => b.Review)
                                         .Include(b => b.ServiceOffering).ThenInclude(so => so.ServiceProvider)
                                         .Include(b => b.ServiceOffering).ThenInclude(so => so.Service)
                                         .Include(b => b.Customer).ThenInclude(c => c.User)
                                         .Where(b => b.ServiceProviderId == serviceProviderId)
                                         .AsQueryable();

            if (!string.IsNullOrEmpty(searchTerm))
            {
                query = query.Where(b => b.ServiceOffering.Service.Name.Contains(searchTerm) ||
                                         b.Customer.User.FirstName.Contains(searchTerm) ||
                                         b.Customer.User.LastName.Contains(searchTerm));
            }

            var totalCount = await query.CountAsync();

            var items = await query.Skip(skip)
                                   .Take(take)
                                   .Select(b => b.ToBookingDto())
                                   .ToListAsync();

            return new PagedResult<BookingDto>
            {
                Items = items,
                TotalCount = totalCount,
                PageNumber = (skip / take) + 1,
                PageSize = take
            };
        }

        public async Task<List<Booking>> GetAllUpcomingCustomerBookings(int customerId)
        {
            var today = DateOnly.FromDateTime(DateTime.Now);
            var bookings = await _context.Bookings
                                            .Include(b => b.Review)
                                            .Include(b => b.ServiceOffering).ThenInclude(so => so.ServiceProvider)
                                            .Include(b => b.ServiceOffering).ThenInclude(so => so.Service)
                                            .Include(b => b.Customer).ThenInclude(c => c.User)
                                            .Where(b => b.CustomerId == customerId && b.BookingDate >= today)
                                            .OrderBy(b => b.BookingDate)
                                            .ToListAsync();
            return bookings;
        }

        public async Task<List<Booking>> GetAllUpcomingProviderBookings(int providerId)
        {
            var today = DateOnly.FromDateTime(DateTime.Now);
            var bookings = await _context.Bookings
                                           .Include(b => b.Review)
                                           .Include(b => b.ServiceOffering).ThenInclude(so => so.ServiceProvider)
                                           .Include(b => b.ServiceOffering).ThenInclude(so => so.Service)
                                           .Include(b => b.Customer).ThenInclude(c => c.User)
                                           .Where(b => b.ServiceProviderId == providerId && b.BookingDate >= today)
                                           .OrderBy(b => b.BookingDate)
                                           .ToListAsync();
            return bookings;
        }
    }
}
