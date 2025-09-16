using System;
using System.Threading.Tasks;
using ClientManagementApi.DTOs;
using ClientManagementApi.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace ClientManagementApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionsController : ControllerBase
    {
        private readonly ITransactionRepository _repo;

        public TransactionsController(ITransactionRepository repo)
        {
            _repo = repo;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] TransactionCreateDto dto)
        {
            try
            {
                var (transactionId, newBalance) = await _repo.AddTransactionAsync(dto);
                return Ok(new { transactionId, newBalance });
            }
            catch (SqlException ex)
            {
                // لو الرسالة جاية من SQL procedure (RAISERROR)
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                // أي خطأ تاني unexpected
                return StatusCode(500, new { message = "An unexpected error occurred.", details = ex.Message });
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var logs = await _repo.GetAllAsync();
                return Ok(logs);
            }
            catch (SqlException ex)
            {
                return BadRequest(new { message = "Database error occurred.", details = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An unexpected error occurred.", details = ex.Message });
            }
        }
    }
}
