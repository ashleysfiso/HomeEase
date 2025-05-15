using HomeEase.Data;
using HomeEase.Dtos.ServiceOfferingPricingOptionDtos;
using HomeEase.Interfaces;
using HomeEase.Models;
using Microsoft.EntityFrameworkCore;

namespace HomeEase.Repository
{
    public class ServiceOfferingPricingOptionRepository : IServiceOfferingPricingOptionRepository
    {
        private readonly ApplicationDbContext _context;

        public ServiceOfferingPricingOptionRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<ServiceOfferingPricingOption?> CreateAsync(ServiceOfferingPricingOption serviceOfferingPricingOption)
        {
            if(!await _context.ServiceOfferings.AnyAsync(so => so.ServiceProviderId == serviceOfferingPricingOption.ServiceProviderId &&
                                                                     so.ServiceId == serviceOfferingPricingOption.ServiceId) ||
               !await _context.PricingOptions.AnyAsync(po => po.Id == serviceOfferingPricingOption.PricingOptionId) ||
                await _context.ServiceOfferingPricings.AnyAsync(sopo => sopo.ServiceProviderId == serviceOfferingPricingOption.ServiceProviderId &&
                                                                        sopo.ServiceId == serviceOfferingPricingOption.ServiceId &&
                                                                        sopo.PricingOptionId == serviceOfferingPricingOption.PricingOptionId))
            {
                return null;
            }

            var result = await _context.ServiceOfferingPricings.AddAsync(serviceOfferingPricingOption);
            await _context.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<List<ServiceOfferingPricingOption>> GetAllAsync()
        {
            var serviceOfferingPricings = await _context.ServiceOfferingPricings
                                                        .Include(sop => sop.PricingOption)
                                                        .ThenInclude(sop => sop.ServiceType)
                                                        .ToListAsync();
            return serviceOfferingPricings;
        }

        public async  Task<ServiceOfferingPricingOption?> UpdateAsync(UpdateSOPricingOption updateSOPricingOption)
        {
            var soPricingOption = await _context.ServiceOfferingPricings
                                                .Include(sop => sop.PricingOption)
                                                .ThenInclude(sop => sop.ServiceType)
                                                .FirstOrDefaultAsync(sopo => sopo.ServiceId == updateSOPricingOption.ServiceId &&
                                                                             sopo.ServiceProviderId == updateSOPricingOption.ServiceProviderId &&
                                                                             sopo.PricingOptionId == updateSOPricingOption.PricingOptionId);
            if(soPricingOption == null)
            {
                return null;
            }

            soPricingOption.Price = updateSOPricingOption.Price;

            await _context.SaveChangesAsync();

            return soPricingOption;
        }
    }
}
