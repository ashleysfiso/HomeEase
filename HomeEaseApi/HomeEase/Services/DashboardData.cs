using System.Globalization;
using System.Linq;
using HomeEase.Dtos.BookingDtos;
using HomeEase.Mappers;
using HomeEase.Models;

namespace HomeEase.Services
{
    public class DashboardData
    {
        public static ProviderDashboardDto ToProviderDashboardData(List<Booking> bookings)
        {
            decimal totalEarnings = bookings
                                    .Where(b => b.Status == "Completed")
                                    .Sum(b => b.TotalCost);
            var now = DateTime.Now;
            int upcomingBookings = bookings
                                   .Where(b =>
                                   {
                                       var bookingDateTime = b.BookingDate.ToDateTime(TimeOnly.MinValue);
                                       return bookingDateTime > now && b.Status != "Completed";
                                   }).Count();

            var currentMonthBookings = bookings
                                       .Where(b => b.BookingDate.Year == now.Year && b.BookingDate.Month == now.Month && b.Status == "Completed")
                                       .ToList();

            int completedServices = bookings
                                    .Where(b => b.Status == "Completed")
                                    .Count();

            var previousMonthBookings = bookings
                .Where(b => b.BookingDate.Year == now.Year && b.BookingDate.Month == now.AddMonths(-1).Month && b.Status == "Completed")
                .ToList();

            decimal currentMonthTotal = currentMonthBookings.Sum(b => b.TotalCost);
            decimal previousMonthTotal = previousMonthBookings.Sum(b => b.TotalCost);

            decimal earningsPercentage = previousMonthTotal == 0 ? 100 : (currentMonthTotal - previousMonthTotal) / previousMonthTotal * 100;

            string earningsDescription = $"{earningsPercentage:+0.0;-0.0;0}% from last month";

            var ratings = bookings.Where(b => b.Review?.Rating != null).Select(b => b.Review.Rating).ToList();
            double averageRating = ratings.Count > 0 ? ratings.Average() : 0;
            int totalReviews = ratings.Count;

            var upcomingBooking = bookings
                                .Where(b =>
                                {
                                    var bookingDateTime = b.BookingDate.ToDateTime(TimeOnly.MinValue);
                                    return bookingDateTime > now && b.Status != "Completed";
                                })
                                .OrderBy(b => DateTime.Parse(b.BookingDate + " " + b.Time))
                                .FirstOrDefault();

            string upcomingDescription = upcomingBooking != null
                                        ? $"Next booking in {(upcomingBooking.BookingDate.ToDateTime(TimeOnly.Parse(upcomingBooking.Time)) - now).TotalHours:F0} hours"
                                        : "No upcoming bookings";
            var startOfWeek = now.Date.AddDays(-(int)now.DayOfWeek); 
            var completedThisWeek = bookings
                .Where(b => b.Status == "Completed" && b.BookingDate.ToDateTime(TimeOnly.MinValue) >= startOfWeek)
                .Count();

            string completedDescription = $"+{completedThisWeek} this week";

            var latest5Bookings = bookings
                                 .OrderByDescending(b => b.CreatedAt)
                                 .Take(5)
                                 .Select(b => b.ToBookingDto())
                                 .ToList();

            var latestReviews = bookings.Where(b => b.Review?.Rating != null)
                                        .OrderByDescending(b => b.Review.CreatedAt)
                                        .Take(5).Select(b => b.Review.ToReviewDto()).ToList();
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------
            // Calculating monthly revenue 
            // Prepare month names
            string[] monthNames = CultureInfo.CurrentCulture.DateTimeFormat.AbbreviatedMonthNames;

            var monthlyRevenue = bookings
                .GroupBy(b => b.BookingDate.Month)
                .Select(g => new MonthlyRevenue
                {
                    Name = monthNames[g.Key - 1],
                    Revenue = g.Sum(b => b.TotalCost)
                })
                .OrderBy(m => DateTime.ParseExact(m.Name, "MMM", CultureInfo.InvariantCulture).Month)
                .ToList();

            // Fill months with zero revenue if missing
            for (int i = 1; i <= 12; i++)
            {
                if (!monthlyRevenue.Any(m => m.Name == monthNames[i - 1]))
                {
                    monthlyRevenue.Add(new MonthlyRevenue { Name = monthNames[i - 1], Revenue = 0 });
                }
            }

            // Re-order after filling
            monthlyRevenue = monthlyRevenue.OrderBy(m => DateTime.ParseExact(m.Name, "MMM", CultureInfo.InvariantCulture).Month).ToList();
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------
            // Calculating Status Count

            var summary = bookings
                               .GroupBy(b => b.Status)
                               .Select(g => new StatusCount
                               {
                                   Name = g.Key,
                                   Value = g.Count()
                               })
                               .ToList();

            //Ensure all statuses are present even if 0
            var allStatuses = new[] { "Completed", "Pending", "Canceled" };

            foreach (var status in allStatuses)
            {
                if (!summary.Any(s => s.Name == status))
                {
                    summary.Add(new StatusCount { Name = status, Value = 0 });
                }
            }

            //Sort by predefined status order
            summary = summary.OrderBy(s => Array.IndexOf(allStatuses, s.Name)).ToList();
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------
            var dashboardData = new ProviderDashboardDto
            {
                TotalEarnings = totalEarnings,
                EarningsDescription = earningsDescription,
                UpcomingBookings = upcomingBookings,
                UpcomingDescription = upcomingDescription,
                CompletedServices = completedServices,
                CompletedDescription = completedDescription,
                AverageRating = averageRating,
                ReviewCount = totalReviews,
                RecentBooking = latest5Bookings,
                LatestReviews = latestReviews,
                MonthlyRevenues = monthlyRevenue,
                StatusCount = summary,
            };
            return dashboardData;
        }
    }

}
