using ContactBookClientApp.Implementation;
using ContactBookClientApp.Infrastructure;
using ContactBookClientApp.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Diagnostics.CodeAnalysis;
using System.Globalization;
using System.Xml.XPath;

namespace ContactBookClientApp.Controllers
{
    public class ContactController : Controller
    {
        private readonly IHttpClientService _httpClientService;
        private readonly IConfiguration _configuration;
        private string endPoint;

        private readonly IImageUpload _imageUpload;


        public ContactController(IHttpClientService _httpClientService, IConfiguration _configuration, IImageUpload imageUpload)
        {
            this._httpClientService = _httpClientService;
            this._configuration = _configuration;
            endPoint = _configuration["EndPoint:CivicaApi"];


            _imageUpload = imageUpload;
        }

        public IActionResult GETCONTACTBYBIRTHDATEMONTH(int? month)
        {
            if (month.HasValue)
            {
                ViewBag.Month = month.Value;
                var apiUrl = $"{endPoint}Contact/GETCONTACTBYBIRTHDATEMONTH/" + month;
                var response = _httpClientService.ExecuteApiRequest<ServiceResponse<IEnumerable<ContactSPViewModel>>>
            (apiUrl, HttpMethod.Get, HttpContext.Request);


                if (response.Success)
                {
                    return View(response.Data);
                }
                return View(new List<ContactSPViewModel>());


            }
            else
            {
                ViewBag.Month = null;
                return View();

            }
        }

        public IActionResult GETCONTACTBYSTATE(int? stateId)
        {
            ViewBag.Country = GetCountry();
            ViewBag.State = GetState();
            if (stateId.HasValue)
            {
                ViewBag.StateId = stateId.Value;
                var apiUrl = $"{endPoint}Contact/GETCONTACTBYSTATE/" + stateId;
                var response = _httpClientService.ExecuteApiRequest<ServiceResponse<IEnumerable<ContactSPViewModel>>>
            (apiUrl, HttpMethod.Get, HttpContext.Request);


                if (response.Success)
                {
                    return View(response.Data);
                }
                return View(new List<ContactSPViewModel>());


            }
            else
            {
               
                return View();

            }

        }
        public IActionResult GetContactsCountBasedOnCountry(int? countryId)
        {
            ViewBag.Country = GetCountry();
            
            if (countryId.HasValue)
            {
                ViewBag.CountryId = countryId.Value;
                var apiUrl = $"{endPoint}Contact/GetContactsCountBasedOnCountry/" + countryId;
                var response = _httpClientService.ExecuteApiRequest<ServiceResponse<int>>
            (apiUrl, HttpMethod.Get, HttpContext.Request);


                if (response.Success)
                {
                    var contactCount = response.Data;
                    ViewBag.ContactCount = contactCount;    
                    return View(response.Data);
                }
                return View(new List<ContactSPViewModel>());


            }
            else
            {

                return View();

            }


        }

        public IActionResult GetContactsCountBasedOnGender()
        {  
            var apiUrlM = $"{endPoint}Contact/GetContactsCountBasedOnGender/M";
            var apiUrlF = $"{endPoint}Contact/GetContactsCountBasedOnGender/F";

            var responseM = _httpClientService.ExecuteApiRequest<ServiceResponse<int>>
            (apiUrlM, HttpMethod.Get, HttpContext.Request);
            var responseF = _httpClientService.ExecuteApiRequest<ServiceResponse<int>>
           (apiUrlF, HttpMethod.Get, HttpContext.Request);


            if (responseM.Success && responseF.Success)
                {
                    var contactCountM = responseM.Data;
                    ViewBag.ContactCountM = contactCountM;

                    var contactCountF = responseF.Data;
                    ViewBag.ContactCountF = contactCountF;
                    return View();
            }
            
            return View();  
            

           
          
        }







