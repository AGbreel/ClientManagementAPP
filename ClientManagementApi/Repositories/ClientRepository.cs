using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using ClientManagementApi.DTOs;
using ClientManagementApi.Models;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace ClientManagementApi.Repositories
{
    public class ClientRepository : IClientRepository
    {
        private readonly string _connectionString;

        public ClientRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public async Task<int> AddClientAsync(ClientCreateDto dto)
        {
            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand("AddClient", conn) { CommandType = CommandType.StoredProcedure };

            cmd.Parameters.AddWithValue("@Name", dto.Name);
            cmd.Parameters.AddWithValue("@NationalId", dto.NationalId);
            cmd.Parameters.AddWithValue("@Age", dto.Age);
            cmd.Parameters.AddWithValue("@AccountNumber", dto.AccountNumber ?? (object)DBNull.Value);
            cmd.Parameters.AddWithValue("@MaxCreditBalance", dto.MaxCreditBalance);

            var outParam = new SqlParameter("@NewId", SqlDbType.Int) { Direction = ParameterDirection.Output };
            cmd.Parameters.Add(outParam);

            await conn.OpenAsync();
            await cmd.ExecuteNonQueryAsync();

            return (int)outParam.Value;
        }

        public async Task<IEnumerable<ClientDto>> GetAllAsync()
        {
            var list = new List<ClientDto>();
            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand("GetClients", conn) { CommandType = CommandType.StoredProcedure };
            await conn.OpenAsync();
            using var reader = await cmd.ExecuteReaderAsync();
            while (await reader.ReadAsync())
            {
                list.Add(new ClientDto
                {
                    Id = reader.GetInt32(reader.GetOrdinal("ClientId")),
                    Name = reader.GetString(reader.GetOrdinal("Name")),
                    NationalId = reader.GetString(reader.GetOrdinal("NationalId")),
                    Age = reader.IsDBNull(reader.GetOrdinal("Age")) ? 0 : reader.GetInt32(reader.GetOrdinal("Age")),
                    AccountNumber = reader.IsDBNull(reader.GetOrdinal("AccountNumber")) ? null : reader.GetString(reader.GetOrdinal("AccountNumber")),
                    MaxCreditBalance = reader.GetDecimal(reader.GetOrdinal("MaxCreditBalance")),
                    CurrentBalance = reader.GetDecimal(reader.GetOrdinal("CurrentBalance")),
                    CreatedAt = reader.GetDateTime(reader.GetOrdinal("CreatedAt"))
                });
            }
            return list;
        }

        public async Task<ClientDto> GetByIdAsync(int id)
        {
            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand("GetClientById", conn) { CommandType = CommandType.StoredProcedure };
            cmd.Parameters.AddWithValue("@ClientId", id);
            await conn.OpenAsync();
            using var reader = await cmd.ExecuteReaderAsync();
            if (await reader.ReadAsync())
            {
                return new ClientDto
                {
                    Id = reader.GetInt32(reader.GetOrdinal("ClientId")),
                    Name = reader.GetString(reader.GetOrdinal("Name")),
                    NationalId = reader.GetString(reader.GetOrdinal("NationalId")),
                    Age = reader.IsDBNull(reader.GetOrdinal("Age")) ? 0 : reader.GetInt32(reader.GetOrdinal("Age")),
                    AccountNumber = reader.IsDBNull(reader.GetOrdinal("AccountNumber")) ? null : reader.GetString(reader.GetOrdinal("AccountNumber")),
                    MaxCreditBalance = reader.GetDecimal(reader.GetOrdinal("MaxCreditBalance")),
                    CurrentBalance = reader.GetDecimal(reader.GetOrdinal("CurrentBalance")),
                    CreatedAt = reader.GetDateTime(reader.GetOrdinal("CreatedAt"))
                };
            }
            return null;
        }
    }
}
