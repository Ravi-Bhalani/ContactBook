using ContactBookApi.Dtos;
using ContactBookApi.Models;
using Microsoft.EntityFrameworkCore;

namespace ContactBookApi.Data
{
    public interface IAppDbContext : IDbContext
    {
        public DbSet<ContactBook> ContactBook { get; set; }

        public DbSet<User> users { get; set; }

        public DbSet<Country> countries { get; set; }

        public DbSet<State> states { get; set; }

        IQueryable<ContactSPDto> GETCONTACTBYBIRTHDATEMONTH(int month);
        IQueryable<CountDto> GetContactsCountBasedOnCountry(int countryId);
        IQueryable<ContactSPDto> GETCONTACTBYSTATE(int stateId);
        IQueryable<CountDto> GetContactsCountBasedOnGender(string gender);


    }
}
