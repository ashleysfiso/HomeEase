﻿using HomeEase.Data;
using HomeEase.Dtos.ServiceOfferingDtos;
using HomeEase.Interfaces;
using HomeEase.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace HomeEase.Repository
{
    public class ServiceOfferingRepository : IServiceOfferingRepository
    {
        private readonly ApplicationDbContext _context;
        public ServiceOfferingRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ServiceOffering?> CreateAsync(ServiceOffering serviceOffering)
        {
            if(await Exist(serviceOffering.ServiceId, serviceOffering.ServiceProviderId))
            {
                return null;
            }
            await _context.ServiceOfferings.AddAsync(serviceOffering);
            await _context.SaveChangesAsync();
            return serviceOffering;
        }

        public async Task<ServiceOffering?> DeleteAsync(int ServiceProviderId, int ServiceId)
        {
            var serviceOffering = await _context.ServiceOfferings
                                                  .Include(so => so.Service)
                                                  .Include(so => so.ServiceProvider)
                                                  .FirstOrDefaultAsync(so => so.ServiceProviderId == ServiceProviderId && so.ServiceId == ServiceId);

            if (serviceOffering == null)
            {
                return null;
            }
            _context.Remove(serviceOffering);
            await _context.SaveChangesAsync();
            return serviceOffering;
        }

        public async Task<List<ServiceOffering>> GetAllAsync()
        {
            return await _context.ServiceOfferings.Include(so => so.Service)
                                                  .Include(so => so.ServiceProvider)
                                                  .ToListAsync(); 
        }

        public async Task<ServiceOffering?> GetByIdAsync(int ServiceProviderId, int ServiceId)
        {
            return await _context.ServiceOfferings.Include(so => so.Service)
                                                  .Include(so => so.ServiceProvider)
                                                  .FirstOrDefaultAsync(so => so.ServiceProviderId == ServiceProviderId && so.ServiceId == ServiceId);
        }

        public async Task<ServiceOffering?> UpdateAsync(UpdateServiceOfferingDto serviceOfferingDto, int ServiceProviderId, int ServiceId)
        {
            var serviceOffering = await _context.ServiceOfferings.Include(so => so.Service)
                                                                 .Include(so => so.ServiceProvider)
                                                                 .FirstOrDefaultAsync(so => so.ServiceProviderId == ServiceProviderId && so.ServiceId == ServiceId);
            if (serviceOffering == null)
            {
                return null;
            }

            serviceOffering.Rate = serviceOfferingDto.Rate;
            serviceOffering.Availability = serviceOfferingDto.Availability;
            serviceOffering.Description = serviceOfferingDto.Description;

            await _context.SaveChangesAsync();

            return serviceOffering;
        }

        public async Task<bool> Exist(int ServiceId, int ServiceProviderId)
        {
            var existingOffering = await _context.ServiceOfferings
                                                  .Include(so => so.Service)
                                                  .Include(so => so.ServiceProvider)
                                                  .FirstOrDefaultAsync(so => so.ServiceProviderId == ServiceProviderId && so.ServiceId == ServiceId);
            if(existingOffering == null)
            {
                return false;
            }

            return true;
        }
    }
}
