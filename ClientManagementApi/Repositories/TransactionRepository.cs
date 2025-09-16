using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using ClientManagementApi.DTOs;
using ClientManagementApi.Models;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace ClientManagementApi.Repositories
{
    public class TransactionRepository : ITransactionRepository
    {
        private readonly string _connectionString;

        public TransactionRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public async Task<(int transactionId, decimal newBalance)> AddTransactionAsync(TransactionCreateDto dto)
        {
            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand("AddTransaction", conn) { CommandType = CommandType.StoredProcedure };

            cmd.Parameters.AddWithValue("@ClientId", dto.ClientId);
            cmd.Parameters.AddWithValue("@TransactionType", dto.TransactionType);
            cmd.Parameters.AddWithValue("@TransactionAmount", dto.Amount);

            var outId = new SqlParameter("@NewTransactionId", SqlDbType.Int) { Direction = ParameterDirection.Output };
            var outBalance = new SqlParameter("@NewBalance", SqlDbType.Decimal) { Precision = 18, Scale = 2, Direction = ParameterDirection.Output };

            cmd.Parameters.Add(outId);
            cmd.Parameters.Add(outBalance);

            await conn.OpenAsync();
            await cmd.ExecuteNonQueryAsync();

            int tid = outId.Value != DBNull.Value ? (int)outId.Value : 0;
            decimal nb = outBalance.Value != DBNull.Value ? (decimal)outBalance.Value : 0m;

            return (tid, nb);
        }

        public async Task<IEnumerable<TransactionDto>> GetAllAsync()
        {
            var list = new List<TransactionDto>();
            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand("GetTransactions", conn) { CommandType = CommandType.StoredProcedure };
            await conn.OpenAsync();
            using var reader = await cmd.ExecuteReaderAsync();
            while (await reader.ReadAsync())
            {
                list.Add(new TransactionDto
                {
                    Id = reader.GetInt32(reader.GetOrdinal("TransactionId")),
                    ClientId = reader.GetInt32(reader.GetOrdinal("ClientId")),
                    ClientName = reader.GetString(reader.GetOrdinal("ClientName")),
                    TransactionType = reader.GetString(reader.GetOrdinal("TransactionType")),
                    Amount = reader.GetDecimal(reader.GetOrdinal("Amount")),
                    TransactionDate = reader.GetDateTime(reader.GetOrdinal("TransactionDate")),
                    BalanceAfter = reader.IsDBNull(reader.GetOrdinal("BalanceAfter")) ? (decimal?)null : reader.GetDecimal(reader.GetOrdinal("BalanceAfter"))
                });
            }
            return list;
        }
    }
}
