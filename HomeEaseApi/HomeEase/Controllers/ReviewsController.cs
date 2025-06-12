using HomeEase.Dtos.ReviewDtos;
using HomeEase.Interfaces;
using HomeEase.Mappers;
using HomeEase.Utility;
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

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var reviews = await _reviewRepository.GetAllAsync();

            var reviewDto = reviews.Select(r => r.ToReviewDto());

            return Ok(reviewDto);
        }

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
