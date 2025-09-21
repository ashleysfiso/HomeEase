using HomeEase.Dtos.BookingDtos;
using HomeEase.Models;
using HomeEase.Utility;
using Microsoft.AspNetCore.Mvc;

namespace HomeEase.Interfaces
{
    public interface IBookingRepository
    {
        public Task<List<Booking>> GetAllAsync();
        public Task<Booking?> GetByIdAsync(int id);
        public Task<List<Booking>> GetByCustomerIdAsync(int customerId);
        public Task<PagedResult<BookingDto>> GetPagedByCustomerIdAsync(int customerId, int skip = 0,
                                                                    int take = 10, string? searchTerm = null);
        public Task<List<Booking>> GetByServiceProviderIdAsync(int serviceProviderId);
        public Task<PagedResult<BookingDto>> GetPagedByProviderIdAsync(int serviceProviderId, int skip = 0, 
                                                                    int take = 10, string? searchTerm=null);
        public Task<ProviderDashboardDto> GetProviderDashboard(int serviceProviderId);
        public Task<AdminDashboardDto> GetAdminDashboard();
        public Task<ApiResponse<Booking>> CreateAsync(Booking booking);
        public Task<Booking?> UpdateAsync(UpdateBookingDto updateBookingDto, int bookingId);
        public Task<Booking?> UpcomingCustomerBooking(int customerId);
        public Task<List<Booking>> GetAllUpcomingCustomerBookings(int customerId);
        public Task<Booking?> UpcomingProviderBooking(int providerId);
        public Task<List<Booking>> GetAllUpcomingProviderBookings(int providerId);
        public Task<List<Booking>> Recent5CustomerBookings(int customerId);
        public Task<List<Booking>> Recent5ProviderBookings(int serviceProviderId);

    }
}
