using HomeEase.Dtos.ReviewDtos;
using HomeEase.Interfaces;
using HomeEase.Mappers;
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
        public async Task<IActionResult> Create(CreateReviewDto createReviewDto)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest("Invalid data submitted. Please check the details and try again.");
            }
            var review = createReviewDto.ToReviewFromCreateReviewDto();

            var createdReview = await _reviewRepository.CreateAsync(review);

            return CreatedAtAction(nameof(GetById), new { Id = createdReview.Id }, createdReview);
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
    }
}
