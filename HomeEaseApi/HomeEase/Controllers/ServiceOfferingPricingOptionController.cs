using HomeEase.Dtos.ServiceOfferingPricingOptionDtos;
using HomeEase.Interfaces;
using HomeEase.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HomeEase.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceOfferingPricingOptionController : ControllerBase
    {
        private readonly IServiceOfferingPricingOptionRepository _repo;
        public ServiceOfferingPricingOptionController(IServiceOfferingPricingOptionRepository repo)
        {
            _repo = repo;
        }
        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var soPricingOptions = await _repo.GetAllAsync();
            var result =soPricingOptions.Select(sopo => sopo.ToSOPricingOptionDto()).ToList();
            return Ok(result);
        }
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateSOPricingOption createSOPricingOption)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid data submitted. Please check the details and try again.");
            }
            var soPricingOption = await _repo.CreateAsync(createSOPricingOption.FromCreateSOPOToSOPO());
            if(soPricingOption == null)
            {
                return NotFound("Pricing Option for this service offering already exists, or the specified Service Offering/Pricing Option does not exist. Please verify the details and try again.");
            }

            return Ok(soPricingOption);
        }
        [Authorize(Roles = "Admin")]
        [HttpPut]
        public async Task<IActionResult> Update([FromBody] UpdateSOPricingOption updateSOPricingOption)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid data submitted. Please check the details and try again.");
            }
            var soPricingOption = await _repo.UpdateAsync(updateSOPricingOption);
            if (soPricingOption == null)
            {
                return NotFound("Service Offering Pricing Option does not exists. Please check the details and try again");
            }
            return Ok(soPricingOption.ToSOPricingOptionDto());
        }
    }
}