        public IActionResult Index(string? letter, string? search, int page = 1, int pageSize = 2, string sortOrder = "asc")
        {
            var apiGetContactsUrl = "";

            var apiGetCountUrl = "";
            var apiGetLettersUrl = $"{endPoint}Contact/GetAllContacts";

            //if (!string.IsNullOrEmpty(search))
            //{
            //    // If there's a search term, pass it to the API
            //    apiGetContactsUrl = $"{endPoint}Contact/SearchContacts?search={search}&page={page}&pageSize={pageSize}&sortOrder={sortOrder}";
            //    apiGetCountUrl = $"{endPoint}Contact/GetContactsCount?search={search}";
            //}
            //else
            //{
            //    // If no search term, proceed with regular pagination
            //    if (letter != null)
            //    {
            //        apiGetContactsUrl = $"{endPoint}Contact/GetAllContactsByPagination?letter={letter}&page={page}&pageSize={pageSize}&sortOrder={sortOrder}";
            //        apiGetCountUrl = $"{endPoint}Contact/GetContactsCount?letter={letter}&search=no";
            //    }
            //    else
            //    {
            //        apiGetContactsUrl = $"{endPoint}Contact/GetAllContactsByPagination?page={page}&pageSize={pageSize}&sortOrder={sortOrder}";
            //        apiGetCountUrl = $"{endPoint}Contact/GetContactsCount?search=no";
            //    }
            //}

            if (letter != null && search != "yes")
            {
                apiGetContactsUrl = $"{endPoint}Contact/GetAllContactsByPagination?letter={letter}&page={page}&pageSize={pageSize}&sortOrder={sortOrder}";
                apiGetCountUrl = $"{endPoint}Contact/GetContactsCount?letter={letter}&search=no";
            }
            else if (letter == null && search != "yes")
            {
                apiGetContactsUrl = $"{endPoint}Contact/GetAllContactsByPagination" + "?page=" + page + "&pageSize=" + pageSize + "&sortOrder=" + sortOrder;
                apiGetCountUrl = $"{endPoint}Contact/GetContactsCount?search=no";

            }
            else if (letter != null && search == "yes")
            {
                apiGetContactsUrl = $"{endPoint}Contact/GetAllContactsByPagination?letter={letter}&search=yes&page={page}&pageSize={pageSize}&sortOrder={sortOrder}";
                apiGetCountUrl = $"{endPoint}Contact/GetContactsCount?letter={letter}&search=yes";
            }
            else if (letter == null && search == "yes")
            {
                apiGetContactsUrl = $"{endPoint}Contact/GetAllContactsByPagination?letter={letter}&page={page}&pageSize={pageSize}&sortOrder={sortOrder}";
                apiGetCountUrl = $"{endPoint}Contact/GetContactsCount?letter={letter}&search=no";
            }


            // Toggle sortOrder between asc and desc when the user clicks on the button
            var newSortOrder = sortOrder == "asc" ? "desc" : "asc";
            ServiceResponse<int> countOfContact = new ServiceResponse<int>();

            countOfContact = _httpClientService.ExecuteApiRequest<ServiceResponse<int>>
                (apiGetCountUrl, HttpMethod.Get, HttpContext.Request);

            int totalCount = countOfContact.Data;

            if (totalCount == 0)
            {
                // Return an empty view
                return View(new List<ContactViewModel>());
            }
            var totalPages = (int)Math.Ceiling((double)totalCount / pageSize);


            if (page > totalPages)
            {
                // Redirect to the first page with the new page size
                return RedirectToAction("Index", new { letter, page = 1, pageSize });
            }
            ViewBag.CurrentPage = page;
            ViewBag.PageSize = pageSize;
            ViewBag.TotalPages = totalPages;
            ViewBag.Letter = letter;
            ViewBag.SortOrder = sortOrder; // Pass the new sortOrder to the view
            ViewBag.Search = search;

            ServiceResponse<IEnumerable<ContactViewModel>> response = new ServiceResponse<IEnumerable<ContactViewModel>>();

            response = _httpClientService.ExecuteApiRequest<ServiceResponse<IEnumerable<ContactViewModel>>>
                (apiGetContactsUrl, HttpMethod.Get, HttpContext.Request);

            ServiceResponse<IEnumerable<ContactViewModel>> getLetters = new ServiceResponse<IEnumerable<ContactViewModel>>();

            getLetters = _httpClientService.ExecuteApiRequest<ServiceResponse<IEnumerable<ContactViewModel>>>
                (apiGetLettersUrl, HttpMethod.Get, HttpContext.Request);

            if (getLetters.Success)
            {
                var distinctLetters = getLetters.Data.Select(contact => char.ToUpper(contact.FirstName.FirstOrDefault()))
                                            .Where(firstLetter => firstLetter != default(char))
                                            .Distinct()
                                             .OrderBy(letter => letter)
                                            .ToList();
                ViewBag.DistinctLetters = distinctLetters;

            }

            if (response.Success)
            {
                return View(response.Data);
            }

            return View(new List<ContactViewModel>());
        }

