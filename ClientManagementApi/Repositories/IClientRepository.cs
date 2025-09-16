using System.Collections.Generic;
using System.Threading.Tasks;
using ClientManagementApi.DTOs;
using ClientManagementApi.Models;

namespace ClientManagementApi.Repositories
{
    public interface IClientRepository
    {
        Task<int> AddClientAsync(ClientCreateDto dto);
        Task<IEnumerable<ClientDto>> GetAllAsync();
        Task<ClientDto> GetByIdAsync(int id);
    }
}
