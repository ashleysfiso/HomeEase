using HomeEase.Data;
using HomeEase.Dtos.ServiceProviderDtos;
using HomeEase.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace HomeEase.Repository
{
    public class ServiceProviderRepository : IServiceProviderRepository
    {
        private readonly ApplicationDbContext _context;

        public ServiceProviderRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Models.ServiceProvider>> GetAllAsync()
        {
            var serviceProvider = await _context.ServiceProviders.Include(sp => sp.ServiceProviderServices)
                                                                 .ThenInclude(sps => sps.Service)
                                                                 .Include(sp => sp.Reviews)
                                                                 .ToListAsync();

            return serviceProvider;
        }

        public async Task<Models.ServiceProvider?> UpdateAsync(int id, UpdateServiceProvicerDto updateDto)
        {
            var serviceProvider = await _context.ServiceProviders.FirstOrDefaultAsync(sp => sp.Id == id);
            if (serviceProvider == null)
            {
                return null;
            }
            
            if(!string.IsNullOrEmpty(updateDto.Status))
            {
                serviceProvider.Status = updateDto.Status;
            }

            await _context.SaveChangesAsync();

            return serviceProvider;
        }
    }
}
