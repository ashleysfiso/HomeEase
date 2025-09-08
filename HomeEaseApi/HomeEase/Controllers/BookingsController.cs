namespace HomeEase.Controllers
{
    using HomeEase.Dtos.BookingDtos;
    using HomeEase.Interfaces;
    using HomeEase.Mappers;
    using HomeEase.Models;
    using HomeEase.Repository;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    /// <summary>
    /// Defines the <see cref="BookingsController" />
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class BookingsController : ControllerBase
    {
        private readonly IBookingRepository _bookingRepo;
        private readonly AuditQueue _auditQueue;

        public BookingsController(IBookingRepository bookingRepo, AuditQueue auditQueue)
        {
            _bookingRepo = bookingRepo;
            _auditQueue = auditQueue;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var bookings = await _bookingRepo.GetAllAsync();

            var bookingsDto = bookings.Select(b => b.ToBookingDto());

            return Ok(bookingsDto);
        }

        [Authorize(Roles = "Admin")]
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

        /// <summary>
        /// The GetByCustomerId
        /// </summary>
        /// <param name="customerId">The customerId<see cref="int"/></param>
        /// <returns>The <see cref="Task{IActionResult}"/></returns>
        /// 
        [Authorize(Roles = "Customer")]
        [HttpGet("customer/{customerId:int}")]
        public async Task<IActionResult> GetByCustomerId([FromRoute] int customerId)
        {
            var bookings = await _bookingRepo.GetByCustomerIdAsync(customerId);
            var bookingsDto = bookings.Select(b => b.ToBookingDto());
            return Ok(bookingsDto);
        }

        [Authorize(Roles = "Customer")]
        [HttpGet("customer/recent5/{customerId:int}")]
        public async Task<IActionResult> GetByCustomerIdRecent([FromRoute] int customerId)
        {
            var bookings = await _bookingRepo.Recent5CustomerBookings(customerId);
            var bookingsDto = bookings.Select(b => b.ToBookingDto());
            return Ok(bookingsDto);
        }

        [Authorize(Roles = "Customer")]
        [HttpGet("upcoming/customer/{customerId:int}")]
        public async Task<IActionResult> GetUpcomingByCustomerId([FromRoute] int customerId)
        {
            var booking = await _bookingRepo.UpcomingCustomerBooking(customerId);
            if (booking == null) return Ok("No Upcoming Booking");
            return Ok(new { Name = booking.ServiceTypeName, Date = booking.BookingDate, Time = booking.Time });
        }

        [Authorize(Roles = "ServiceProvider")]
        [HttpGet("upcoming/provider/{providerId:int}")]
        public async Task<IActionResult> GetUpcomingByProviderId([FromRoute] int providerId)
        {
            var booking = await _bookingRepo.UpcomingProviderBooking(providerId);
            if (booking == null) return Ok("No Upcoming Booking");
            return Ok(new { Name = booking.ServiceTypeName, Date = booking.BookingDate, Time = booking.Time });
        }

        /// <summary>
        /// The GetByProviderId
        /// </summary>
        /// <param name="providerId">The providerId<see cref="int"/></param>
        /// <returns>The <see cref="Task{IActionResult}"/></returns>
        /// 
        [Authorize(Roles = "Admin,ServiceProvider")]
        [HttpGet("provider/{providerId:int}")]
        public async Task<IActionResult> GetByProviderId([FromRoute] int providerId)
        {
            var bookings = await _bookingRepo.GetByServiceProviderIdAsync(providerId);
            var bookingsDto = bookings.Select(b => b.ToBookingDto());
            return Ok(bookingsDto);
        }

        [Authorize(Roles = "Admin,ServiceProvider")]
        [HttpGet("provider/recent5/{providerId:int}")]
        public async Task<IActionResult> GetByProviderIdRecent([FromRoute] int providerId)
        {
            var bookings = await _bookingRepo.Recent5ProviderBookings(providerId);
            var bookingsDto = bookings.Select(b => b.ToBookingDto());
            return Ok(bookingsDto);
        }

        /// <summary>
        /// The GetProviderDashboardData
        /// </summary>
        /// <param name="providerId">The providerId<see cref="int"/></param>
        /// <returns>The <see cref="Task{IActionResult}"/></returns>
        /// 
        [Authorize(Roles = "Admin,ServiceProvider")]
        [HttpGet("provider/dashboard/{providerId:int}")]
        public async Task<IActionResult> GetProviderDashboardData([FromRoute] int providerId)
        {
            var results = await _bookingRepo.GetProviderDashboard(providerId);

            return Ok(results);
        }

        /// <summary>
        /// The GetAdminDashboardData
        /// </summary>
        /// <param name="providerId">The providerId<see cref="int"/></param>
        /// <returns>The <see cref="Task{IActionResult}"/></returns>
        /// 
        [Authorize(Roles = "Admin")]
        [HttpGet("provider/dashboard/admin")]
        public async Task<IActionResult> GetAdminDashboardData([FromRoute] int providerId)
        {
            var results = await _bookingRepo.GetAdminDashboard();

            return Ok(results);
        }

        /// <summary>
        /// The Create
        /// </summary>
        /// <param name="createBookingDto">The createBookingDto<see cref="CreateBookingDto"/></param>
        /// <returns>The <see cref="Task{IActionResult}"/></returns>
        /// 
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create(CreateBookingDto createBookingDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid data submitted. Please check the details and try again.");
            }

            var result = await _bookingRepo.CreateAsync(createBookingDto.ToBookingModel());

            if (!result.Success)
            {
                return BadRequest(result.Error);
            }

            return CreatedAtAction(nameof(GetById), new { id = result.Data.Id }, result.Data);
        }

        /// <summary>
        /// The Update
        /// </summary>
        /// <param name="updateBookingDto">The updateBookingDto<see cref="UpdateBookingDto"/></param>
        /// <param name="id">The id<see cref="int"/></param>
        /// <returns>The <see cref="Task{IActionResult}"/></returns>
        /// 
        [Authorize(Roles = "Admin,ServiceProvider")]
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(UpdateBookingDto updateBookingDto, [FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid data submitted. Please check the details and try again.");
            }
            if (updateBookingDto.Status != null)
            {
                if (updateBookingDto.Status != "Cancelled" && updateBookingDto.Status != "Completed")
                {
                    return BadRequest("Invalid Status submitted. Please check the details and try again.");
                }
            }

            var booking = await _bookingRepo.UpdateAsync(updateBookingDto, id);

            if (booking == null)
            {
                return NotFound("Booking does not exists. Please check the details and try again");
            }

            return Ok(booking.ToBookingDto());
        }
    }
}
