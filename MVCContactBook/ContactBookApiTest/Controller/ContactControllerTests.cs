using AutoFixture;
using ContactBookApi.Controllers;
using ContactBookApi.Dtos;
using ContactBookApi.Models;
using ContactBookApi.Services.Contract;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ContactBookApiTest.Controller
{
    public class ContactControllerTests
    {
        [Fact]
        public void GetAllContacts_ReturnsOkWithContacts_WhenLetterIsNull()
        {
            //Arrange
            var contacts = new List<ContactBook>
             {
            new ContactBook{ContactId=1,FirstName="Contact 1", Phone = "1234567890"},
            new ContactBook{ContactId=2,FirstName="Contact 2", Phone = "1234567899"},
            };


            var response = new ServiceResponse<IEnumerable<ContactDto>>
            {
                Success = true,
                Data = contacts.Select(c => new ContactDto { ContactId = c.ContactId, FirstName = c.FirstName, Phone = c.Phone }) // Convert to ContactDto
            };

            var mockContactService = new Mock<IContactService>();
            var target = new ContactController(mockContactService.Object);
            mockContactService.Setup(c => c.GetContacts(null)).Returns(response);

            //Act
            var actual = target.GetAllContacts(null) as OkObjectResult;

            //Assert
            Assert.NotNull(actual);
            Assert.Equal(200, actual.StatusCode);
            Assert.NotNull(actual.Value);
            Assert.Equal(response, actual.Value);
            mockContactService.Verify(c => c.GetContacts(null), Times.Once);
        }

        [Fact]
        public void GetAllContacts_ReturnsOkWithContacts_WhenLetterIsNotNull()
        {
            //Arrange
            var contacts = new List<ContactBook>
             {
            new ContactBook{ContactId=1,FirstName="Contact 1", Phone = "1234567890"},
            new ContactBook{ContactId=2,FirstName="Contact 2", Phone = "1234567899"},
            };

            var letter = 'a';

            var response = new ServiceResponse<IEnumerable<ContactDto>>
            {
                Success = true,
                Data = contacts.Select(c => new ContactDto { ContactId = c.ContactId, FirstName = c.FirstName, Phone = c.Phone }) // Convert to ContactDto
            };

            var mockContactService = new Mock<IContactService>();
            var target = new ContactController(mockContactService.Object);
            mockContactService.Setup(c => c.GetContacts(letter)).Returns(response);

            //Act
            var actual = target.GetAllContacts(letter) as OkObjectResult;

            //Assert
            Assert.NotNull(actual);
            Assert.Equal(200, actual.StatusCode);
            Assert.NotNull(actual.Value);
            Assert.Equal(response, actual.Value);
            mockContactService.Verify(c => c.GetContacts(letter), Times.Once);
        }
        [Fact]
        public void GetAllContacts_ReturnsNotFound_WhenLetterIsNotNull()
        {
            //Arrange
            var contacts = new List<ContactBook>
             {
            new ContactBook{ContactId=1,FirstName="Contact 1", Phone = "1234567890"},
            new ContactBook{ContactId=2,FirstName="Contact 2", Phone = "1234567899"},
            };

            var letter = 'a';

            var response = new ServiceResponse<IEnumerable<ContactDto>>
            {
                Success = false,
                Data = contacts.Select(c => new ContactDto { ContactId = c.ContactId, FirstName = c.FirstName, Phone = c.Phone }) // Convert to ContactDto
            };

            var mockContactService = new Mock<IContactService>();
            var target = new ContactController(mockContactService.Object);
            mockContactService.Setup(c => c.GetContacts(letter)).Returns(response);

            //Act
            var actual = target.GetAllContacts(letter) as NotFoundObjectResult;

            //Assert
            Assert.NotNull(actual);
            Assert.Equal(404, actual.StatusCode);
            Assert.NotNull(actual.Value);
            Assert.Equal(response, actual.Value);
            mockContactService.Verify(c => c.GetContacts(letter), Times.Once);
        }

        [Fact]
        public void GetAllContacts_ReturnsNotFound_WhenLetterIsNull()
        {
            //Arrange
            var contacts = new List<ContactBook>
             {
            new ContactBook{ContactId=1,FirstName="Contact 1", Phone = "1234567890"},
            new ContactBook{ContactId=2,FirstName="Contact 2", Phone = "1234567899"},
            };

            var response = new ServiceResponse<IEnumerable<ContactDto>>
            {
                Success = false,
                Data = contacts.Select(c => new ContactDto { ContactId = c.ContactId, FirstName = c.FirstName, Phone = c.Phone }) // Convert to ContactDto
            };

            var mockContactService = new Mock<IContactService>();
            var target = new ContactController(mockContactService.Object);
            mockContactService.Setup(c => c.GetContacts(null)).Returns(response);

            //Act
            var actual = target.GetAllContacts(null) as NotFoundObjectResult;

            //Assert
            Assert.NotNull(actual);
            Assert.Equal(404, actual.StatusCode);
            Assert.NotNull(actual.Value);
            Assert.Equal(response, actual.Value);
            mockContactService.Verify(c => c.GetContacts(null), Times.Once);
        }
        [Fact]
        public void GetAllFavouriteContacts_ReturnsOkWithContacts_WhenLetterIsNull()
        {
            //Arrange
            var contacts = new List<ContactBook>
             {
            new ContactBook{ContactId=1,FirstName="Contact 1", Phone = "1234567890"},
            new ContactBook{ContactId=2,FirstName="Contact 2", Phone = "1234567899"},
            };


            var response = new ServiceResponse<IEnumerable<ContactDto>>
            {
                Success = true,
                Data = contacts.Select(c => new ContactDto { ContactId = c.ContactId, FirstName = c.FirstName, Phone = c.Phone }) // Convert to ContactDto
            };

            var mockContactService = new Mock<IContactService>();
            var target = new ContactController(mockContactService.Object);
            mockContactService.Setup(c => c.GetFavouriteContacts(null)).Returns(response);

            //Act
            var actual = target.GetAllFavouriteContacts(null) as OkObjectResult;

            //Assert
            Assert.NotNull(actual);
            Assert.Equal(200, actual.StatusCode);
            Assert.NotNull(actual.Value);
            Assert.Equal(response, actual.Value);
            mockContactService.Verify(c => c.GetFavouriteContacts(null), Times.Once);
        }

        [Fact]
        public void GetAllFavouriteContacts_ReturnsOkWithContacts_WhenLetterIsNotNull()
        {
            //Arrange
            var contacts = new List<ContactBook>
             {
            new ContactBook{ContactId=1,FirstName="Contact 1", Phone = "1234567890"},
            new ContactBook{ContactId=2,FirstName="Contact 2", Phone = "1234567899"},
            };

            var letter = 'a';

            var response = new ServiceResponse<IEnumerable<ContactDto>>
            {
                Success = true,
                Data = contacts.Select(c => new ContactDto { ContactId = c.ContactId, FirstName = c.FirstName, Phone = c.Phone }) // Convert to ContactDto
            };

            var mockContactService = new Mock<IContactService>();
            var target = new ContactController(mockContactService.Object);
            mockContactService.Setup(c => c.GetFavouriteContacts(letter)).Returns(response);

            //Act
            var actual = target.GetAllFavouriteContacts(letter) as OkObjectResult;

            //Assert
            Assert.NotNull(actual);
            Assert.Equal(200, actual.StatusCode);
            Assert.NotNull(actual.Value);
            Assert.Equal(response, actual.Value);
            mockContactService.Verify(c => c.GetFavouriteContacts(letter), Times.Once);
        }
        [Fact]
        public void GetAllFavouriteContacts_ReturnsNotFound_WhenLetterIsNotNull()
        {
            //Arrange
            var contacts = new List<ContactBook>
             {
            new ContactBook{ContactId=1,FirstName="Contact 1", Phone = "1234567890"},
            new ContactBook{ContactId=2,FirstName="Contact 2", Phone = "1234567899"},
            };

            var letter = 'a';

            var response = new ServiceResponse<IEnumerable<ContactDto>>
            {
                Success = false,
                Data = contacts.Select(c => new ContactDto { ContactId = c.ContactId, FirstName = c.FirstName, Phone = c.Phone }) // Convert to ContactDto
            };

            var mockContactService = new Mock<IContactService>();
            var target = new ContactController(mockContactService.Object);
            mockContactService.Setup(c => c.GetFavouriteContacts(letter)).Returns(response);

            //Act
            var actual = target.GetAllFavouriteContacts(letter) as NotFoundObjectResult;

            //Assert
            Assert.NotNull(actual);
            Assert.Equal(404, actual.StatusCode);
            Assert.NotNull(actual.Value);
            Assert.Equal(response, actual.Value);
            mockContactService.Verify(c => c.GetFavouriteContacts(letter), Times.Once);
        }

        [Fact]
        public void GetAllFavouriteContacts_ReturnsNotFound_WhenLetterIsNull()
        {
            //Arrange
            var contacts = new List<ContactBook>
             {
            new ContactBook{ContactId=1,FirstName="Contact 1", Phone = "1234567890"},
            new ContactBook{ContactId=2,FirstName="Contact 2", Phone = "1234567899"},
            };

            var response = new ServiceResponse<IEnumerable<ContactDto>>
            {
                Success = false,
                Data = contacts.Select(c => new ContactDto { ContactId = c.ContactId, FirstName = c.FirstName, Phone = c.Phone }) // Convert to ContactDto
            };

            var mockContactService = new Mock<IContactService>();
            var target = new ContactController(mockContactService.Object);
            mockContactService.Setup(c => c.GetFavouriteContacts(null)).Returns(response);

            //Act
            var actual = target.GetAllFavouriteContacts(null) as NotFoundObjectResult;

            //Assert
            Assert.NotNull(actual);
            Assert.Equal(404, actual.StatusCode);
            Assert.NotNull(actual.Value);
            Assert.Equal(response, actual.Value);
            mockContactService.Verify(c => c.GetFavouriteContacts(null), Times.Once);
        }

        [Fact]
        public void GetPaginatedContacts_ReturnsOkWithContacts_WhenLetterIsNullSearchIsNull()
        {
            //Arrange
            var contacts = new List<ContactBook>
            {
               new ContactBook{ContactId=1,FirstName="Contact 1", Phone = "1234567890"},
                 new ContactBook{ContactId=2,FirstName="Contact 2", Phone = "1234567899"},
             };

            int page = 1;
            int pageSize = 2;
            string sortOrder = "asc";

            var response = new ServiceResponse<IEnumerable<ContactDto>>
            {
                Success = true,
                Data = contacts.Select(c => new ContactDto { ContactId = c.ContactId, FirstName = c.FirstName, Phone = c.Phone }) // Convert to ContactDto
            };

            var mockContactService = new Mock<IContactService>();
            var target = new ContactController(mockContactService.Object);
            mockContactService.Setup(c => c.GetPaginatedContacts(page, pageSize, sortOrder)).Returns(response);

            //Act
            var actual = target.GetPaginatedContacts(null,null, page, pageSize,sortOrder) as OkObjectResult;

            //Assert
            Assert.NotNull(actual);
            Assert.Equal(200, actual.StatusCode);
            Assert.NotNull(actual.Value);
            Assert.Equal(response, actual.Value);
            mockContactService.Verify(c => c.GetPaginatedContacts(page, pageSize, sortOrder), Times.Once);
        }

        [Fact]
        public void GetPaginatedContacts_ReturnsOkWithContacts_WhenLetterIsNullSearchIsNotNull()
        {
            //Arrange
            var contacts = new List<ContactBook>
            {
               new ContactBook{ContactId=1,FirstName="Contact 1", Phone = "1234567890"},
                 new ContactBook{ContactId=2,FirstName="Contact 2", Phone = "1234567899"},
             };

            int page = 1;
            int pageSize = 2;
            string sortOrder = "asc";
            string search = "yes";

            var response = new ServiceResponse<IEnumerable<ContactDto>>
            {
                Success = true,
                Data = contacts.Select(c => new ContactDto { ContactId = c.ContactId, FirstName = c.FirstName, Phone = c.Phone }) // Convert to ContactDto
            };

            var mockContactService = new Mock<IContactService>();
            var target = new ContactController(mockContactService.Object);
            mockContactService.Setup(c => c.GetPaginatedContacts(page, pageSize, sortOrder)).Returns(response);

            //Act
            var actual = target.GetPaginatedContacts(null, search, page, pageSize, sortOrder) as OkObjectResult;

            //Assert
            Assert.NotNull(actual);
            Assert.Equal(200, actual.StatusCode);
            Assert.NotNull(actual.Value);
            Assert.Equal(response, actual.Value);
            mockContactService.Verify(c => c.GetPaginatedContacts(page, pageSize, sortOrder), Times.Once);
        }

        [Fact]
        public void GetPaginatedContacts_ReturnsOkWithContacts_WhenLetterIsNotNullSearchIsNotNull()
        {
            //Arrange
            var contacts = new List<ContactBook>
            {
               new ContactBook{ContactId=1,FirstName="Contact 1", Phone = "1234567890"},
                 new ContactBook{ContactId=2,FirstName="Contact 2", Phone = "1234567899"},
             };

            var letter = "r";
            int page = 1;
            int pageSize = 2;
            string sortOrder = "asc";
            string search = "ra";

            var response = new ServiceResponse<IEnumerable<ContactDto>>
            {
                Success = true,
                Data = contacts.Select(c => new ContactDto { ContactId = c.ContactId, FirstName = c.FirstName, Phone = c.Phone }) // Convert to ContactDto
            };

            var mockContactService = new Mock<IContactService>();
            var target = new ContactController(mockContactService.Object);
            mockContactService.Setup(c => c.GetPaginatedContacts(page, pageSize, letter, sortOrder, search)).Returns(response);

            //Act
            var actual = target.GetPaginatedContacts(letter,search,page, pageSize, sortOrder) as OkObjectResult;

            //Assert
            Assert.NotNull(actual);
            Assert.Equal(200, actual.StatusCode);
            Assert.NotNull(actual.Value);
            Assert.Equal(response, actual.Value);
            mockContactService.Verify(c => c.GetPaginatedContacts(page, pageSize, letter, sortOrder, search), Times.Once);
        }

        [Fact]
        public void GetPaginatedContacts_ReturnsOkWithContacts_WhenLetterIsNotNullSearchIsNull()
        {
            //Arrange
            var contacts = new List<ContactBook>
            {
               new ContactBook{ContactId=1,FirstName="Contact 1", Phone = "1234567890"},
                 new ContactBook{ContactId=2,FirstName="Contact 2", Phone = "1234567899"},
             };

            var letter = "r";
            int page = 1;
            int pageSize = 2;
            string sortOrder = "asc";
          

            var response = new ServiceResponse<IEnumerable<ContactDto>>
            {
                Success = true,
                Data = contacts.Select(c => new ContactDto { ContactId = c.ContactId, FirstName = c.FirstName, Phone = c.Phone }) // Convert to ContactDto
            };

            var mockContactService = new Mock<IContactService>();
            var target = new ContactController(mockContactService.Object);
            mockContactService.Setup(c => c.GetPaginatedContacts(page, pageSize, letter, sortOrder, null)).Returns(response);

            //Act
            var actual = target.GetPaginatedContacts(letter, null, page, pageSize, sortOrder) as OkObjectResult;

            //Assert
            Assert.NotNull(actual);
            Assert.Equal(200, actual.StatusCode);
            Assert.NotNull(actual.Value);
            Assert.Equal(response, actual.Value);
            mockContactService.Verify(c => c.GetPaginatedContacts(page, pageSize, letter, sortOrder, null), Times.Once);
        }

        [Fact]
        public void GetPaginatedContacts_ReturnsNotFound_WhenLetterIsNullSearchIsNull()
        {
            //Arrange
            var contacts = new List<ContactBook>
            {
               new ContactBook{ContactId=1,FirstName="Contact 1", Phone = "1234567890"},
                 new ContactBook{ContactId=2,FirstName="Contact 2", Phone = "1234567899"},
             };

            int page = 1;
            int pageSize = 2;
            string sortOrder = "asc";
            string search = null;

            var response = new ServiceResponse<IEnumerable<ContactDto>>
            {
                Success = false,
                Data = contacts.Select(c => new ContactDto { ContactId = c.ContactId, FirstName = c.FirstName, Phone = c.Phone }) // Convert to ContactDto
            };

            var mockContactService = new Mock<IContactService>();
            var target = new ContactController(mockContactService.Object);
            mockContactService.Setup(c => c.GetPaginatedContacts(page, pageSize, sortOrder)).Returns(response);

            //Act
            var actual = target.GetPaginatedContacts(null, search, page, pageSize, sortOrder) as NotFoundObjectResult;

            //Assert
            Assert.NotNull(actual);
            Assert.Equal(404, actual.StatusCode);
            Assert.NotNull(actual.Value);
            Assert.Equal(response, actual.Value);
            mockContactService.Verify(c => c.GetPaginatedContacts(page, pageSize, sortOrder), Times.Once);
        }

        [Fact]
        public void GetPaginatedContacts_ReturnsNotFound_WhenLetterIsNullSearchIsNotNull()
        {
            //Arrange
            var contacts = new List<ContactBook>
            {
               new ContactBook{ContactId=1,FirstName="Contact 1", Phone = "1234567890"},
                 new ContactBook{ContactId=2,FirstName="Contact 2", Phone = "1234567899"},
             };

            int page = 1;
            int pageSize = 2;
            string sortOrder = "asc";
            string search = "yes";

            var response = new ServiceResponse<IEnumerable<ContactDto>>
            {
                Success = false,
                Data = contacts.Select(c => new ContactDto { ContactId = c.ContactId, FirstName = c.FirstName, Phone = c.Phone }) // Convert to ContactDto
            };

            var mockContactService = new Mock<IContactService>();
            var target = new ContactController(mockContactService.Object);
            mockContactService.Setup(c => c.GetPaginatedContacts(page, pageSize, sortOrder)).Returns(response);

            //Act
            var actual = target.GetPaginatedContacts(null, search, page, pageSize, sortOrder) as NotFoundObjectResult;

            //Assert
            Assert.NotNull(actual);
            Assert.Equal(404, actual.StatusCode);
            Assert.NotNull(actual.Value);
            Assert.Equal(response, actual.Value);
            mockContactService.Verify(c => c.GetPaginatedContacts(page, pageSize, sortOrder), Times.Once);
        }

        [Fact]
        public void GetPaginatedContacts_ReturnsNotFound_WhenLetterIsNotNullSearchIsNotNull()
        {
            //Arrange
            var contacts = new List<ContactBook>
            {
               new ContactBook{ContactId=1,FirstName="Contact 1", Phone = "1234567890"},
                 new ContactBook{ContactId=2,FirstName="Contact 2", Phone = "1234567899"},
             };

            var letter = "d";
            int page = 1;
            int pageSize = 2;
            string sortOrder = "asc";
            string search = "ra";

            var response = new ServiceResponse<IEnumerable<ContactDto>>
            {
                Success = false,
                Data = contacts.Select(c => new ContactDto { ContactId = c.ContactId, FirstName = c.FirstName, Phone = c.Phone }) // Convert to ContactDto
            };

            var mockContactService = new Mock<IContactService>();
            var target = new ContactController(mockContactService.Object);
            mockContactService.Setup(c => c.GetPaginatedContacts(page, pageSize, letter, sortOrder,search)).Returns(response);

            //Act
            var actual = target.GetPaginatedContacts(letter,search, page, pageSize,sortOrder) as NotFoundObjectResult;

            //Assert
            Assert.NotNull(actual);
            Assert.Equal(404, actual.StatusCode);
            Assert.NotNull(actual.Value);
            Assert.Equal(response, actual.Value);
            mockContactService.Verify(c => c.GetPaginatedContacts(page, pageSize, letter, sortOrder, search), Times.Once);
        }

        [Fact]
        public void GetPaginatedContacts_ReturnsNotFound_WhenLetterIsNotNullSearchIsNull()
        {
            //Arrange
            var contacts = new List<ContactBook>
            {
               new ContactBook{ContactId=1,FirstName="Contact 1", Phone = "1234567890"},
                 new ContactBook{ContactId=2,FirstName="Contact 2", Phone = "1234567899"},
             };

            var letter = "d";
            int page = 1;
            int pageSize = 2;
            string sortOrder = "asc";
           

            var response = new ServiceResponse<IEnumerable<ContactDto>>
            {
                Success = false,
                Data = contacts.Select(c => new ContactDto { ContactId = c.ContactId, FirstName = c.FirstName, Phone = c.Phone }) // Convert to ContactDto
            };

            var mockContactService = new Mock<IContactService>();
            var target = new ContactController(mockContactService.Object);
            mockContactService.Setup(c => c.GetPaginatedContacts(page, pageSize, letter, sortOrder, null)).Returns(response);

            //Act
            var actual = target.GetPaginatedContacts(letter, null, page, pageSize, sortOrder) as NotFoundObjectResult;

            //Assert
            Assert.NotNull(actual);
            Assert.Equal(404, actual.StatusCode);
            Assert.NotNull(actual.Value);
            Assert.Equal(response, actual.Value);
            mockContactService.Verify(c => c.GetPaginatedContacts(page, pageSize, letter, sortOrder, null), Times.Once);
        }

        [Fact]
        public void GetFavouritePaginatedContacts_ReturnsOkWithContacts_WhenLetterIsNull()
        {
            //Arrange
            var contacts = new List<ContactBook>
            {
               new ContactBook{ContactId=1,FirstName="Contact 1", Phone = "1234567890"},
                 new ContactBook{ContactId=2,FirstName="Contact 2", Phone = "1234567899"},
             };

            int page = 1;
            int pageSize = 2;

            var response = new ServiceResponse<IEnumerable<ContactDto>>
            {
                Success = true,
                Data = contacts.Select(c => new ContactDto { ContactId = c.ContactId, FirstName = c.FirstName, Phone = c.Phone }) // Convert to ContactDto
            };

            var mockContactService = new Mock<IContactService>();
            var target = new ContactController(mockContactService.Object);
            mockContactService.Setup(c => c.GetFavouritePaginatedContacts(page, pageSize)).Returns(response);

            //Act
            var actual = target.GetFavouritePaginatedContacts(null, page, pageSize) as OkObjectResult;

            //Assert
            Assert.NotNull(actual);
            Assert.Equal(200, actual.StatusCode);
            Assert.NotNull(actual.Value);
            Assert.Equal(response, actual.Value);
            mockContactService.Verify(c => c.GetFavouritePaginatedContacts(page, pageSize), Times.Once);
        }

        [Fact]
        public void GetFavouritePaginatedContacts_ReturnsOkWithContacts_WhenLetterIsNotNull()
        {
            //Arrange
            var contacts = new List<ContactBook>
            {
               new ContactBook{ContactId=1,FirstName="Contact 1", Phone = "1234567890"},
                 new ContactBook{ContactId=2,FirstName="Contact 2", Phone = "1234567899"},
             };

            var letter = 'd';
            int page = 1;
            int pageSize = 2;

            var response = new ServiceResponse<IEnumerable<ContactDto>>
            {
                Success = true,
                Data = contacts.Select(c => new ContactDto { ContactId = c.ContactId, FirstName = c.FirstName, Phone = c.Phone }) // Convert to ContactDto
            };

            var mockContactService = new Mock<IContactService>();
            var target = new ContactController(mockContactService.Object);
            mockContactService.Setup(c => c.GetFavouritePaginatedContacts(page, pageSize, letter)).Returns(response);

            //Act
            var actual = target.GetFavouritePaginatedContacts(letter, page, pageSize) as OkObjectResult;

            //Assert
            Assert.NotNull(actual);
            Assert.Equal(200, actual.StatusCode);
            Assert.NotNull(actual.Value);
            Assert.Equal(response, actual.Value);
            mockContactService.Verify(c => c.GetFavouritePaginatedContacts(page, pageSize, letter), Times.Once);
        }

        [Fact]
        public void GetFavouritePaginatedContacts_ReturnsNotFound_WhenLetterIsNull()
        {
            //Arrange
            var contacts = new List<ContactBook>
            {
               new ContactBook{ContactId=1,FirstName="Contact 1", Phone = "1234567890"},
                 new ContactBook{ContactId=2,FirstName="Contact 2", Phone = "1234567899"},
             };

            int page = 1;
            int pageSize = 2;

            var response = new ServiceResponse<IEnumerable<ContactDto>>
            {
                Success = false,
                Data = contacts.Select(c => new ContactDto { ContactId = c.ContactId, FirstName = c.FirstName, Phone = c.Phone }) // Convert to ContactDto
            };

            var mockContactService = new Mock<IContactService>();
            var target = new ContactController(mockContactService.Object);
            mockContactService.Setup(c => c.GetFavouritePaginatedContacts(page, pageSize)).Returns(response);

            //Act
            var actual = target.GetFavouritePaginatedContacts(null, page, pageSize) as NotFoundObjectResult;

            //Assert
            Assert.NotNull(actual);
            Assert.Equal(404, actual.StatusCode);
            Assert.NotNull(actual.Value);
            Assert.Equal(response, actual.Value);
            mockContactService.Verify(c => c.GetFavouritePaginatedContacts(page, pageSize), Times.Once);
        }

        [Fact]
        public void GetFavouritePaginatedContacts_ReturnsNotFound_WhenLetterIsNotNull()
        {
            //Arrange
            var contacts = new List<ContactBook>
            {
               new ContactBook{ContactId=1,FirstName="Contact 1", Phone = "1234567890"},
                 new ContactBook{ContactId=2,FirstName="Contact 2", Phone = "1234567899"},
             };

            var letter = 'd';
            int page = 1;
            int pageSize = 2;

            var response = new ServiceResponse<IEnumerable<ContactDto>>
            {
                Success = false,
                Data = contacts.Select(c => new ContactDto { ContactId = c.ContactId, FirstName = c.FirstName, Phone = c.Phone }) // Convert to ContactDto
            };

            var mockContactService = new Mock<IContactService>();
            var target = new ContactController(mockContactService.Object);
            mockContactService.Setup(c => c.GetFavouritePaginatedContacts(page, pageSize, letter)).Returns(response);

            //Act
            var actual = target.GetFavouritePaginatedContacts(letter, page, pageSize) as NotFoundObjectResult;

            //Assert
            Assert.NotNull(actual);
            Assert.Equal(404, actual.StatusCode);
            Assert.NotNull(actual.Value);
            Assert.Equal(response, actual.Value);
            mockContactService.Verify(c => c.GetFavouritePaginatedContacts(page, pageSize, letter), Times.Once);
        }

        [Fact]
        public void GetTotalCountOfContacts_ReturnsOkWithContacts_WhenLetterIsNullSearchIsNo()
        {
            //Arrange
            var contacts = new List<ContactBook>
             {
            new ContactBook{ContactId=1,FirstName="Contact 1", Phone = "1234567890"},
            new ContactBook{ContactId=2,FirstName="Contact 2", Phone = "1234567899"},
            };
            string search = "no";


            var response = new ServiceResponse<int>
            {
                Success = true,
                Data = contacts.Count
            };

            var mockContactService = new Mock<IContactService>();
            var target = new ContactController(mockContactService.Object);
            mockContactService.Setup(c => c.TotalContacts(null,search)).Returns(response);

            //Act
            var actual = target.GetTotalCountOfContacts(null,search) as OkObjectResult;

            //Assert
            Assert.NotNull(actual);
            Assert.Equal(200, actual.StatusCode);
            Assert.NotNull(actual.Value);
            Assert.Equal(response, actual.Value);
            Assert.Equal(2, response.Data);
            mockContactService.Verify(c => c.TotalContacts(null, search), Times.Once);
        }

        [Fact]
        public void GetTotalCountOfContacts_ReturnsOkWithContacts_WhenLetterIsNotNullSearchIsNo()
        {
            //Arrange
            var contacts = new List<ContactBook>
             {
            new ContactBook{ContactId=1,FirstName="Contact 1", Phone = "1234567890"},
            new ContactBook{ContactId=2,FirstName="Contact 2", Phone = "1234567899"},
            };
            string search = "no";


            var response = new ServiceResponse<int>
            {
                Success = true,
                Data = contacts.Count
            };

            var letter = "r";
            var mockContactService = new Mock<IContactService>();
            var target = new ContactController(mockContactService.Object);
            mockContactService.Setup(c => c.TotalContacts(letter, search)).Returns(response);

            //Act
            var actual = target.GetTotalCountOfContacts(letter, search) as OkObjectResult;

            //Assert
            Assert.NotNull(actual);
            Assert.Equal(200, actual.StatusCode);
            Assert.NotNull(actual.Value);
            Assert.Equal(response, actual.Value);
            Assert.Equal(2, response.Data);
            mockContactService.Verify(c => c.TotalContacts(letter, search), Times.Once);
        }

        [Fact]
        public void GetTotalCountOfContacts_ReturnsNotFound_WhenLetterIsNotNullSearchIsNO()
        {



            var response = new ServiceResponse<int>
            {
                Success = false,
                Data = 0
            };

            var letter = "r";
            string search = "no";
            var mockContactService = new Mock<IContactService>();
            var target = new ContactController(mockContactService.Object);
            mockContactService.Setup(c => c.TotalContacts(letter, search)).Returns(response);

            //Act
            var actual = target.GetTotalCountOfContacts(letter,search) as NotFoundObjectResult;

            //Assert
            Assert.NotNull(actual);
            Assert.Equal(404, actual.StatusCode);
            Assert.NotNull(actual.Value);
            Assert.Equal(response, actual.Value);
            Assert.Equal(0, response.Data);
            mockContactService.Verify(c => c.TotalContacts(letter, search), Times.Once);
        }

        [Fact]
        public void GetTotalCountOfContacts_ReturnsNotFound_WhenLetterIsNullSearchIsNo()
        {



            var response = new ServiceResponse<int>
            {
                Success = false,
                Data = 0
            };
            string search = "no";
            var mockContactService = new Mock<IContactService>();
            var target = new ContactController(mockContactService.Object);
            mockContactService.Setup(c => c.TotalContacts(null, search)).Returns(response);

            //Act
            var actual = target.GetTotalCountOfContacts(null, search) as NotFoundObjectResult;

            //Assert
            Assert.NotNull(actual);
            Assert.Equal(404, actual.StatusCode);
            Assert.NotNull(actual.Value);
            Assert.Equal(response, actual.Value);
            Assert.Equal(0, response.Data);
            mockContactService.Verify(c => c.TotalContacts(null, search), Times.Once);
        }

        [Fact]
        public void GetTotalCountOfFavouriteContacts_ReturnsOkWithContacts_WhenLetterIsNull()
        {
            //Arrange
            var contacts = new List<ContactBook>
             {
            new ContactBook{ContactId=1,FirstName="Contact 1", Phone = "1234567890"},
            new ContactBook{ContactId=2,FirstName="Contact 2", Phone = "1234567899"},
            };


            var response = new ServiceResponse<int>
            {
                Success = true,
                Data = contacts.Count
            };

            var mockContactService = new Mock<IContactService>();
            var target = new ContactController(mockContactService.Object);
            mockContactService.Setup(c => c.TotalFavouriteContacts(null)).Returns(response);

            //Act
            var actual = target.GetTotalCountOfFavouriteContacts(null) as OkObjectResult;

            //Assert
            Assert.NotNull(actual);
            Assert.Equal(200, actual.StatusCode);
            Assert.NotNull(actual.Value);
            Assert.Equal(response, actual.Value);
            Assert.Equal(2, response.Data);
            mockContactService.Verify(c => c.TotalFavouriteContacts(null), Times.Once);
        }

        [Fact]
        public void GetTotalCountOfFavouriteContacts_ReturnsOkWithContacts_WhenLetterIsNotNull()
        {
            //Arrange
            var contacts = new List<ContactBook>
             {
            new ContactBook{ContactId=1,FirstName="Contact 1", Phone = "1234567890"},
            new ContactBook{ContactId=2,FirstName="Contact 2", Phone = "1234567899"},
            };


            var response = new ServiceResponse<int>
            {
                Success = true,
                Data = contacts.Count
            };

            var letter = 'd';
            var mockContactService = new Mock<IContactService>();
            var target = new ContactController(mockContactService.Object);
            mockContactService.Setup(c => c.TotalFavouriteContacts(letter)).Returns(response);

            //Act
            var actual = target.GetTotalCountOfFavouriteContacts(letter) as OkObjectResult;

            //Assert
            Assert.NotNull(actual);
            Assert.Equal(200, actual.StatusCode);
            Assert.NotNull(actual.Value);
            Assert.Equal(response, actual.Value);
            Assert.Equal(2, response.Data);
            mockContactService.Verify(c => c.TotalFavouriteContacts(letter), Times.Once);
        }

        [Fact]
        public void GetTotalCountOfFavouriteContacts_ReturnsNotFound_WhenLetterIsNotNull()
        {



            var response = new ServiceResponse<int>
            {
                Success = false,
                Data = 0
            };

            var letter = 'd';
            var mockContactService = new Mock<IContactService>();
            var target = new ContactController(mockContactService.Object);
            mockContactService.Setup(c => c.TotalFavouriteContacts(letter)).Returns(response);

            //Act
            var actual = target.GetTotalCountOfFavouriteContacts(letter) as NotFoundObjectResult;

            //Assert
            Assert.NotNull(actual);
            Assert.Equal(404, actual.StatusCode);
            Assert.NotNull(actual.Value);
            Assert.Equal(response, actual.Value);
            Assert.Equal(0, response.Data);
            mockContactService.Verify(c => c.TotalFavouriteContacts(letter), Times.Once);
        }

        [Fact]
        public void GetTotalCountOfFavouriteContacts_ReturnsNotFound_WhenLetterIsNull()
        {



            var response = new ServiceResponse<int>
            {
                Success = false,
                Data = 0
            };

            var mockContactService = new Mock<IContactService>();
            var target = new ContactController(mockContactService.Object);
            mockContactService.Setup(c => c.TotalFavouriteContacts(null)).Returns(response);

            //Act
            var actual = target.GetTotalCountOfFavouriteContacts(null) as NotFoundObjectResult;

            //Assert
            Assert.NotNull(actual);
            Assert.Equal(404, actual.StatusCode);
            Assert.NotNull(actual.Value);
            Assert.Equal(response, actual.Value);
            Assert.Equal(0, response.Data);
            mockContactService.Verify(c => c.TotalFavouriteContacts(null), Times.Once);
        }

        [Fact]

        public void GetContactById_ReturnsOk()
        {

            var contactId = 1;
            var contact = new ContactBook
            {

                ContactId = contactId,
                FirstName = "Contact 1"
            };

            var response = new ServiceResponse<ContactDto>
            {
                Success = true,
                Data = new ContactDto
                {
                    ContactId = contactId,
                    FirstName = contact.FirstName
                }
            };

            var mockContactService = new Mock<IContactService>();
            var target = new ContactController(mockContactService.Object);
            mockContactService.Setup(c => c.GetContact(contactId)).Returns(response);

            //Act
            var actual = target.GetContactById(contactId) as OkObjectResult;

            //Assert
            Assert.NotNull(actual);
            Assert.Equal(200, actual.StatusCode);
            Assert.NotNull(actual.Value);
            Assert.Equal(response, actual.Value);
            mockContactService.Verify(c => c.GetContact(contactId), Times.Once);
        }

        [Fact]

        public void GetContactById_ReturnsNotFound()
        {

            var contactId = 1;
            var contact = new ContactBook
            {

                ContactId = contactId,
                FirstName = "Contact 1"
            };

            var response = new ServiceResponse<ContactDto>
            {
                Success = false,
                Data = new ContactDto
                {
                    ContactId = contactId,
                    FirstName = contact.FirstName
                }
            };

            var mockContactService = new Mock<IContactService>();
            var target = new ContactController(mockContactService.Object);
            mockContactService.Setup(c => c.GetContact(contactId)).Returns(response);

            //Act
            var actual = target.GetContactById(contactId) as NotFoundObjectResult;

            //Assert
            Assert.NotNull(actual);
            Assert.Equal(404, actual.StatusCode);
            Assert.NotNull(actual.Value);
            Assert.Equal(response, actual.Value);
            mockContactService.Verify(c => c.GetContact(contactId), Times.Once);
        }

        [Fact]
        public void AddContact_ReturnsOk_WhenContactIsAddedSuccessfully()
        {
            var fixture = new Fixture();
            var addContactDto = fixture.Create<AddContactDto>();
            var response = new ServiceResponse<string>
            {
                Success = true,
            };
            var mockContactService = new Mock<IContactService>();
            var target = new ContactController(mockContactService.Object);
            mockContactService.Setup(c => c.AddContact(It.IsAny<ContactBook>())).Returns(response);

            //Act

            var actual = target.AddContact(addContactDto) as OkObjectResult;

            //Assert
            Assert.NotNull(actual);
            Assert.Equal(200, actual.StatusCode);
            Assert.NotNull(actual.Value);
            Assert.Equal(response, actual.Value);
            mockContactService.Verify(c => c.AddContact(It.IsAny<ContactBook>()), Times.Once);

        }

        [Fact]
        public void AddContact_ReturnsBadRequest_WhenContactIsNotAdded()
        {
            var fixture = new Fixture();
            var addContactDto = fixture.Create<AddContactDto>();
            var response = new ServiceResponse<string>
            {
                Success = false,
            };
            var mockContactService = new Mock<IContactService>();
            var target = new ContactController(mockContactService.Object);
            mockContactService.Setup(c => c.AddContact(It.IsAny<ContactBook>())).Returns(response);

            //Act

            var actual = target.AddContact(addContactDto) as BadRequestObjectResult;

            //Assert
            Assert.NotNull(actual);
            Assert.Equal(400, actual.StatusCode);
            Assert.NotNull(actual.Value);
            Assert.Equal(response, actual.Value);
            mockContactService.Verify(c => c.AddContact(It.IsAny<ContactBook>()), Times.Once);

        }

        [Fact]
        public void UpdateContact_ReturnsOk_WhenContactIsUpdatesSuccessfully()
        {
            var fixture = new Fixture();
            var updateContactDto = fixture.Create<UpdateContactDto>();
            var response = new ServiceResponse<string>
            {
                Success = true,
            };
            var mockContactService = new Mock<IContactService>();
            var target = new ContactController(mockContactService.Object);
            mockContactService.Setup(c => c.ModifyContact(It.IsAny<ContactBook>())).Returns(response);

            //Act

            var actual = target.UpdateContact(updateContactDto) as OkObjectResult;

            //Assert
            Assert.NotNull(actual);
            Assert.Equal(200, actual.StatusCode);
            Assert.NotNull(actual.Value);
            Assert.Equal(response, actual.Value);
            mockContactService.Verify(c => c.ModifyContact(It.IsAny<ContactBook>()), Times.Once);

        }

        [Fact]
        public void UpdateContact_ReturnsBadRequest_WhenContactIsNotUpdated()
        {
            var fixture = new Fixture();
            var updateContactDto = fixture.Create<UpdateContactDto>();
            var response = new ServiceResponse<string>
            {
                Success = false,
            };
            var mockContactService = new Mock<IContactService>();
            var target = new ContactController(mockContactService.Object);
            mockContactService.Setup(c => c.ModifyContact(It.IsAny<ContactBook>())).Returns(response);

            //Act

            var actual = target.UpdateContact(updateContactDto) as BadRequestObjectResult;

            //Assert
            Assert.NotNull(actual);
            Assert.Equal(400, actual.StatusCode);
            Assert.NotNull(actual.Value);
            Assert.Equal(response, actual.Value);
            mockContactService.Verify(c => c.ModifyContact(It.IsAny<ContactBook>()), Times.Once);

        }

        [Fact]
        public void RemoveContact_ReturnsOkResponse_WhenContactDeletedSuccessfully()
        {

            var contactId = 1;
            var response = new ServiceResponse<string>
            {
                Success = true,
            };
            var mockContactService = new Mock<IContactService>();
            var target = new ContactController(mockContactService.Object);
            mockContactService.Setup(c => c.RemoveContact(contactId)).Returns(response);

            //Act

            var actual = target.RemoveContact(contactId) as OkObjectResult;

            //Assert
            Assert.NotNull(actual);
            Assert.Equal(200, actual.StatusCode);
            Assert.NotNull(actual.Value);
            Assert.Equal(response, actual.Value);
            mockContactService.Verify(c => c.RemoveContact(contactId), Times.Once);
        }

        [Fact]
        public void RemoveContact_ReturnsBadRequest_WhenContactNotDeleted()
        {

            var contactId = 1;
            var response = new ServiceResponse<string>
            {
                Success = false,
            };
            var mockContactService = new Mock<IContactService>();
            var target = new ContactController(mockContactService.Object);
            mockContactService.Setup(c => c.RemoveContact(contactId)).Returns(response);

            //Act

            var actual = target.RemoveContact(contactId) as BadRequestObjectResult;

            //Assert
            Assert.NotNull(actual);
            Assert.Equal(400, actual.StatusCode);
            Assert.NotNull(actual.Value);
            Assert.Equal(response, actual.Value);
            mockContactService.Verify(c => c.RemoveContact(contactId), Times.Once);
        }

        [Fact]
        public void RemoveContact_ReturnsBadRequest_WhenContactIsLessThanZero()
        {

            var contactId = 0;

            var mockContactService = new Mock<IContactService>();
            var target = new ContactController(mockContactService.Object);

            //Act

            var actual = target.RemoveContact(contactId) as BadRequestObjectResult;

            //Assert
            Assert.NotNull(actual);
            Assert.Equal(400, actual.StatusCode);
            Assert.NotNull(actual.Value);
            Assert.Equal("Enter correct data please", actual.Value);
        }




    }
}
