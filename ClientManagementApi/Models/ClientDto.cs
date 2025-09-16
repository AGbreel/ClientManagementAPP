using System;

namespace ClientManagementApi.Models
{
    public class ClientDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string NationalId { get; set; }
        public int Age { get; set; }
        public string AccountNumber { get; set; }
        public decimal MaxCreditBalance { get; set; }
        public decimal CurrentBalance { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
