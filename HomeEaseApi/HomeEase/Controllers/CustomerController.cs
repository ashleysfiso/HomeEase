using HomeEase.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HomeEase.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerRepository _customerRepo;
        public CustomerController(ICustomerRepository customerRepo) 
        {
            _customerRepo = customerRepo;
        }
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var customers = await _customerRepo.GetAllAsync();

            return Ok(customers);
        }
        [Authorize]
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetByUserId([FromRoute] string userId)
        {
            var customer = await _customerRepo.GetByUserIdAsync(userId);

            if (customer == null)
            {
                return BadRequest("Customer does not exists. Please check the details and try again");
            }

            return Ok(customer);
        }
    }
}
