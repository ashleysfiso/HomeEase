using HomeEase.Dtos.ServiceProviderDtos;
using HomeEase.Interfaces;
using HomeEase.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HomeEase.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceProvidersController : ControllerBase
    {
        private readonly IServiceProviderRepository _repo;
        public ServiceProvidersController(IServiceProviderRepository repo) 
        {
            _repo = repo;
        }
        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var serviceProviders = await _repo.GetAllAsync();
            var result = serviceProviders.Select(sp => sp.ToServiceProviderDto()).ToList();
            return Ok(result);
        }
        [Authorize(Roles = "Admin,ServiceProvider")]
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateServiceProvicerDto updateDto)
        {
            var serviceProvider = await _repo.UpdateAsync(id, updateDto);
            if(serviceProvider == null)
            {
                return NotFound("Service Provider does not exists. Please check the details and try again");
            }

            return Ok(serviceProvider.ToServiceProviderDto()); 
        }
    }
}
