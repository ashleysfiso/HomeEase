using HomeEase.Dtos.PendingApprovalsDtos;
using HomeEase.Interfaces;
using HomeEase.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace HomeEase.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PendingApprovalController : ControllerBase
    {
        private readonly IPendingApprovalRepository _repo;
        public PendingApprovalController(IPendingApprovalRepository repo)
        {
            _repo = repo;
        }
        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var pendingApprovals = await _repo.GetAllAsync();
            return Ok(pendingApprovals);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var pendingapproval = await _repo.GetByIdAsync(id);
            if (pendingapproval == null)
            {
                return NotFound("Pending Approval does not exists. Please check the details and try again");
            }
            return Ok(pendingapproval);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreatePendingApprovalDto createPendingApproval)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest("Invalid data submitted. Please check the details and try again.");
            }

            var pendingApproval = await _repo.CreateAsync(createPendingApproval.ToPendingApproval());
            if(pendingApproval == null)
            {
                return BadRequest("Email already exists.");
            }

            return CreatedAtAction(nameof(GetById), new { id = pendingApproval.Id }, pendingApproval);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdatePendingApprovalDto updatePendingApprovalDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid data submitted. Please check the details and try again.");
            }

            var pendingApproval = await _repo.UpdateAsync(id, updatePendingApprovalDto);
            if(pendingApproval == null)
            {
                return NotFound("Pending Approval does not exists. Please check the details and try again");
            }
            return Ok(pendingApproval);
        }
    }
}
