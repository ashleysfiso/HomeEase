﻿using HomeEase.Dtos.ServiceOfferingDtos;
using HomeEase.Interfaces;
using HomeEase.Mappers;
using HomeEase.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HomeEase.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceOfferingsController : ControllerBase
    {
        private readonly IServiceOfferingRepository _serviceOfferingRepo;
        public ServiceOfferingsController(IServiceOfferingRepository serviceOfferingRepo)
        {
            _serviceOfferingRepo = serviceOfferingRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var serviceOfferings = await _serviceOfferingRepo.GetAllAsync();

            return Ok(serviceOfferings.Select(so => so.ToServiceOfferingDto()));
        }

        [HttpGet("{serviceProviderId:int}")]

        public async Task<IActionResult> GetAllByServiceProviderId([FromRoute] int serviceProviderId)
        {
            var serviceOfferings = await _serviceOfferingRepo.GetAllByServiceProviderId(serviceProviderId);

            return Ok(serviceOfferings.Select(so => so.ToServiceOfferingDto()));
        }

        [HttpGet("{serviceProviderId:int}/{serviceId:int}")]
        public async Task<IActionResult> GetById([FromRoute] int serviceProviderId, [FromRoute] int serviceId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid data submitted. Please check the details and try again.");
            }

            var serviceOffering = await _serviceOfferingRepo.GetByIdAsync(serviceProviderId, serviceId);

            if (serviceOffering == null)
            {
                return NotFound("Service offering does not exists. Please check the details and try again");
            }

            return Ok(serviceOffering.ToServiceOfferingDto()); ;
        }
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateServiceOfferingDto createServiceOfferingDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid data submitted. Please check the details and try again.");
            }

            var createdServiceOffering = await _serviceOfferingRepo.CreateAsync(createServiceOfferingDto.ToServiceOffering());
            if(createdServiceOffering == null)
            {
                return BadRequest("Service offering already exists, or the specified service/service provider does not exist, or on of the pricing option does not exist. Please verify the details and try again.");
            }
            return Ok($"Service Offering with serviceId: {createdServiceOffering.ServiceId} serviceProviderId: {createdServiceOffering.ServiceProviderId} has been created successfully.");
        }
        [Authorize(Roles = "Admin,ServiceProvider")]
        [HttpPut("{serviceProviderId:int}/{serviceId:int}")]
        public async Task<IActionResult> Update([FromBody] UpdateServiceOfferingDto updateServiceOfferingDto,[FromRoute] int serviceProviderId, [FromRoute] int serviceId)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest("Invalid data submitted. Please check the details and try again.");
            }

            var updatedServiceOffering = await _serviceOfferingRepo.UpdateAsync(updateServiceOfferingDto, serviceProviderId, serviceId);

            if(updatedServiceOffering == null)
            {
                return NotFound("Service offering does not exists. Please check the details and try again");
            }

            return Ok(updatedServiceOffering.ToServiceOfferingDto());
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{serviceProviderId:int}/{serviceId:int}/{status}")]
        public async Task<IActionResult> UpdateStatus([FromRoute] string status, [FromRoute] int serviceProviderId, [FromRoute] int serviceId)
        {
            if (status != "Approved" && status != "Rejected")
            {
                return BadRequest("Invalid data submitted. Please check the details and try again.");
            }

            var updatedServiceOffering = await _serviceOfferingRepo.UpdateStatusAsync(status, serviceProviderId, serviceId);

            if (updatedServiceOffering == null)
            {
                return NotFound("Service offering does not exists. Please check the details and try again");
            }

            return Ok(updatedServiceOffering.ToServiceOfferingDto());
        }

        [Authorize(Roles = "Admin,ServiceProvider")]
        [HttpDelete("{serviceProviderId:int}/{serviceId:int}")]
        public async Task<IActionResult> Delete([FromRoute] int serviceProviderId, [FromRoute] int serviceId)
        {
            var deletedServiceOffering = await _serviceOfferingRepo.DeleteAsync(serviceProviderId, serviceId);
            if(deletedServiceOffering == null)
            {
                return NotFound("Service offering does not exists. Please check the details and try again");
            }

            return Ok(deletedServiceOffering.ToServiceOfferingDto());
        }
    }
}
