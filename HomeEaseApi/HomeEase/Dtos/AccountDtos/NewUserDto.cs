namespace HomeEase.Dtos.AccountDtos
{
    public class NewUserDto
    {
        public string? UserName { get; set; }
        public string? Email { get; set; }
        public string? UserId { get; set; }
        public IList<string> Role { get; set; }
        public int? CustomerID { get; set; }
        public int? ProviderId { get; set; }
    }
}
