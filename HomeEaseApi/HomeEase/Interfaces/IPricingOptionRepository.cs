using HomeEase.Dtos.PricingOptionDtos;
using HomeEase.Models;

namespace HomeEase.Interfaces
{
    public interface IPricingOptionRepository
    {
        public Task<List<PricingOption>> GetAll();
        public Task<PricingOption?> GetById(int id);
        public Task<PricingOption?> Create(PricingOption pricingOption);
        public Task<PricingOption?> Update(int id, UpdatePricingOptionDto updatePricingOptionDto);
        public Task<PricingOption?> DeleteById(int id);

    }
}
