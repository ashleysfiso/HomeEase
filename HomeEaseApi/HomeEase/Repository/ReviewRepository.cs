using HomeEase.Data;
using HomeEase.Dtos.ReviewDtos;
using HomeEase.Interfaces;
using HomeEase.Models;
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

        public async Task<Review?> CreateAsync(Review review)
        {
            await _context.Reviews.AddAsync(review);
            await _context.SaveChangesAsync();

            return review;
        }

        public async Task<List<Review>> GetAllAsync()
        {
            var reviews = await _context.Reviews.Include(r => r.Customer).ThenInclude(c => c.User)
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