        public IActionResult Favourites(string? letter, int page = 1, int pageSize = 2)
        {
            var apiGetContactsUrl = "";

            var apiGetCountUrl = "";
            var apiGetLettersUrl = $"{endPoint}Contact/GetAllFavouriteContacts";
            if (letter != null)
            {
                apiGetContactsUrl = $"{endPoint}Contact/GetAllFavouriteContactsByPagination/?letter={letter}&page={page}&pageSize={pageSize}";
                apiGetCountUrl = $"{endPoint}Contact/GetFavouriteContactsCount/?letter={letter}";
            }
            else
            {
                apiGetContactsUrl = $"{endPoint}Contact/GetAllFavouriteContactsByPagination" + "?page=" + page + "&pageSize=" + pageSize;
                apiGetCountUrl = $"{endPoint}Contact/GetFavouriteContactsCount";

            }
            ServiceResponse<int> countOfContact = new ServiceResponse<int>();

            countOfContact = _httpClientService.ExecuteApiRequest<ServiceResponse<int>>
                (apiGetCountUrl, HttpMethod.Get, HttpContext.Request);

            int totalCount = countOfContact.Data;

            if (totalCount == 0)
            {
                // Return an empty view
                return View(new List<ContactViewModel>());
            }
            var totalPages = (int)Math.Ceiling((double)totalCount / pageSize);


            if (page > totalPages)
            {
                // Redirect to the first page with the new page size
                return RedirectToAction("Favourites", new { letter, page = 1, pageSize });
            }
            ViewBag.CurrentPage = page;
            ViewBag.PageSize = pageSize;
            ViewBag.TotalPages = totalPages;
            ViewBag.Letter = letter;

            ServiceResponse<IEnumerable<ContactViewModel>> response = new ServiceResponse<IEnumerable<ContactViewModel>>();

            response = _httpClientService.ExecuteApiRequest<ServiceResponse<IEnumerable<ContactViewModel>>>
                (apiGetContactsUrl, HttpMethod.Get, HttpContext.Request);

            ServiceResponse<IEnumerable<ContactViewModel>> getLetters = new ServiceResponse<IEnumerable<ContactViewModel>>();

            getLetters = _httpClientService.ExecuteApiRequest<ServiceResponse<IEnumerable<ContactViewModel>>>
                (apiGetLettersUrl, HttpMethod.Get, HttpContext.Request);

            if (getLetters.Success)
            {
                var distinctLetters = getLetters.Data.Select(contact => char.ToUpper(contact.FirstName.FirstOrDefault()))
                                            .Where(firstLetter => firstLetter != default(char))
                                            .Distinct()
                                             .OrderBy(letter => letter)
                                            .ToList();
                ViewBag.DistinctLetters = distinctLetters;

            }

            if (response.Success)
            {
                return View(response.Data);
            }

            return View(new List<ContactViewModel>());
        }

        [Authorize]

        public IActionResult Create()
        {
            AddContactViewModel viewModel = new AddContactViewModel();
            viewModel.States = GetState();
            viewModel.Country = GetCountry();
            return View(viewModel);
        }

        [Authorize]

