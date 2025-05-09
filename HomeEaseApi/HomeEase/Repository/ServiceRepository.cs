using HomeEase.Data;
using HomeEase.Dtos.ServiceDto;
using HomeEase.Interfaces;
using HomeEase.Models;
using Microsoft.EntityFrameworkCore;

namespace HomeEase.Repository
{
    public class ServiceRepository : IServiceRepository
    {
        private readonly ApplicationDbContext _context;
        public ServiceRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Service?> CreateServiceAsync(Service service)
        {
            await _context.Services.AddAsync(service);
            await _context.SaveChangesAsync();
            return service;
        }

        public async Task<Service?> DeleteServiceAsync(int id)
        {
            var serviceModel = await _context.Services.Include(s => s.ServiceTypes)
                                                      .ThenInclude(st => st.PricingOptions)
                                                      .FirstOrDefaultAsync(s => s.Id == id);
            if(serviceModel == null)
            {
                return null;
            }

            serviceModel.isDeleted = true;
            await _context.SaveChangesAsync();

            return serviceModel;
        }

        public async Task<Service?> GetServiceAsync(int serviceId)
        {
            return await _context.Services.FindAsync(serviceId);
        }

        public async Task<List<Service>> GetServicesAsync()
        {
            return await _context.Services.Where(s => s.isDeleted == false).Include(s => s.ServiceTypes).ThenInclude(st => st.PricingOptions).ToListAsync();
        }

        public async Task<Service?> UpdateServiceAsync(int id, UpdateServiceDto updateServiceDto)
        {
            var service = await _context.Services.Include(s => s.ServiceTypes).ThenInclude(st => st.PricingOptions).FirstOrDefaultAsync(s => s.Id == id);
            if (service == null)
            {
                return null;
            }

            service.Name = updateServiceDto.Name;
            service.BasePrice = updateServiceDto.BasePrice;
            service.Description = updateServiceDto.Description;

            await _context.SaveChangesAsync();

            return service;
        }
    }
}
