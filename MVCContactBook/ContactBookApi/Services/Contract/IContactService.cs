
using ContactBookApi.Dtos;
using ContactBookApi.Models;

namespace ContactBookApi.Services.Contract
{
    public interface IContactService
    {
        public ServiceResponse<IEnumerable<ContactSPDto>> GETCONTACTBYBIRTHDATEMONTH(int month);
        public ServiceResponse<int> GetContactsCountBasedOnCountry(int countryId);
        public ServiceResponse<IEnumerable<ContactSPDto>> GETCONTACTBYSTATE(int stateId);
        public ServiceResponse<int> GetContactsCountBasedOnGender(string gender);
        ServiceResponse<IEnumerable<ContactDto>> GetContacts(char? letter);

        ServiceResponse<IEnumerable<ContactDto>> GetFavouriteContacts(char? letter);
        public ServiceResponse<ContactDto> GetContact(int contactId);

        ServiceResponse<IEnumerable<ContactDto>> GetPaginatedContacts(int page, int pageSize,string sortOrder);

        ServiceResponse<IEnumerable<ContactDto>> GetPaginatedContacts(int page, int pageSize, string? letter, string sortOrder, string search);
        ServiceResponse<int> TotalContacts(string? letter, string search);

        public ServiceResponse<IEnumerable<ContactDto>> GetFavouritePaginatedContacts(int page, int pageSize);
        public ServiceResponse<IEnumerable<ContactDto>> GetFavouritePaginatedContacts(int page, int pageSize, char? letter);

        public ServiceResponse<int> TotalFavouriteContacts(char? letter);
        public ServiceResponse<string> AddContact(ContactBook contact);


        public ServiceResponse<string> ModifyContact(ContactBook contact);

        public ServiceResponse<string> RemoveContact(int id);
    }
}
