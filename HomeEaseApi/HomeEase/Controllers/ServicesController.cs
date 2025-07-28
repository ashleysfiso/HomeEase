using HomeEase.Dtos.ServiceDto;
using HomeEase.Interfaces;
using HomeEase.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HomeEase.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServicesController : Controller
    {
        private readonly IServiceRepository _serviceRepo;
        public ServicesController(IServiceRepository serviceRepo)
        {
            _serviceRepo = serviceRepo;
        }
        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var sevices = await _serviceRepo.GetServicesAsync();
            return Ok(sevices.Select(s => s.ToServiceDto()));
        }
        [Authorize(Roles = "Admin")]
        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var service = await _serviceRepo.GetServiceAsync(id);

            if (service == null)
            {
                return NotFound("Invalid Id");
            }

            return Ok(service.ToServiceDto());
        }
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateServiceDto createServiceDto)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest("Invalid data");
            }

            var serviceModel = createServiceDto.ToService();
            await _serviceRepo.CreateServiceAsync(serviceModel);

            return CreatedAtAction(nameof(GetById), new { id = serviceModel.Id }, serviceModel.ToServiceDto());
        }
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id ,UpdateServiceDto updateServiceDto)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest("Invalid data");
            }

            var updatedService = await _serviceRepo.UpdateServiceAsync(id,updateServiceDto);

            if(updatedService == null)
            { 
                return NotFound();
            }

            return Ok(updatedService);
        }
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var serviceModel = await _serviceRepo.DeleteServiceAsync(id);

            if(serviceModel == null)
            {
                return NotFound("Invalid service id");
            }

            return Ok(serviceModel);
        }
        
    }
}
