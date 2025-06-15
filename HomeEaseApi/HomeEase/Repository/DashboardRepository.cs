using HomeEase.Data;
using HomeEase.Interfaces;
using HomeEase.Models;
using Microsoft.EntityFrameworkCore;

namespace HomeEase.Repository
{
    public class DashboardRepository(ApplicationDbContext context) : IDashboardRepository
    {
        private readonly ApplicationDbContext _context = context;

        public async Task<List<Booking>> GetBookingsBySPId(int spId)
        {
            var bookings = await _context.Bookings.Where(b => b.ServiceProviderId == spId).ToListAsync();
            
            return bookings;
        }
    }
}
