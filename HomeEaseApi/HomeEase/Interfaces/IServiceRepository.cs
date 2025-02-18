using HomeEase.Dtos.ServiceDto;
using HomeEase.Models;

namespace HomeEase.Interfaces
{
    public interface IServiceRepository
    {
        public Task<List<Service>> GetServicesAsync();
        public Task<Service?> GetServiceAsync(int serviceId);
        public Task<Service?> CreateServiceAsync(Service service);
        public Task<Service?> UpdateServiceAsync(int Id, UpdateServiceDto updateServiceDto);
        public Task<Service?> DeleteServiceAsync(int id);
    }
}
