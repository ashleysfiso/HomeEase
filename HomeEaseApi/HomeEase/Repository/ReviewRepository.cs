namespace HomeEase.Repository
{
    using HomeEase.Data;
    using HomeEase.Dtos.ReviewDtos;
    using HomeEase.Interfaces;
    using HomeEase.Mappers;
    using HomeEase.Models;
    using HomeEase.Utility;
    using Microsoft.EntityFrameworkCore;

    /// <summary>
    /// Defines the <see cref="ReviewRepository" />
    /// </summary>
    public class ReviewRepository : IReviewRepository
    {
        /// <summary>
        /// Defines the _context
        /// </summary>
        private readonly ApplicationDbContext _context;

        /// <summary>
        /// Initializes a new instance of the <see cref="ReviewRepository"/> class.
        /// </summary>
        /// <param name="context">The context<see cref="ApplicationDbContext"/></param>
        public ReviewRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// The CreateAsync
        /// </summary>
        /// <param name="dto">The dto<see cref="CreateReviewDto"/></param>
        /// <returns>The <see cref="Task{ApiResponse{Review}}"/></returns>
        public async Task<ApiResponse<Review>> CreateAsync(CreateReviewDto dto)
        {
            var booking = await _context.Bookings.FirstOrDefaultAsync(b => b.Id == dto.BookingId);
            if(dto.Rating < 1 || dto.Rating > 5)
            {
                return ApiResponse<Review>.Fail("Invalid Rating.");
            }

            if (booking == null)
            {
                return ApiResponse<Review>.Fail("Booking not found with the provided ID.");
            }

            if (await _context.Reviews.AnyAsync(r => r.BookingId == booking.Id))
            {
                return ApiResponse<Review>.Fail("A review has already been submitted for this booking.");
            }

            if (DateTime.Now <= booking.BookingDate.ToDateTime(TimeOnly.MinValue))
            {
                return ApiResponse<Review>.Fail("A review can only be submitted after the booking date has passed");
            }

            var review = new Review
            {
                BookingId = booking.Id,
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
            catch (Exception ex)
            {
                return ApiResponse<Review>.Fail($"Something went wrong {ex.Message}");
            }
        }

        /// <summary>
        /// The DeleteAsync
        /// </summary>
        /// <param name="id">The id<see cref="int"/></param>
        /// <returns>The <see cref="Task{Review?}"/></returns>
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

        /// <summary>
        /// The GetAllAsync
        /// </summary>
        /// <returns>The <see cref="Task{List{Review}}"/></returns>
        public async Task<List<Review>> GetAllAsync()
        {
            var reviews = await _context.Reviews.Where(r => r.IsDeleted == false)
                                                .Include(r => r.Customer).ThenInclude(c => c.User)
                                                .Include(r => r.ServiceOffering).ThenInclude(so => so.ServiceProvider)
                                                .Include(r => r.ServiceOffering).ThenInclude(so => so.Service)
                                                .ToListAsync();

            return reviews;
        }

        /// <summary>
        /// The GetByIdAsync
        /// </summary>
        /// <param name="id">The id<see cref="int"/></param>
        /// <returns>The <see cref="Task{Review?}"/></returns>
        public async Task<Review?> GetByIdAsync(int id)
        {
            var review = await _context.Reviews.Include(r => r.Customer).ThenInclude(c => c.User)
                                               .Include(r => r.ServiceOffering).ThenInclude(so => so.ServiceProvider)
                                               .Include(r => r.ServiceOffering).ThenInclude(so => so.Service)
                                               .FirstOrDefaultAsync(r => r.Id == id);

            if (review == null)
            {
                return null;
            }

            return review;
        }

        /// <summary>
        /// The GetByProviderIdAsync
        /// </summary>
        /// <param name="providerId">The providerId<see cref="int"/></param>
        /// <returns>The <see cref="Task{List{Review}}"/></returns>
        public async Task<List<Review>> GetByProviderIdAsync(int providerId)
        {
            var reviews = await _context.Reviews.Include(r => r.Customer).ThenInclude(c => c.User)
                                              .Include(r => r.ServiceOffering).ThenInclude(so => so.ServiceProvider)
                                              .Include(r => r.ServiceOffering).ThenInclude(so => so.Service)
                                              .Where(r => r.ServiceProviderId == providerId && r.IsDeleted == false).ToListAsync();

            return reviews;
        }

        /// <summary>
        /// The GetByServiceofferingIdAsync
        /// </summary>
        /// <param name="providerId">The providerId<see cref="int"/></param>
        /// <param name="serviceId">The serviceId<see cref="int"/></param>
        /// <returns>The <see cref="Task{List{Review}}"/></returns>
        public async Task<List<Review>> GetByServiceofferingIdAsync(int providerId, int serviceId)
        {
            var reviews = await _context.Reviews.Include(r => r.Customer).ThenInclude(c => c.User)
                                                .Include(r => r.ServiceOffering).ThenInclude(so => so.ServiceProvider)
                                                .Include(r => r.ServiceOffering).ThenInclude(so => so.Service)
                                                .Where(r => r.ServiceOffering.ServiceProviderId == providerId &&
                                                            r.ServiceOffering.ServiceId == serviceId
                                                            && r.IsDeleted == false)
                                                .ToListAsync();

            return reviews;
        }

        public async Task<PagedReviews<ReviewDto>> GetPagedByProviderIdAsync(int providerId = 0, int serviceId = 0, int skip = 0, int take = 10, string? searchTerm = null)
        {
            var query = _context.Reviews.Include(r => r.Customer).ThenInclude(c => c.User)
                                        .Include(r => r.ServiceOffering).ThenInclude(so => so.ServiceProvider)
                                        .Include(r => r.ServiceOffering).ThenInclude(so => so.Service)
                                        .Where(r => r.ServiceOffering.ServiceProviderId == providerId &&
                                                    r.ServiceOffering.ServiceId == serviceId
                                                    && r.IsDeleted == false)
                                        .AsQueryable();

            var averageRating = await query.AnyAsync() ? await query.AverageAsync(r => r.Rating) : 0;

            if (!string.IsNullOrEmpty(searchTerm))
            {
                query = query.Where(r => r.Customer.User.FirstName.Contains(searchTerm) ||
                                         r.Customer.User.LastName.Contains(searchTerm) ||
                                         r.Comment.Contains(searchTerm));
            }

            var totalCount = await query.CountAsync();

            var items = await query.Select(r => r.ToReviewDto()).ToListAsync();

            return new PagedReviews<ReviewDto>
            {
                Items = items,
                AverageRating = Math.Round(averageRating, 2, MidpointRounding.AwayFromZero),
                TotalCount = totalCount,
                PageNumber = (skip / take) + 1,
                PageSize = take,
            };
        }

        /// <summary>
        /// The UpdateAsync
        /// </summary>
        /// <param name="updateReviewDto">The updateReviewDto<see cref="UpdateReviewDto"/></param>
        /// <param name="id">The id<see cref="int"/></param>
        /// <returns>The <see cref="Task{Review?}"/></returns>
        public async Task<Review?> UpdateAsync(UpdateReviewDto updateReviewDto, int id)
        {
            var review = await _context.Reviews.Include(r => r.Customer).ThenInclude(c => c.User)
                                               .Include(r => r.ServiceOffering).ThenInclude(so => so.ServiceProvider)
                                               .Include(r => r.ServiceOffering).ThenInclude(so => so.Service)
                                               .FirstOrDefaultAsync(r => r.Id == id);

            if (review == null)
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
