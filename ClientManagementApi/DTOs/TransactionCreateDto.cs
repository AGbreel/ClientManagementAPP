namespace ClientManagementApi.DTOs
{
    public class TransactionCreateDto
    {
        public int ClientId { get; set; }
        public string TransactionType { get; set; } // "deposit" or "withdraw"
        public decimal Amount { get; set; }
    }
}
