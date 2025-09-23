using HomeEase.Dtos.ReviewDtos;
using HomeEase.Interfaces;
using HomeEase.Mappers;
using HomeEase.Utility;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HomeEase.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        private readonly IReviewRepository _reviewRepository;
        public ReviewsController(IReviewRepository reviewRepo)
        {
            _reviewRepository = reviewRepo;
        }
        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var reviews = await _reviewRepository.GetAllAsync();

            var reviewDto = reviews.Select(r => r.ToReviewDto());

            var totalReviews = reviews.Count;

            var allRatings = Enumerable.Range(1, 5);

            var ratingDistribution = allRatings
                .GroupJoin(
                    reviews,
                    rating => rating,
                    review => review.Rating,
                    (rating, groupedReviews) => new
                    {
                        stars = rating,
                        count = groupedReviews.Count(),
                        percentage = totalReviews > 0
                            ? Math.Round((double)groupedReviews.Count() / totalReviews * 100, 2)
                            : 0
                    }
                )
                .OrderByDescending(r => r.stars)
                .ToList();

            return Ok(new
            {
                reviews = reviewDto,
                distribution = ratingDistribution,
            });
        }
        [Authorize(Roles = "Admin,ServiceProvider")]
        [HttpGet("provider/{providerId:int}")]
        public async Task<IActionResult> GetAllByProviderId([FromRoute] int providerId)
        {
            var reviews = await _reviewRepository.GetByProviderIdAsync(providerId);

            var reviewDto = reviews.Select(r => r.ToReviewDto());

            var totalReviews = reviews.Count;

            var allRatings = Enumerable.Range(1, 5);

            var ratingDistribution = allRatings
                .GroupJoin(
                    reviews,
                    rating => rating,
                    review => review.Rating,
                    (rating, groupedReviews) => new
                    {
                        stars = rating,
                        count = groupedReviews.Count(),
                        percentage = totalReviews > 0
                            ? Math.Round((double)groupedReviews.Count() / totalReviews * 100, 2)
                            : 0
                    }
                )
                .OrderByDescending(r => r.stars)
                .ToList();

            return Ok(new
            {
                reviews = reviewDto,
                distribution = ratingDistribution,
            });
        }
        [Authorize]
        [HttpGet("service-offering/{providerId:int}/{serviceId:int}")]
        public async Task<IActionResult> GetAllByServiceOfferingId([FromRoute] int providerId, [FromRoute] int serviceId)
        {
            var reviews = await _reviewRepository.GetByServiceofferingIdAsync(providerId, serviceId);

            var reviewDto = reviews.Select(r => r.ToReviewDto());

            var totalReviews = reviews.Count;

            var allRatings = Enumerable.Range(1, 5);

            var ratingDistribution = allRatings
                .GroupJoin(
                    reviews,
                    rating => rating,
                    review => review.Rating,
                    (rating, groupedReviews) => new
                    {
                        stars = rating,
                        count = groupedReviews.Count(),
                        percentage = totalReviews > 0
                            ? Math.Round((double)groupedReviews.Count() / totalReviews * 100, 2)
                            : 0
                    }
                )
                .OrderByDescending(r => r.stars)
                .ToList();

            return Ok(new
            {
                reviews = reviewDto,
                distribution = ratingDistribution,
            });
        }

        [Authorize]
        [HttpGet("service-offering/paged/{providerId:int}/{serviceId:int}")]
        public async Task<IActionResult> GetAllPagedByServiceOfferingId([FromRoute] int providerId, 
                                                                        [FromRoute] int serviceId, 
                                                                        [FromQuery] int skip = 0,
                                                                        [FromQuery] int take = 10,
                                                                        [FromQuery] string? searchTerm = null)
        {
            var reviews = await _reviewRepository.GetPagedByProviderIdAsync(providerId, serviceId,skip,take,searchTerm);
            
            return Ok(reviews); 
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var review = await _reviewRepository.GetByIdAsync(id);
            if (review == null)
            {
                return NotFound("Review does not exists. Please check the details and try again");
            }

            return Ok(review.ToReviewDto());
        }
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateReviewDto dto)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest("Invalid data submitted. Please check the details and try again.");
            }

            var result = await _reviewRepository.CreateAsync(dto);
            if (!result.Success)
            {
                return BadRequest(result.Error);
            }

            return Ok($"Review created successfully");
        }
        [Authorize(Roles = "Admin")]
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update([FromBody] UpdateReviewDto updateReviewDto, [FromRoute] int id)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest("Invalid data submitted. Please check the details and try again.");
            }

            var review = await _reviewRepository.UpdateAsync(updateReviewDto, id);

            if(review == null)
            {
                return NotFound("Review does not exists. Please check the details and try again");
            }

            return Ok(review.ToReviewDto());
        }
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid data submitted. Please check the details and try again.");
            }

            var review = await _reviewRepository.DeleteAsync(id);

            if (review == null)
            {
                return NotFound("Review does not exists. Please check the details and try again");
            }

            return Ok(review.ToReviewDto());
        }
    }
}
