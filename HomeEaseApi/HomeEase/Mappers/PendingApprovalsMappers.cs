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
                FullName = createPendingApprovalDto.FullName,
                PhoneNumber = createPendingApprovalDto.PhoneNumber,
                Experience = createPendingApprovalDto.Experience,
            };
        }
    }
}