        [HttpPost]
        public IActionResult Create(AddContactViewModel contactViewModel)
        {
            contactViewModel.States = GetState();
            contactViewModel.Country = GetCountry();
            if (ModelState.IsValid)
            {
                if (contactViewModel.File != null && contactViewModel.File.Length > 0)
                {
                    var fileName = Path.GetFileName(contactViewModel.File.FileName);
                    var fileExtension = Path.GetExtension(fileName).ToLower();

                    if (fileExtension != ".jpg" && fileExtension != ".jpeg" && fileExtension != ".png")
                    {
                        TempData["ErrorMessage"] = "Invalid file type. Only .jpg, .jpeg, and .png files are allowed.";
                        return View(contactViewModel);
                    }
                    using (var memoryStream = new MemoryStream())
                    {
                        contactViewModel.File.CopyTo(memoryStream);
                        contactViewModel.ImageByte = memoryStream.ToArray();
                    }
                    fileName = _imageUpload.AddImageFileToPath(contactViewModel.File);
                    contactViewModel.FileName = fileName;
                }

                var apiUrl = $"{endPoint}Contact/Create";
                var response = _httpClientService.PostHttpResponseMessage<AddContactViewModel>(apiUrl, contactViewModel, HttpContext.Request);
                if (response.IsSuccessStatusCode)
                {
                    string successMessage = response.Content.ReadAsStringAsync().Result;
                    var serviceResponse = JsonConvert.DeserializeObject<ServiceResponse<string>>(successMessage);

                    TempData["successMessage"] = serviceResponse?.Message;
                    return RedirectToAction("Index");
                }
                else
                {
                    string errorMessage = response.Content.ReadAsStringAsync().Result;
                    var errorResponse = JsonConvert.DeserializeObject<ServiceResponse<string>>(errorMessage);
                    if (errorResponse != null)
                    {
                        TempData["errorMessage"] = errorResponse.Message;

                    }
                    else
                    {
                        TempData["errorMessage"] = "Something went wrong. Please try after sometime";
                    }


                }

            }

            return View(contactViewModel);
        }
        public IActionResult Details(int id)
        {
            var apiUrl = $"{endPoint}Contact/GetContactById/" + id;
            var response = _httpClientService.GetHttpResponseMessage<UpdateContactViewModel>(apiUrl, HttpContext.Request);

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                var serviceResponse = JsonConvert.DeserializeObject<ServiceResponse<UpdateContactViewModel>>(data);

                if (serviceResponse != null && serviceResponse.Success && serviceResponse.Data != null)
                {
                    return View(serviceResponse.Data);
                }
                else
                {
                    TempData["errorMessage"] = serviceResponse?.Message;
                    return RedirectToAction("Index");
                }
            }
            else
            {
                string errorData = response.Content.ReadAsStringAsync().Result;
                var errorResponse = JsonConvert.DeserializeObject<ServiceResponse<UpdateContactViewModel>>(errorData);
                if (errorResponse != null)
                {
                    TempData["errorMessage"] = errorResponse.Message;

                }
                else
                {
                    TempData["errorMessage"] = "Something went wrong. Please try after sometime";
                }
                return RedirectToAction("Index");

            }

        }

        [Authorize]

