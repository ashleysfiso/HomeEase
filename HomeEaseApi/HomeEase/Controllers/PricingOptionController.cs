using HomeEase.Dtos.PricingOptionDtos;
using HomeEase.Interfaces;
using HomeEase.Mappers;
using HomeEase.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HomeEase.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PricingOptionController : ControllerBase
    {
        private readonly IPricingOptionRepository _repo;
        public PricingOptionController(IPricingOptionRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var pricingOptions = await _repo.GetAll();

            var result = pricingOptions.Where(po => po.IsDeleted == false).Select(po => po.ToPricingOptionDto()).ToList();

            var grouped = result.GroupBy(x => new { x.ServiceTypeName, x.UnitLabel })
                                .Select(group => new
                                {
                                    ServiceType = group.Key.ServiceTypeName,
                                    LabelUnit = group.Key.UnitLabel,
                                    Items = group.Select(item => new
                                    {
                                        item.Id,
                                        item.Name,
                                    }).ToList()
                                })
                                .ToList();
            return Ok(grouped);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var pricingOption = await _repo.GetById(id);
            if(pricingOption == null)
            {
                return NotFound("Pricing Option does not exists. Please check the details and try again");
            }
            return Ok(pricingOption.ToPricingOptionDto());
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreatePricingOptionDto createPricingOptionDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid data submitted. Please check the details and try again.");
            }
            var pricingOption = await _repo.Create(createPricingOptionDto.FromCreateDtoToPriceOption());
            if(pricingOption == null)
            {
                return NotFound("Service Type does not exists. Please check the details and try again");
            }

            return CreatedAtAction(nameof(GetById), new { id = pricingOption.Id }, pricingOption);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdatePricingOptionDto updatePricingOptionDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid data submitted. Please check the details and try again.");
            }

            var pricingOption = await _repo.Update(id, updatePricingOptionDto);
            if(pricingOption == null)
            {
                return NotFound("Service Type does not exists. Please check the details and try again");
            }
            return Ok(pricingOption.ToPricingOptionDto());
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var pricingOption = await _repo.DeleteById(id);
            if (pricingOption == null)
            {
                return BadRequest("Service Type does not exists. Please check the details and try again");
            }

            return Ok(pricingOption);
        }
    }
}
