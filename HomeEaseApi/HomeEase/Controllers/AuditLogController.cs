using HomeEase.Data;
using HomeEase.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HomeEase.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuditLogController : ControllerBase
    {
        private readonly IAuditLogRepository _repo;
        public AuditLogController(IAuditLogRepository repo)
        {
            _repo = repo;
        }
        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var logs = await _repo.GetAuditLogs();
            return Ok(logs);
        }
    }
}
