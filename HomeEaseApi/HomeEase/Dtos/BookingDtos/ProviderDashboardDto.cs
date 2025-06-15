using HomeEase.Dtos.ReviewDtos;
using HomeEase.Models;

namespace HomeEase.Dtos.BookingDtos
{
    public class ProviderDashboardDto
    {
        public decimal TotalEarnings { get; set; }
        public int UpcomingBookings { get; set; }
        public int CompletedServices { get; set; }
        public double AverageRating { get; set; }
        public int ReviewCount { get; set; }
        public string EarningsDescription { get; set; }
        public string UpcomingDescription { get; set; }
        public string CompletedDescription { get; set; }
        public List<BookingDto> RecentBooking { get; set; }
        public List<ReviewDto> LatestReviews { get; set; }
        public List<MonthlyRevenue> MonthlyRevenues { get; set; }
        public List<StatusCount> StatusCount { get; set; }
    }

    public class MonthlyRevenue
    {
        public string Name { get; set; }
        public decimal Revenue { get; set; }
    }

    public class StatusCount
    {
        public string Name { get; set; }
        public int Value { get; set; }
    }
}
