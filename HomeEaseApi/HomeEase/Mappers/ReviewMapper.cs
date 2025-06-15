using HomeEase.Dtos.ReviewDtos;
using HomeEase.Models;
using Microsoft.Extensions.DependencyInjection;

namespace HomeEase.Mappers
{
    public static class ReviewMapper
    {
        public static ReviewDto ToReviewDto(this Review review)
        {
            return new ReviewDto
            {
                Id = review.Id,
                CustomerName = $"{review.Customer.User?.FirstName} {review.Customer.User?.LastName}",
                ServiceName = review.ServiceOffering.Service.Name,
                CompanyName = review.ServiceOffering.ServiceProvider.CompanyName,
                Rating = review.Rating,
                Comment = review.Comment,
                CreatedAt = review.CreatedAt
            };
        }

        public static Review ToReviewFromCreateReviewDto(this CreateReviewDto createReviewDto)
        {
            return new Review
            {
                BookingId = createReviewDto.BookingId,
                Rating = createReviewDto.Rating,
                Comment = createReviewDto.Comment
            };
        }
    }
}
