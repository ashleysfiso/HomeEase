using HomeEase.Dtos.ReviewDtos;
using HomeEase.Models;

namespace HomeEase.Interfaces
{
    public interface IReviewRepository
    {
        public Task<List<Review>> GetAllAsync();
        public Task<Review?> GetByIdAsync(int id);
        public Task<Review?> CreateAsync(Review review);
        public Task<Review?> UpdateAsync(UpdateReviewDto updateReviewDto, int id);
    }
}
