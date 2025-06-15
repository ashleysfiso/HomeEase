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

        [HttpGet("provider/{providerId:int}")]
        public async Task<IActionResult> GetByProviderId([FromRoute] int providerId)
        {
            var bookings = await _bookingRepo.GetByServiceProviderIdAsync(providerId);
            var bookingsDto = bookings.Select(b => b.ToBookingDto());
            return Ok(bookingsDto);
        }
        [HttpGet("provider/dashboard/{providerId:int}")]
        public async Task<IActionResult> GetProviderDashboardData([FromRoute] int providerId)
        {
            var results = await _bookingRepo.GetProviderDashboard(providerId);
            
            return Ok(results);
        }
        [HttpPost]
        public async Task<IActionResult> Create(CreateBookingDto createBookingDto)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest("Invalid data submitted. Please check the details and try again.");
            }

            var result = await _bookingRepo.CreateAsync(createBookingDto.ToBookingModel());

            if(!result.Success)
            {
                return BadRequest(result.Error);
            }

            return CreatedAtAction(nameof(GetById), new {id = result.Data.Id}, result.Data);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(UpdateBookingDto updateBookingDto, [FromRoute] int id)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest("Invalid data submitted. Please check the details and try again.");
            }
            if(updateBookingDto.Status != null)
            {
                if(updateBookingDto.Status != "Cancelled" && updateBookingDto.Status != "Completed")
                {
                    return BadRequest("Invalid Status submitted. Please check the details and try again.");
                }
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
