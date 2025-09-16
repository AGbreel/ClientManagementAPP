using System;

namespace ClientManagementApi.Models
{
    public class TransactionDto
    {
        public int Id { get; set; }
        public int ClientId { get; set; }
        public string ClientName { get; set; }
        public string TransactionType { get; set; }
        public decimal Amount { get; set; }
        public DateTime TransactionDate { get; set; }
        public decimal? BalanceAfter { get; set; }
    }
}