        [HttpGet]
        public IActionResult Edit(int id)
        {
            var apiUrl = $"{endPoint}Contact/GetContactById/" + id;
            var response = _httpClientService.GetHttpResponseMessage<UpdateContactViewModel>(apiUrl, HttpContext.Request);

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                var serviceResponse = JsonConvert.DeserializeObject<ServiceResponse<UpdateContactViewModel>>(data);

                if (serviceResponse != null && serviceResponse.Success && serviceResponse.Data != null)
                {
                    UpdateContactViewModel viewModel = serviceResponse.Data;

                    viewModel.States = GetState();
                    viewModel.Countries = GetCountry();
                    return View(viewModel);
                }
                else
                {
                    TempData["errorMessage"] = serviceResponse?.Message;
                    return RedirectToAction("Index");
                }
            }
            else
            {
                string errorData = response.Content.ReadAsStringAsync().Result;
                var errorResponse = JsonConvert.DeserializeObject<ServiceResponse<UpdateContactViewModel>>(errorData);
                if (errorResponse != null)
                {
                    TempData["errorMessage"] = errorResponse.Message;

                }
                else
                {
                    TempData["errorMessage"] = "Something went wrong. Please try after sometime";
                }

                return RedirectToAction("Index");

            }

        }

        [Authorize]

        [HttpPost]

        public IActionResult Edit(UpdateContactViewModel updateContactView)
        {

            updateContactView.States = GetState();
            updateContactView.Countries = GetCountry();
            if (ModelState.IsValid)
            {
                if (updateContactView.File != null && updateContactView.File.Length > 0)
                {
                    var fileName = Path.GetFileName(updateContactView.File.FileName);
                    var fileExtension = Path.GetExtension(fileName).ToLower();

                    if (fileExtension != ".jpg" && fileExtension != ".jpeg" && fileExtension != ".png")
                    {
                        TempData["ErrorMessage"] = "Invalid file type. Only .jpg, .jpeg, and .png files are allowed.";
                        //ModelState.AddModelError("File", "Invalid file type. Only .jpg, .jpeg, and .png files are allowed.");
                        return View(updateContactView);
                    }
                    using (var memoryStream = new MemoryStream())
                    {
                        updateContactView.File.CopyTo(memoryStream);
                        updateContactView.ImageByte = memoryStream.ToArray();
                    }

                    fileName = _imageUpload.AddImageFileToPath(updateContactView.File);
                    updateContactView.FileName = fileName;
                }
                else
                {
                    // Use the previous file name if no new file is provided
                    updateContactView.FileName = updateContactView.FileName;
                    updateContactView.ImageByte = updateContactView.ImageByte;
                }
                if (updateContactView.RemoveImage)
                {
                    updateContactView.FileName = null; // Set FileName to null to remove the image
                    updateContactView.ImageByte = null;
                }

                var apiUrl = $"{endPoint}Contact/ModifyContact";

                HttpResponseMessage response = _httpClientService.PutHttpResponseMessage(apiUrl, updateContactView, HttpContext.Request);

                if (response.IsSuccessStatusCode)
                {
                    string successMessage = response.Content.ReadAsStringAsync().Result;
                    var serviceResponse = JsonConvert.DeserializeObject<ServiceResponse<string>>(successMessage);

                    TempData["successMessage"] = serviceResponse?.Message;
                    return RedirectToAction("Index");
                }
                else
                {
                    string errorMessage = response.Content.ReadAsStringAsync().Result;
                    var errorResponse = JsonConvert.DeserializeObject<ServiceResponse<string>>(errorMessage);
                    if (errorResponse != null)
                    {
                        TempData["errorMessage"] = errorResponse.Message;

                    }
                    else
                    {
                        TempData["errorMessage"] = "Something went wrong. Please try after sometime";
                    }
                    return RedirectToAction("Index");

                }
            }

            return View(updateContactView);
        }

        [Authorize]

        [HttpGet]
        public IActionResult Delete(int id)
        {
            var apiUrl = $"{endPoint}Contact/GetContactById/" + id;
            var response = _httpClientService.GetHttpResponseMessage<ContactViewModel>(apiUrl, HttpContext.Request);

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                var serviceResponse = JsonConvert.DeserializeObject<ServiceResponse<ContactViewModel>>(data);

                if (serviceResponse != null && serviceResponse.Success && serviceResponse.Data != null)
                {
                    return View(serviceResponse.Data);
                }
                else
                {
                    TempData["errorMessage"] = serviceResponse?.Message;
                    return RedirectToAction("Index");
                }
            }
            else
            {
                string errorData = response.Content.ReadAsStringAsync().Result;
                var errorResponse = JsonConvert.DeserializeObject<ServiceResponse<ContactViewModel>>(errorData);
                if (errorResponse != null)
                {
                    TempData["errorMessage"] = errorResponse.Message;

                }
                else
                {
                    TempData["errorMessage"] = "Something went wrong. Please try after sometime";
                }
                return RedirectToAction("Index");

            }
        }

        [Authorize]

        [HttpPost]
        public IActionResult DeleteConfirm(int contactId)
        {
            var apiUrl = $"{endPoint}Contact/Remove/" + contactId;
            var response = _httpClientService.ExecuteApiRequest<ServiceResponse<string>>($"{apiUrl}", HttpMethod.Delete, HttpContext.Request);
            if (response.Success)
            {
                TempData["successMessage"] = response.Message;
                return RedirectToAction("Index");
            }
            else
            {
                TempData["errorMessage"] = response.Message;
                return RedirectToAction("Index");
            }

        }

        [ExcludeFromCodeCoverage]
        private List<StateViewModel> GetState()
        {
            ServiceResponse<IEnumerable<StateViewModel>> response = new ServiceResponse<IEnumerable<StateViewModel>>();
            string endPoint = _configuration["EndPoint:CivicaApi"];
            response = _httpClientService.ExecuteApiRequest<ServiceResponse<IEnumerable<StateViewModel>>>
                ($"{endPoint}State/GetAllStates", HttpMethod.Get, HttpContext.Request);

            if (response.Success)
            {
                return response.Data.ToList();
            }
            return new List<StateViewModel>();
        }
        [ExcludeFromCodeCoverage]
        private List<CountryViewModel> GetCountry()
        {
            ServiceResponse<IEnumerable<CountryViewModel>> response = new ServiceResponse<IEnumerable<CountryViewModel>>();
            string endPoint = _configuration["EndPoint:CivicaApi"];
            response = _httpClientService.ExecuteApiRequest<ServiceResponse<IEnumerable<CountryViewModel>>>
                ($"{endPoint}Country/GetAllCountries", HttpMethod.Get, HttpContext.Request);

            if (response.Success)
            {
                return response.Data.ToList();
            }
            return new List<CountryViewModel>();
        }

    }
}
