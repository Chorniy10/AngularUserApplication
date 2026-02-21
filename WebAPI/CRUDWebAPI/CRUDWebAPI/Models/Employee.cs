using System.ComponentModel.DataAnnotations;

namespace CRUDWebAPI.Models
{
    public class Employee
    {
        [Key]
        public Guid id { get; set; }
        public string name { get; set; }
        public string mobileNumber { get; set; }
        public string email { get; set; }
    }
}
