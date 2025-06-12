using System.Globalization;
using HomeEase.Data;
using HomeEase.Dtos.ReviewDtos;
using HomeEase.Interfaces;
using HomeEase.Models;
using HomeEase.Utility;
using Microsoft.EntityFrameworkCore;

namespace HomeEase.Repository
{
    public class ReviewRepository : IReviewRepository
    {
        private readonly ApplicationDbContext _context;
        public ReviewRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ApiResponse<Review>> CreateAsync(CreateReviewDto dto)
        {
            var booking = await _context.Bookings.FirstOrDefaultAsync(b => b.Id == dto.BookingId);
            if (booking == null)
            {
                return ApiResponse<Review>.Fail("Booking not found with the provided ID.");
            }

            if(await _context.Reviews.AnyAsync(r => r.BookingId == booking.Id))
            {
                return ApiResponse<Review>.Fail("A review has already been submitted for this booking.");
            }
            
            if(DateTime.Now <= booking.BookingDate.ToDateTime(TimeOnly.MinValue))
            {
                return ApiResponse<Review>.Fail("A review can only be submitted after the booking date has passed");
            }

            var review = new Review 
            { 
                BookingId =  booking.Id, 
                ServiceId = booking.ServiceId, 
                ServiceProviderId = booking.ServiceProviderId, 
                CustomerId = booking.CustomerId,
                Comment = dto.Comment, 
                Rating = dto.Rating
            };

            try
            {
                var result = await _context.Reviews.AddAsync(review);
                await _context.SaveChangesAsync();
                return ApiResponse<Review>.Ok(result.Entity);
            }
            catch(Exception ex)
            {
                return ApiResponse<Review>.Fail($"Something went wrong {ex.Message}");
            }
               
        }

        public async Task<Review?> DeleteAsync(int id)
        {
            var review = await _context.Reviews.Include(r => r.Customer).ThenInclude(c => c.User)
                                               .Include(r => r.ServiceOffering).ThenInclude(so => so.ServiceProvider)
                                               .Include(r => r.ServiceOffering).ThenInclude(so => so.Service)
                                               .FirstOrDefaultAsync(r => r.Id == id);

            if (review == null)
            {
                return null;
            }

            review.IsDeleted = true;

            await _context.SaveChangesAsync();

            return review;
        }

        public async Task<List<Review>> GetAllAsync()
        {
            var reviews = await _context.Reviews.Where(r => r.IsDeleted == false)
                                                .Include(r => r.Customer).ThenInclude(c => c.User)
                                                .Include(r => r.ServiceOffering).ThenInclude(so => so.ServiceProvider)
                                                .Include(r => r.ServiceOffering).ThenInclude(so => so.Service)
                                                .ToListAsync();

            return reviews;
        }

        public async Task<Review?> GetByIdAsync(int id)
        {
            var review = await _context.Reviews.Include(r => r.Customer).ThenInclude(c => c.User)
                                               .Include(r => r.ServiceOffering).ThenInclude(so => so.ServiceProvider)
                                               .Include(r => r.ServiceOffering).ThenInclude(so => so.Service)
                                               .FirstOrDefaultAsync(r => r.Id == id);

            if(review == null)
            {
                return null;
            }

            return review;
        }

        public async Task<Review?> UpdateAsync(UpdateReviewDto updateReviewDto, int id)
        {
            var review = await _context.Reviews.Include(r => r.Customer).ThenInclude(c => c.User)
                                               .Include(r => r.ServiceOffering).ThenInclude(so => so.ServiceProvider)
                                               .Include(r => r.ServiceOffering).ThenInclude(so => so.Service)
                                               .FirstOrDefaultAsync(r => r.Id == id);

            if(review == null)
            {
                return null;
            }

            review.Rating = updateReviewDto.Rating;
            review.Comment = updateReviewDto.Comment;

            await _context.SaveChangesAsync();

            return review;
        }
    }
}
