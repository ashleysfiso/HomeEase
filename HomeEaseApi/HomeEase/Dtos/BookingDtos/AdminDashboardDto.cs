using HomeEase.Models;

namespace HomeEase.Dtos.BookingDtos
{
    public class AdminDashboardDto
    {
        public decimal TotalRevenue { get; set; }
        public int TotalBookings { get; set; }
        public int ActiveProviders { get; set; }
        public int PendingApprovals { get; set; }
        public double AverageRating { get; set; }
        public int ReviewCount { get; set; }
        public string RevenueDescription { get; set; }
        public string TotalBookingsDescription { get; set; }
        public string ActiveProvidersDescription { get; set; }
        public string PendingApprovalsDescription { get; set; }
        public List<MonthlyRevenue> MonthlyRevenues { get; set; }
        public List<ServiceBookingCount> ServiceDemands { get; set; }
        public List<StatusCount> StatusCount { get; set; }
        public List<BookingDto> RecentBookings { get; set; }
        public List<PendingApproval> LatestPendingApprovals { get; set; }
    }

    public class ServiceBookingCount
    {
        public string Name { get; set; }
        public decimal Bookings { get; set; }
    }
}
