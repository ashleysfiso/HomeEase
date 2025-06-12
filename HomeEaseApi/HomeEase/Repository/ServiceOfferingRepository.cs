using HomeEase.Data;
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
            if(!await _context.Services.AnyAsync(s=>s.Id == serviceOffering.ServiceId) || 
               !await _context.ServiceProviders.AnyAsync(sp => sp.Id == serviceOffering.ServiceProviderId) ||
                await _context.ServiceOfferings.AnyAsync(so => so.ServiceProviderId == serviceOffering.ServiceProviderId &&
                                                               so.ServiceId == serviceOffering.ServiceId))                                            
            {
                return null;
            }

            var pricingOptionIds = serviceOffering.PricingOptions.Select(p => p.PricingOptionId).ToList();

            var existingIds = await _context.PricingOptions
                                    .Where(p => pricingOptionIds.Contains(p.Id))
                                    .Select(p => p.Id)
                                    .ToListAsync();

            var missingIds = pricingOptionIds.Except(existingIds).ToList();

            if (missingIds.Any())
            {
                return null;
            }

            var result = await _context.ServiceOfferings.AddAsync(serviceOffering);
            await _context.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<ServiceOffering?> DeleteAsync(int ServiceProviderId, int ServiceId)
        {
            var serviceOffering = await _context.ServiceOfferings
                                                  .Include(so => so.Service)
                                                  .Include(so => so.ServiceProvider)
                                                  .Include (so => so.PricingOptions)
                                                  .ThenInclude(sopo => sopo.PricingOption)
                                                  .ThenInclude(po => po.ServiceType)
                                                  .FirstOrDefaultAsync(so => so.ServiceProviderId == ServiceProviderId && so.ServiceId == ServiceId);

            if (serviceOffering == null)
            {
                return null;
            }
            serviceOffering.IsDeleted = !serviceOffering.IsDeleted;
            await _context.SaveChangesAsync();
            return serviceOffering;
        }

        public async Task<List<ServiceOffering>> GetAllAsync()
        {
            return await _context.ServiceOfferings.Include(so => so.Service)
                                                  .Include(so => so.ServiceProvider)
                                                  .Include(so => so.PricingOptions)
                                                  .ThenInclude(sopo => sopo.PricingOption)
                                                  .ThenInclude(po => po.ServiceType)
                                                  .Include(so => so.Reiviews)
                                                  .ToListAsync(); 
        }

        public async Task<List<ServiceOffering>> GetAllByServiceProviderId(int ServiceProviderId)
        {
            return await _context.ServiceOfferings.Include(so => so.Service)
                                                  .Include(so => so.ServiceProvider)
                                                  .Include(so => so.PricingOptions)
                                                  .ThenInclude(sopo => sopo.PricingOption)
                                                  .ThenInclude(po => po.ServiceType)
                                                  .Include(so => so.Reiviews)
                                                  .Where(so => so.ServiceProviderId == ServiceProviderId)
                                                  .ToListAsync();
        }

        public async Task<ServiceOffering?> GetByIdAsync(int ServiceProviderId, int ServiceId)
        {
            return await _context.ServiceOfferings.Include(so => so.Service)
                                                  .Include(so => so.ServiceProvider)
                                                  .Include(so => so.PricingOptions)
                                                  .ThenInclude(sopo => sopo.PricingOption)
                                                  .ThenInclude(po => po.ServiceType)
                                                  .Include(so => so.Reiviews)
                                                  .FirstOrDefaultAsync(so => so.ServiceProviderId == ServiceProviderId && so.ServiceId == ServiceId);
        }

        public async Task<ServiceOffering?> UpdateAsync(UpdateServiceOfferingDto serviceOfferingDto, int ServiceProviderId, int ServiceId)
        {
            var serviceOffering = await _context.ServiceOfferings.Include(so => so.Service)
                                                                 .Include(so => so.ServiceProvider)
                                                                 .Include(so => so.PricingOptions)
                                                                 .ThenInclude(sopo => sopo.PricingOption)
                                                                 .ThenInclude(po => po.ServiceType)
                                                                 .Include(so => so.Reiviews)
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

        public async Task<ServiceOffering?> UpdateStatusAsync(string status, int ServiceProviderId, int ServiceId)
        {
            var serviceOffering = await _context.ServiceOfferings.Include(so => so.Service)
                                                                 .Include(so => so.ServiceProvider)
                                                                 .Include(so => so.PricingOptions)
                                                                 .ThenInclude(sopo => sopo.PricingOption)
                                                                 .ThenInclude(po => po.ServiceType)
                                                                 .Include(so => so.Reiviews)
                                                                 .FirstOrDefaultAsync(so => so.ServiceProviderId == ServiceProviderId && so.ServiceId == ServiceId);
            if (serviceOffering == null)
            {
                return null;
            }
            serviceOffering.Status = status;

            await _context.SaveChangesAsync();

            return serviceOffering;
        }
    }
}
