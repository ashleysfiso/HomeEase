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
        public Task<ServiceOfferingPricingOption?> CreateAsync(ServiceOfferingPricingOption serviceOfferingPricingOption)
        {
            throw new NotImplementedException();
        }

        public async Task<List<ServiceOfferingPricingOption>> GetAllAsync()
        {
            var serviceOfferingPricings = await _context.ServiceOfferingPricings
                                                        .Include(sop => sop.PricingOption)
                                                        .ThenInclude(sop => sop.ServiceType)
                                                        .ToListAsync();
            return serviceOfferingPricings;
        }

        public Task<ServiceOfferingPricingOption?> UpdateAsync(UpdateSOPricingOption updateSOPricingOption)
        {
            throw new NotImplementedException();
        }
    }
}
