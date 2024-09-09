using ContactBookApi.Data.Contract;
using ContactBookApi.Dtos;
using ContactBookApi.Models;
using Microsoft.EntityFrameworkCore;

namespace ContactBookApi.Data.Implementation
{
    public class ContactRepository : IContactRepository
    {
        private readonly IAppDbContext _appDbContext;


        public ContactRepository(IAppDbContext appDbContext)

        
        {
            _appDbContext = appDbContext;

        }
        public IEnumerable<ContactSPDto> GETCONTACTBYBIRTHDATEMONTH(int month)
        {
            var result = _appDbContext.GETCONTACTBYBIRTHDATEMONTH(month);
            return result;
        }

        public int GetContactsCountBasedOnCountry(int countryId)
        {
            var result = _appDbContext.GetContactsCountBasedOnCountry(countryId).AsEnumerable().FirstOrDefault().CountOfContacts;
            return result;
        }

        public IEnumerable<ContactSPDto> GETCONTACTBYSTATE(int stateId)
        {
            var result = _appDbContext.GETCONTACTBYSTATE(stateId);
            return result;
        }
        public int GetContactsCountBasedOnGender(string gender)
        {
            var result = _appDbContext.GetContactsCountBasedOnGender(gender).AsEnumerable().FirstOrDefault().CountOfContacts;
            return result;
        }





        //public IEnumerable<ContactSPDto> GetPaginatedContactsSP(int page, int pageSize, char? letter, string? search, string sortOrder)
        //{
        //    var result = _appDbContext.ContactListSP(letter, search, page, pageSize, sortOrder);
        //    return result;
        //}
        public IEnumerable<ContactBook> GetAll(char? letter)
        {

            List<ContactBook> contacts = _appDbContext.ContactBook
                .Include(c=>c.Country)
                .Include(c=>c.State)
                .Where(c => c.FirstName.StartsWith(letter.ToString().ToLower())).ToList();
            return contacts;
        }
        public IEnumerable<ContactBook> GetAllFavouriteContacts(char? letter)
        {

            List<ContactBook> contacts = _appDbContext.ContactBook
                .Include(c=>c.Country)
                .Include(c=>c.State)
                .Where(c => c.IsFavourite)
                .Where(c => c.FirstName.StartsWith(letter.ToString().ToLower())).ToList();
            return contacts;
        }

        public ContactBook? GetContact(int id)
        {
            var contact = _appDbContext.ContactBook
                .Include(c=>c.Country)
                .Include(c=>c.State)
                .FirstOrDefault(c => c.ContactId == id);
            return contact;
        }

        public int TotalContacts(string? letter,string search)
        {
            IQueryable<ContactBook> query = _appDbContext.ContactBook;

            if (search == "yes")
            {
                query = query.Where(c => c.FirstName.Contains(letter.ToString()) || c.LastName.Contains(letter.ToString()));
            }
            else if(letter!=null && search =="no"){
                query = query.Where(c => c.FirstName.StartsWith(letter.ToString()));

            }
            return query.Count();
        }

