using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.Auth
{
    public class LoginInfo
    {
        [Required]
        public string domain { get; set; }
        [Required]
        public string userName { get; set; }
        [Required]
        public string password { get; set; }
        [Required]
        public string groupcode { get; set; }
    }
}
