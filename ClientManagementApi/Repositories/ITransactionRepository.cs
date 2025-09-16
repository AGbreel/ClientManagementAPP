using System.Collections.Generic;
using System.Threading.Tasks;
using ClientManagementApi.DTOs;
using ClientManagementApi.Models;

namespace ClientManagementApi.Repositories
{
    public interface ITransactionRepository
    {
        Task<(int transactionId, decimal newBalance)> AddTransactionAsync(TransactionCreateDto dto);
        Task<IEnumerable<TransactionDto>> GetAllAsync();
    }
}