        public IEnumerable<ContactBook> GetPaginatedContacts(int page, int pageSize, string? letter, string sortOrder,string search)
        {
            if(search == "yes")
            {
                int skip = (page - 1) * pageSize;
                IQueryable<ContactBook> query = _appDbContext.ContactBook
           .Include(c => c.Country)
           .Include(c => c.State)
           .Where(c => c.FirstName.Contains(letter.ToString()) || c.LastName.Contains(letter.ToString()));

                // Apply sorting based on the provided sortOrder
                switch (sortOrder)
                {
                    case "asc":
                        query = query.OrderBy(c => c.FirstName);
                        break;
                    case "desc":
                        query = query.OrderByDescending(c => c.FirstName);
                        break;
                    default:
                        // Default to ascending order if sortOrder is not specified or invalid
                        query = query.OrderBy(c => c.FirstName);
                        break;
                }

                // Apply pagination
                query = query.Skip(skip).Take(pageSize);

                return query.ToList();
            }
            else
            {
                int skip = (page - 1) * pageSize;
                IQueryable<ContactBook> query = _appDbContext.ContactBook
           .Include(c => c.Country)
           .Include(c => c.State)
           .Where(c => c.FirstName.StartsWith(letter.ToString()));

                // Apply sorting based on the provided sortOrder
                switch (sortOrder)
                {
                    case "asc":
                        query = query.OrderBy(c => c.FirstName);
                        break;
                    case "desc":
                        query = query.OrderByDescending(c => c.FirstName);
                        break;
                    default:
                        // Default to ascending order if sortOrder is not specified or invalid
                        query = query.OrderBy(c => c.FirstName);
                        break;
                }

                // Apply pagination
                query = query.Skip(skip).Take(pageSize);

                return query.ToList();
            }
           

            
        }
        public IEnumerable<ContactBook> GetPaginatedContacts(int page, int pageSize, string sortOrder)
        {
           
            int skip = (page - 1) * pageSize;
            IQueryable<ContactBook> query = _appDbContext.ContactBook
       .Include(c => c.Country)
       .Include(c => c.State);

            // Apply sorting based on the provided sortOrder
            switch (sortOrder)
            {
                case "asc":
                    query = query.OrderBy(c => c.FirstName);
                    break;
                case "desc":
                    query = query.OrderByDescending(c => c.FirstName);
                    break;
                default:
                    // Default to ascending order if sortOrder is not specified or invalid
                    query = query.OrderBy(c => c.FirstName);
                    break;
            }

            // Apply pagination
            query = query.Skip(skip).Take(pageSize);

            return query.ToList();

            //return _appDbContext.ContactBook
            //    .Include(c => c.Country)
            //    .Include(c => c.State)
            //    .OrderBy(c => c.ContactId)
            //    .Skip(skip)
            //    .Take(pageSize)
            //    .ToList();
        } 
        
        public int TotalFavouriteContacts(char? letter)
        {
            IQueryable<ContactBook> query = _appDbContext.ContactBook.Where(c=>c.IsFavourite);

            if (letter.HasValue)
            {
                query = query.Where(c=>c.IsFavourite).Where(c => c.FirstName.StartsWith(letter.ToString()));
            }
            return query.Count();
        }

        public IEnumerable<ContactBook> GetFavouritePaginatedContacts(int page, int pageSize, char? letter)
        {
            int skip = (page - 1) * pageSize;

            return _appDbContext.ContactBook
                .Include(c=>c.Country)
                .Include(c=>c.State)
                .Where(c => c.IsFavourite)
                .Where(c => c.FirstName.StartsWith(letter.ToString()))
                .OrderBy(c => c.ContactId)
                .Skip(skip)
                .Take(pageSize)
                .ToList();
        }
        public IEnumerable<ContactBook> GetFavouritePaginatedContacts(int page, int pageSize)
        {
            int skip = (page - 1) * pageSize;

            return _appDbContext.ContactBook
                .Include(c => c.Country)
                .Include(c => c.State)
                .Where(c => c.IsFavourite)
                .OrderBy(c => c.ContactId)
                .Skip(skip)
                .Take(pageSize)
                .ToList();
        }

        public bool InsertContact(ContactBook contact)
        {
            var result = false;
            if (contact != null)
            {
                _appDbContext.ContactBook.Add(contact);
                _appDbContext.SaveChanges();
                result = true;
            }
            return result;
        }

        public bool UpdateContact(ContactBook contact)
        {
            var result = false;
            if (contact != null)
            {
                _appDbContext.ContactBook.Update(contact);
                _appDbContext.SaveChanges();
                result = true;
            }
            return result;
        }

        public bool DeleteContact(int id)
        {
            var result = false;
            var contact = _appDbContext.ContactBook.Find(id);
            if (contact != null)
            {
                _appDbContext.ContactBook.Remove(contact);
                _appDbContext.SaveChanges();
                result = true;
            }
            return result;
        }

        public bool ContactExist(string phone)
        {
            var contact = _appDbContext.ContactBook.FirstOrDefault(c => c.Phone == phone);
            if (contact != null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public bool ContactExist(int id, string phone)
        {
            var contact = _appDbContext.ContactBook.FirstOrDefault(c => c.Phone == phone && c.ContactId != id);
            if (contact != null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
