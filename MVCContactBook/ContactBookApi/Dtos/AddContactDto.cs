﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace ContactBookApi.Dtos
{
    public class AddContactDto
    {
        [Required]
        [StringLength(15)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(15)]
        public string LastName { get; set; }

        [Required]
        [StringLength(10)]
        public string Phone { get; set; }

        [Required]
        [StringLength(255)]
        public string Address { get; set; }

        [Required]
        [StringLength(50)]
        public string Email { get; set; }

        [Required]
        [StringLength(1)]
        public string Gender { get; set; }

        [Required]
        public bool IsFavourite { get; set; }

        [Required]
        public int CountryId { get; set; }

        [Required]
        public int StateId { get; set; }


        public string? FileName { get; set; }
        public byte[]? ImageByte { get; set; }

        public DateTime Birthdate { get; set; }


        //public List<CountryDto>? Country { get; set; }
        //public List<StateDto>? States { get; set; }
    }
}
