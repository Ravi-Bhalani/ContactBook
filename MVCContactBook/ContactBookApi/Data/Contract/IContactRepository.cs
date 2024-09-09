using ContactBookApi.Dtos;
using ContactBookApi.Models;

namespace ContactBookApi.Data.Contract
{
    public interface IContactRepository
    {

        public IEnumerable<ContactSPDto> GETCONTACTBYBIRTHDATEMONTH(int month);

        public int GetContactsCountBasedOnCountry(int countryId);

        public IEnumerable<ContactSPDto> GETCONTACTBYSTATE(int stateId);
        public int GetContactsCountBasedOnGender(string gender);

        IEnumerable<ContactBook> GetAll(char? letter);

        ContactBook? GetContact(int id);

        IEnumerable<ContactBook> GetAllFavouriteContacts(char? letter);

        int TotalFavouriteContacts(char? letter);

        IEnumerable<ContactBook> GetFavouritePaginatedContacts(int page, int pageSize, char? letter);
        IEnumerable<ContactBook> GetFavouritePaginatedContacts(int page, int pageSize);


        bool InsertContact(ContactBook contact);

        bool UpdateContact(ContactBook contact);

        bool DeleteContact(int id);

        bool ContactExist(string phone);

        bool ContactExist(int id, string phone);

        int TotalContacts(string? letter, string search);


        IEnumerable<ContactBook> GetPaginatedContacts(int page, int pageSize, string? letter, string sortOrder, string search);

        IEnumerable<ContactBook> GetPaginatedContacts(int page, int pageSize,string sortOrder);
    }
}
