namespace HomeEase.Models
{
    public class PendingApproval
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string CompanyName { get; set; }
        public string Status { get; set; } = "Pending";
        public string Experience { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
