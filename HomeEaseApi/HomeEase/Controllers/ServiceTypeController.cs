using HomeEase.Dtos.ServiceTypeDtos;
using HomeEase.Interfaces;
using HomeEase.Mappers;
using HomeEase.Models;
using HomeEase.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HomeEase.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceTypeController : ControllerBase
    {
        private readonly IServiceTypeRepository _repo;
        public ServiceTypeController(IServiceTypeRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var serviceTypes = await _repo.GetAllAsync();
            var result = serviceTypes.Select(st => st.ToServiceTypeDto());

            return Ok(result);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromBody] int id)
        {
            var serviceType = await _repo.GetByIdAsync(id);
            if (serviceType == null)
            {
                return BadRequest("Service Type does not exists. Please check the details and try again");
            }
            return Ok(serviceType);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateServiceTypeDto createServiceType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid data");
            }

            var serviceType = await _repo.CreateAsync(createServiceType.FromCreateToServiceType());
            if (serviceType == null)
            {
                return BadRequest("Invalid service ID. Please check the details and try again.");
            }
            return CreatedAtAction(nameof(GetById), new { id = serviceType.Id }, serviceType);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateServiceTypeDto updateServiceType)
        {
            var serviceType = await _repo.UpdateAsync(id, updateServiceType);
            if(serviceType == null)
            {
                return BadRequest("Service Type does not exists. Please check the details and try again");
            }

            return Ok(serviceType);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var serviceType = await _repo.DeleteAsync(id);
            if (serviceType == null)
            {
                return BadRequest("Service Type does not exists. Please check the details and try again");
            }

            return Ok(serviceType);
        }

    }
}
