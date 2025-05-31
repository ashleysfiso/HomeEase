using HomeEase.Data;
using HomeEase.Dtos.PricingOptionDtos;
using HomeEase.Interfaces;
using HomeEase.Mappers;
using HomeEase.Models;
using Microsoft.EntityFrameworkCore;

namespace HomeEase.Repository
{
    public class PricingOptionRepository : IPricingOptionRepository
    {
        private readonly ApplicationDbContext _context;
        public PricingOptionRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<PricingOption?> Create(PricingOption pricingOption)
        {
            if(!await _context.ServiceTypes.AnyAsync(st => st.Id == pricingOption.ServiceTypeId))
            {
                return null;
            }

            var result = await _context.PricingOptions.AddAsync(pricingOption);
            await _context.SaveChangesAsync();

            return result.Entity;
        }

        public async Task<PricingOption?> DeleteById(int id)
        {
            var pricingOption = await _context.PricingOptions.FirstOrDefaultAsync(st => st.Id == id);
            if (pricingOption == null)
            {
                return null;
            }
            pricingOption.IsDeleted = true;
            await _context.SaveChangesAsync();
            return pricingOption;
        }

        public async Task<List<PricingOption>> GetAll()
        {
            var pricingOptions = await _context.PricingOptions.Include(po => po.ServiceType).ToListAsync();
            return pricingOptions;
        }

        public async Task<PricingOption?> GetById(int id)
        {
            var pricingOption = await _context.PricingOptions.Include(po => po.ServiceType).FirstOrDefaultAsync(po => po.Id == id);
            if (pricingOption == null)
            {
                return null;
            }
            return pricingOption;
        }

        public async Task<PricingOption?> Update(int id, UpdatePricingOptionDto updatePricingOptionDto)
        {
            var pricingOption = await _context.PricingOptions.Include(po => po.ServiceType).FirstOrDefaultAsync(po => po.Id == id);
            if(pricingOption == null)
            {
                return null;
            }

            pricingOption.UnitLabel = updatePricingOptionDto.UnitLabel;
            pricingOption.Name = updatePricingOptionDto.Name;

            await _context.SaveChangesAsync();
            return pricingOption;
        }
    }
}
