using HomeEase.Data;
using HomeEase.Dtos.BookingDtos;
using HomeEase.Dtos.ServiceTypeDtos;
using HomeEase.Interfaces;
using HomeEase.Models;
using Microsoft.EntityFrameworkCore;

namespace HomeEase.Repository
{
    public class ServiceTypeRepository : IServiceTypeRepository
    {
        private readonly ApplicationDbContext _context;
        public ServiceTypeRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<ServiceType?> CreateAsync(ServiceType serviceType)
        {
            if(!await _context.Services.AnyAsync(s => s.Id == serviceType.ServiceId))
            {
                return null;
            }
            var result = await _context.ServiceTypes.AddAsync(serviceType);
            await _context.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<ServiceType?> DeleteAsync(int id)
        {
            var serviceType = await _context.ServiceTypes.FirstOrDefaultAsync(st => st.Id == id);
            if(serviceType == null)
            {
                return null;
            }
            serviceType.IsDeleted = true;
            await _context.SaveChangesAsync();
            return serviceType;
        }

        public async Task<List<ServiceType>> GetAllAsync()
        {
            var serviceType = await _context.ServiceTypes.Include(st => st.PricingOptions).ToListAsync();
            return serviceType;
        }

        public async Task<ServiceType?> GetByIdAsync(int id)
        {
            var serviceType = await _context.ServiceTypes.Include(st => st.PricingOptions).FirstOrDefaultAsync(st => st.Id == id);
            if(serviceType == null)
            {
                return null;
            }
            return serviceType;
        }

        public async Task<ServiceType?> UpdateAsync(int id, UpdateServiceTypeDto serviceTypeDto)
        {
            var serviceType = await _context.ServiceTypes.Include(st => st.PricingOptions).FirstOrDefaultAsync(st => st.Id == id);
            if (serviceType == null)
            {
                return null;
            }

            serviceType.Name = serviceTypeDto.Name;
            await _context.SaveChangesAsync();
            return serviceType;
        }
    }
}
