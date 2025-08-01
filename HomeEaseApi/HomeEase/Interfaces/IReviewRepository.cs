﻿using HomeEase.Dtos.ReviewDtos;
using HomeEase.Models;
using HomeEase.Utility;

namespace HomeEase.Interfaces
{
    public interface IReviewRepository
    {
        public Task<List<Review>> GetAllAsync();
        public Task<List<Review>> GetByProviderIdAsync(int providerId);
        public Task<List<Review>> GetByServiceofferingIdAsync(int providerId, int serviceId);
        public Task<Review?> GetByIdAsync(int id);
        public Task<ApiResponse<Review>> CreateAsync(CreateReviewDto dto);
        public Task<Review?> UpdateAsync(UpdateReviewDto updateReviewDto, int id);
        public Task<Review?> DeleteAsync(int id);
    }
}
