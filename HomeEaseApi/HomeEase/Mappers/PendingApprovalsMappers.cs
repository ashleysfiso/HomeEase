using HomeEase.Dtos.PendingApprovalsDtos;
using HomeEase.Models;

namespace HomeEase.Mappers
{
    public static class PendingApprovalsMappers
    {
        public static PendingApproval ToPendingApproval(this CreatePendingApprovalDto createPendingApprovalDto)
        {
            return new PendingApproval
            {
                CompanyName = createPendingApprovalDto.CompanyName,
                Email = createPendingApprovalDto.Email,
                FirstName = createPendingApprovalDto.FirstName,
                LastName = createPendingApprovalDto.LastName,
                PhoneNumber = createPendingApprovalDto.PhoneNumber,
                Experience = createPendingApprovalDto.Experience,
            };
        }
    }
}
