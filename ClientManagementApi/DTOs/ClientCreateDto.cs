namespace ClientManagementApi.DTOs
{
    public class ClientCreateDto
    {
        public string Name { get; set; }
        public string NationalId { get; set; }
        public int Age { get; set; }
        public string AccountNumber { get; set; }
        public decimal MaxCreditBalance { get; set; }
    }
}
