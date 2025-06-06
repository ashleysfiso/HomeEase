using HomeEase.Dtos.PendingApprovalsDtos;
using HomeEase.Models;

namespace HomeEase.Interfaces
{
    public interface IPendingApprovalRepository
    {
        public Task<List<PendingApproval>> GetAllAsync();
        public Task<PendingApproval?> GetByIdAsync(int id);
        public Task<PendingApproval?> CreateAsync(PendingApproval pendingApproval);
        public Task<PendingApproval?> UpdateAsync(int id, UpdatePendingApprovalDto updatePendingApprovalDto);
    }
}
