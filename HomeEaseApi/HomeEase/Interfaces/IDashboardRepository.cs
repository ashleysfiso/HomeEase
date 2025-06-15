using HomeEase.Models;

namespace HomeEase.Interfaces
{
    public interface IDashboardRepository
    {
        public Task<List<Booking>> GetBookingsBySPId(int spId);
    }
}
