using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace ContactBookClientApp.ViewModels
{
    public class UpdateUserViewModel
    {
        public int userId { get; set; }

        [Required(ErrorMessage = "First Name is required")]
        [StringLength(15)]
        [DisplayName("First Name")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Last Name is required")]
        [StringLength(15)]
        [DisplayName("Last Name")]

        public string LastName { get; set; }

        [Required(ErrorMessage = "Login Id is required")]
        [StringLength(15)]
        [DisplayName("Login Id")]

        public string LoginId { get; set; }

       
       

        public string Email { get; set; }

        [Required(ErrorMessage = "Contact Number is required")]
        [StringLength(15)]
        [DataType(DataType.PhoneNumber)]
        [RegularExpression(@"^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$", ErrorMessage = "Invalid contact number.")]
        [DisplayName("Contact Number")]

        public string ContactNumber { get; set; }

        [DisplayName("Profile photo")]
        public IFormFile? File { get; set; }

        public string? FileName { get; set; }

        public byte[]? ImageByte { get; set; }
    }
}
