using System.Threading.Tasks;
using ClientManagementApi.DTOs;
using ClientManagementApi.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace ClientManagementApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClientsController : ControllerBase
    {
        private readonly IClientRepository _repo;
        public ClientsController(IClientRepository repo)
        {
            _repo = repo;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ClientCreateDto dto)
        {
            var id = await _repo.AddClientAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id }, new { id });
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var clients = await _repo.GetAllAsync();
            return Ok(clients);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var client = await _repo.GetByIdAsync(id);
            if (client == null) return NotFound();
            return Ok(client);
        }
    }
}
