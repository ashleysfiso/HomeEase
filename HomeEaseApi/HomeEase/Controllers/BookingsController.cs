using HomeEase.Dtos.BookingDtos;
using HomeEase.Interfaces;
using HomeEase.Mappers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HomeEase.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingsController : ControllerBase
    {
        private readonly IBookingRepository _bookingRepo;
        public BookingsController(IBookingRepository bookingRepo)
        {
            _bookingRepo = bookingRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var bookings = await _bookingRepo.GetAllAsync();

            var bookingsDto = bookings.Select(b => b.ToBookingDto());

            return Ok(bookingsDto);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var booking = await _bookingRepo.GetByIdAsync(id);

            if (booking == null)
            {
                return NotFound("Booking does not exists. Please check the details and try again");
            }

            return Ok(booking.ToBookingDto());
        }
        [HttpGet("customer/{customerId:int}")]
        public async Task<IActionResult> GetByCustomerId([FromRoute] int customerId)
        {
            var bookings = await _bookingRepo.GetByCustomerIdAsync(customerId);
            var bookingsDto = bookings.Select(b => b.ToBookingDto());
            return Ok(bookingsDto);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateBookingDto createBookingDto)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest("Invalid data submitted. Please check the details and try again.");
            }

            var booking = await _bookingRepo.CreateAsync(createBookingDto.ToBookingModel());

            return CreatedAtAction(nameof(GetById), new {id = booking.Id}, booking);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(UpdateBookingDto updateBookingDto, [FromRoute] int id)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest("Invalid data submitted. Please check the details and try again.");
            }

            var booking = await _bookingRepo.UpdateAsync(updateBookingDto, id);

            if(booking == null)
            {
                return NotFound("Booking does not exists. Please check the details and try again");
            }

            return Ok(booking.ToBookingDto());
        }

    }
}
