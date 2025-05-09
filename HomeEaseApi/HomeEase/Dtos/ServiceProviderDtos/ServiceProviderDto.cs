using HomeEase.Models;

namespace HomeEase.Dtos.ServiceProviderDtos
{
    public class ServiceProviderDto
    {
        public int Id { get; set; }
        public string CompanyName { get; set; } 
        public string Status { get; set; }
        public string Rating { get; set; }
        public string ReviewCount {  get; set; }
        public List<string> Services { get; set; }
    }
}
