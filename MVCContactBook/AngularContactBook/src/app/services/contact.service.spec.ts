import { TestBed } from '@angular/core/testing';

import { ContactService } from './contact.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiResponse } from '../models/ApiResponse(T)';
import { Contact } from '../models/contact.model';
import { ArgumentOutOfRangeError, first } from 'rxjs';
import { AddContact } from '../models/addcontact.model';

describe('ContactService', () => {
  let service: ContactService;
  let httpMock: HttpTestingController;

  const mockApiResponse : ApiResponse<Contact[]>={
      success : true,
      data:[
        {
          contactId :1,
          firstName : "Ravi",
          lastName :"Bhalani",
          phone : "1234567890",
          address : "Vadodara",
          email: "ravu@gmail.com",
          gender : "m",
          isFavourite : true,
          countryId : 1,
          stateId : 1,
          country :{
            countryId : 1,
            countryName : "india"
          },
          state : {
            stateId : 1,
            stateName : "gujrate",
            countryId : 1
          },
          fileName: null,
          birthdate : "0001-01-01T00:00:00",
          imageByte : "0x"
          
        },
        {
          contactId :2,
          firstName : "Ravi",
          lastName :"Bhalani",
          phone : "1234567790",
          address : "Vadodra",
          email: "ravu@gmail.com",
          gender : "m",
          isFavourite : true,
          countryId : 1,
          stateId : 1,
          country :{
            countryId : 1,
            countryName : "india"
          },
          state : {
            stateId : 1,
            stateName : "gujrate",
            countryId : 1
          },
          fileName: null,
          birthdate : "0001-01-01T00:00:00",
          imageByte : "0x"
          
        },

      ],
      message : ''
  }

 

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(ContactService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(()=>{
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all contacts',()=>{
    //Arrange
    const apiUrl = 'http://localhost:5104/api/Contact/GetAllContacts';
    //Act
    service.getAllContacts().subscribe((response)=>{
      //Assert
      expect(response.data.length).toBe(2);
      expect(response.data).toEqual(mockApiResponse.data);
    });
    const req=httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockApiResponse);
  })

  it('should handle empty list of contacts',()=>{
     //Arrange
     const apiUrl='http://localhost:5104/api/Contact/GetAllContacts';
     const emptyResponse: ApiResponse<Contact[]> = {
       success: true,
       data:[],
       message: ''
     }
     //Act
      //Act
      service.getAllContacts().subscribe((response)=>{
        //Assert
        expect(response.data.length).toBe(0);
        expect(response.data).toEqual([]);
      });
      const req=httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(emptyResponse);
  });

  it('should handle HTTP error while fetching all contacts',()=>{
      //Arrange
    const apiUrl='http://localhost:5104/api/Contact/GetAllContacts';
    const errorMessage='Failed to load contacts';
    //Act
    service.getAllContacts().subscribe(
      ()=>fail('expected an error, not products'),
    (error)=>{
      //Assert
      expect(error.status).toBe(500);
      expect(error.statusText).toBe('Internal Server Error');
    }
    );
    const req=httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    //Respond with error
    req.flush(errorMessage,{status:500,statusText:'Internal Server Error'}); 
  });


  it('shuould add contact',()=>{
     //arrange
    const addContact : AddContact ={
      firstName : "Ravi",
          lastName :"Bhalani",
          phone : "1234567890",
          address : "Vadodara",
          email: "ravu@gmail.com",
          gender : "m",
          isFavourite : true,
          countryId : 1,
          stateId : 1,
          country :{
            countryId : 1,
            countryName : "india"
          },
          state : {
            stateId : 1,
            stateName : "gujrate",
            countryId : 1
          },
          fileName: null,
          birthdate : "0001-01-01T00:00:00",
          imageByte : "0x"
    }

    //Act
    const mockSuccessResponse :ApiResponse<string> ={
      success : true,
      message : "Contact saved successfully",
      data : ''
    }
     //act
     service.addContacts(addContact).subscribe(response=>{
      expect(response).toBe(mockSuccessResponse);
    });
    const req = httpMock.expectOne('http://localhost:5104/api/Contact/Create');
    expect(req.request.method).toBe('POST');
    req.flush(mockSuccessResponse);
  });

  it('should handle an error while addition of contact',()=>{
    //Arrange
    const addContact : AddContact ={
      firstName : "Ravi",
          lastName :"Bhalani",
          phone : "1234567890",
          address : "Vadodara",
          email: "ravu@gmail.com",
          gender : "m",
          isFavourite : true,
          countryId : 1,
          stateId : 1,
          country :{
            countryId : 1,
            countryName : "india"
          },
          state : {
            stateId : 1,
            stateName : "gujrate",
            countryId : 1
          },
          fileName: null,
          birthdate : "0001-01-01T00:00:00",
          imageByte : "0x"
    }
    const mockErrorResponse : ApiResponse<string> ={
      success :false,
      message : 'Contact already exist',
      data : " "
    };

    //Act
    service.addContacts(addContact).subscribe(response=>{
      expect(response).toBe(mockErrorResponse);
    });
    const req = httpMock.expectOne('http://localhost:5104/api/Contact/Create');
    expect(req.request.method).toBe('POST');
    req.flush(mockErrorResponse);

  })

  it('should handle an error while addition',()=>{
    //Arrange
    const addContact : AddContact ={
      firstName : "Ravi",
          lastName :"Bhalani",
          phone : "1234567890",
          address : "Vadodara",
          email: "ravu@gmail.com",
          gender : "m",
          isFavourite : true,
          countryId : 1,
          stateId : 1,
          country :{
            countryId : 1,
            countryName : "india"
          },
          state : {
            stateId : 1,
            stateName : "gujrate",
            countryId : 1
          },
          fileName: null,
          birthdate : "0001-01-01T00:00:00",
          imageByte : "0x"
    }
    const mockHttpError ={
      statusText: "Internal Server Error",
      status: 500
      };
    //Act
     //Act
     service.addContacts(addContact).subscribe({
      next:()=> fail('should have failed with the 500 error'),
      error: (error=> {
       expect(error.status).toEqual(500);
       expect(error.statusText).toEqual("Internal Server Error");
      })
   });
   const req = httpMock.expectOne('http://localhost:5104/api/Contact/Create');
    expect(req.request.method).toBe('POST');
    req.flush({},mockHttpError);
    

  });

  it('should fetch contact by id',()=>{
    const contactId = 1;
    const mockSuccessResponse :ApiResponse<Contact>={
      success :true,
      data :{
        contactId : 1,
        firstName : "Ravi",
        lastName :"Bhalani",
        phone : "1234567890",
        address : "Vadodara",
        email: "ravu@gmail.com",
        gender : "m",
        isFavourite : true,
        countryId : 1,
        stateId : 1,
        country :{
          countryId : 1,
          countryName : "india"
        },
        state : {
          stateId : 1,
          stateName : "gujrate",
          countryId : 1
        },
        fileName: null,
        birthdate : "0001-01-01T00:00:00",
        imageByte : "0x"
      },
      message:''
    };
    //act
    service.fetchContactById(contactId).subscribe(response =>{
      //assert
      expect(response).toBe(mockSuccessResponse);
      expect(response.data.contactId).toEqual(contactId);

    });
    const req =httpMock.expectOne('http://localhost:5104/api/Contact/GetContactById/' +contactId);
    expect(req.request.method).toBe('GET');
    req.flush(mockSuccessResponse);
  });

  it('should handle failed contact retrival',()=>{
    //arrange
    const contactId =1;
    const mockErrorResponse : ApiResponse<Contact>={
      success : false,
      data: {} as Contact,
      message : "No recoprd found"
    };
    //act
    service.fetchContactById(contactId).subscribe(response => {
      //assert
      expect(response).toEqual(mockErrorResponse);
      expect(response.message).toEqual("No recoprd found");
      expect(response.success).toBeFalse();

    });
    const req =httpMock.expectOne('http://localhost:5104/api/Contact/GetContactById/' +contactId);
    expect(req.request.method).toBe('GET');
    req.flush(mockErrorResponse);

 });

 it('should handle http error',()=>{
  const contactId =1;
  const mockHttpError ={
    status: 500,
    statusText :'Internal server error'
  };
  //act
  service.fetchContactById(contactId).subscribe({
    next : ()=> fail('should have faild with 500 error'),
    error:(error)=>{
      //assert
      expect(error.status).toBe(500);
      expect(error.statusText).toBe('Internal server error');
    }
  });
  const req =httpMock.expectOne('http://localhost:5104/api/Contact/GetContactById/' +contactId);
  expect(req.request.method).toBe('GET');
  req.flush({},mockHttpError);


 });

 it('should delete the contact by id successfully',()=>{
  //arrange
   const contactId =1;
    const mockSuccessResponse :ApiResponse<Contact>={
      success : false,
      data: {} as Contact,
      message : "deleted successfully"

    };
    service.RemoveContact(contactId).subscribe(response=>{
      //Assert
      expect(response).toEqual(mockSuccessResponse);
      expect(response.message).toBe("deleted successfully");
      expect(response.data).toEqual;(mockSuccessResponse.data);

    });
    const req = httpMock.expectOne("http://localhost:5104/api/Contact/Remove/"+ contactId);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockSuccessResponse);
 })

 it('should not delete the category by id successfully',()=>{
  //arrange
   const contactId =1;
    const mockErrorResponse :ApiResponse<Contact>={
      success : false,
      data: {} as Contact,
      message : " not deleted successfully"

    };
    service.RemoveContact(contactId).subscribe(response=>{
      //Assert
      expect(response).toEqual(mockErrorResponse);
      expect(response.message).toBe(" not deleted successfully");
      expect(response.data).toEqual;(mockErrorResponse.data);

    });
    const req = httpMock.expectOne("http://localhost:5104/api/Contact/Remove/"+ contactId);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockErrorResponse);
 });


 it('should handle http error while deleting',()=>{
  const contactId =1;
  const mockHttpError ={
    status: 500,
    statusText :'Internal server error'
  };
  //act
  service.RemoveContact(contactId).subscribe({
    next : ()=> fail('should have faild with 500 error'),
    error:(error)=>{
      //assert
      expect(error.status).toBe(500);
      expect(error.statusText).toBe('Internal server error');
    }
  });
  const req = httpMock.expectOne("http://localhost:5104/api/Contact/Remove/"+ contactId);
    expect(req.request.method).toBe('DELETE');
    req.flush({},mockHttpError);


 });

 it('should update a category successfully', ()=>{
  const editContact : Contact={
    contactId : 1,
        firstName : "Ravi",
        lastName :"Bhalani",
        phone : "1234567890",
        address : "Vadodara",
        email: "ravu@gmail.com",
        gender : "m",
        isFavourite : true,
        countryId : 1,
        stateId : 1,
        country :{
          countryId : 1,
          countryName : "india"
        },
        state : {
          stateId : 1,
          stateName : "gujrate",
          countryId : 1
        },
        fileName: null,
        birthdate : "0001-01-01T00:00:00",
        imageByte : "0x"
  }
 
  const mockSuccessResponse : ApiResponse<Contact> ={
    success: true,
    message: "Contact updated successfully.",
    data: {} as Contact
        }
 
  //Act
  service.editContact(editContact).subscribe(response => {
    expect(response).toEqual(mockSuccessResponse);
  });
 
  const req = httpMock.expectOne( 'http://localhost:5104/api/Contact/ModifyContact');
  expect(req.request.method).toBe('PUT');
  req.flush(mockSuccessResponse);
 
  });


  it('should handle failed update of cotact', ()=>{
    const editContact : Contact={
      contactId : 1,
      firstName : "Ravi",
      lastName :"Bhalani",
      phone : "1234567890",
      address : "Vadodara",
      email: "ravu@gmail.com",
      gender : "m",
      isFavourite : true,
      countryId : 1,
      stateId : 1,
      country :{
        countryId : 1,
        countryName : "india"
      },
      state : {
        stateId : 1,
        stateName : "gujrate",
        countryId : 1
      },
      fileName: null,
      birthdate : "0001-01-01T00:00:00",
      imageByte : "0x"
    }
   
    const mockErrorResponse : ApiResponse<Contact> ={
      success: false,
      message: "Contact already exists.",
      data: {} as Contact
          }
   
    //Act
    service.editContact(editContact).subscribe(response => {
      expect(response).toEqual(mockErrorResponse);
    });
   
    const req = httpMock.expectOne('http://localhost:5104/api/Contact/ModifyContact');
    expect(req.request.method).toBe('PUT');
    req.flush(mockErrorResponse);
   
    });

    it('should handle http error for update', ()=>{
      const editContact : Contact={
        contactId : 1,
        firstName : "Ravi",
        lastName :"Bhalani",
        phone : "1234567890",
        address : "Vadodara",
        email: "ravu@gmail.com",
        gender : "m",
        isFavourite : true,
        countryId : 1,
        stateId : 1,
        country :{
          countryId : 1,
          countryName : "india"
        },
        state : {
          stateId : 1,
          stateName : "gujrate",
          countryId : 1
        },
        fileName: null,
        birthdate : "0001-01-01T00:00:00",
        imageByte : "0x"
      }
     
      const mockHttpError ={
        statusText: "Internal Server Error",
        status: 500
        };
     
      //Act
      service.editContact(editContact).subscribe({
       next:()=> fail('should have failed with the 500 error'),
       error: (error=> {
        expect(error.status).toEqual(500);
        expect(error.statusText).toEqual("Internal Server Error");
       })
    });
     
      const req = httpMock.expectOne('http://localhost:5104/api/Contact/ModifyContact');
      expect(req.request.method).toBe('PUT');
      req.flush({},mockHttpError);
     
      });


  it('should get all paginated contact with letters and search',()=>{
    //Arrange
    const page = 1;
    const pageSize = 2;
    const sortOrder = "asc";
    const letter  = "r";
    const search = "yes"
   

     //act
     service.getAllPaginatedContacts(page,pageSize,sortOrder,letter,search).subscribe(response =>{
      //assert
      expect(response.data.length).toBe(2);
      expect(response.data).toEqual(mockApiResponse.data);

    });
    const req =httpMock.expectOne(`http://localhost:5104/api/Contact/GetAllContactsByPagination?letter=${letter}&search=${search}&page=${page}&pageSize=${pageSize}&sortOrder=${sortOrder}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockApiResponse);

  });

  it('should handle empty list of paginated contact with letters and search',()=>{
    //Arrange
    const page = 1;
    const pageSize = 2;
    const sortOrder = "asc";
    const letter  = "r";
    const search = "yes"

    const emptyResponse: ApiResponse<Contact[]> = {
      success: true,
      data: [],
      message: ''
    }
   

     //act
     service.getAllPaginatedContacts(page,pageSize,sortOrder,letter,search).subscribe(response =>{
      //assert
      expect(response.data.length).toBe(0);
      expect(response.data).toEqual([]);

    });
    const req =httpMock.expectOne(`http://localhost:5104/api/Contact/GetAllContactsByPagination?letter=${letter}&search=${search}&page=${page}&pageSize=${pageSize}&sortOrder=${sortOrder}`);
    expect(req.request.method).toBe('GET');
    req.flush(emptyResponse);

  });

  it('should handle HTTP error while fetching paginated contact with letters and search',()=>{
    //Arrange
    const page = 1;
    const pageSize = 2;
    const sortOrder = "asc";
    const letter  = "w";
    const search = "yes"
    const mockHttpError ={
      statusText: "Internal Server Error",
      status: 500
      };
    const ApiUrl = `http://localhost:5104/api/Contact/GetAllContactsByPagination?letter=${letter}&search=${search}&page=${page}&pageSize=${pageSize}&sortOrder=${sortOrder}`
    
    //act
    service.getAllPaginatedContacts(page,pageSize,sortOrder,letter,search).subscribe({
      next:()=> fail('should have failed with the 500 error'),
      error: (error=> {
       expect(error.status).toEqual(500);
       expect(error.statusText).toEqual("Internal Server Error");
       
      })
   });
    const req =httpMock.expectOne(ApiUrl);
    expect(req.request.method).toBe('GET');
    req.flush({},mockHttpError);

  });

  it('should get all paginated contact without letters ',()=>{
    //Arrange
    const page = 1;
    const pageSize = 2;
    const sortOrder = "asc";
   
   

     //act
     service.getAllPaginatedContacts(page,pageSize,sortOrder).subscribe(response =>{
      //assert
      expect(response.data.length).toBe(2);
      expect(response.data).toEqual(mockApiResponse.data);

    });
    const req =httpMock.expectOne(`http://localhost:5104/api/Contact/GetAllContactsByPagination?page=${page}&pageSize=${pageSize}&sortOrder=${sortOrder}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockApiResponse);

  });
  it('should handle empty list of paginated contact with letters and search',()=>{
    //Arrange
    const page = 1;
    const pageSize = 2;
    const sortOrder = "asc";
    

    const emptyResponse: ApiResponse<Contact[]> = {
      success: true,
      data: [],
      message: ''
    }
   

     //act
     service.getAllPaginatedContacts(page,pageSize,sortOrder).subscribe(response =>{
      //assert
      expect(response.data.length).toBe(0);
      expect(response.data).toEqual([]);

    });
    const req =httpMock.expectOne(`http://localhost:5104/api/Contact/GetAllContactsByPagination?page=${page}&pageSize=${pageSize}&sortOrder=${sortOrder}`);
    expect(req.request.method).toBe('GET');
    req.flush(emptyResponse);

  });

  it('should handle HTTP error while fetching paginated contact with letters and search',()=>{
    //Arrange
    const page = 1;
    const pageSize = 2;
    const sortOrder = "asc";
    
    const mockHttpError ={
      statusText: "Internal Server Error",
      status: 500
      };
    const ApiUrl = `http://localhost:5104/api/Contact/GetAllContactsByPagination?page=${page}&pageSize=${pageSize}&sortOrder=${sortOrder}`
    
    //act
    service.getAllPaginatedContacts(page,pageSize,sortOrder).subscribe({
      next:()=> fail('should have failed with the 500 error'),
      error: (error=> {
       expect(error.status).toEqual(500);
       expect(error.statusText).toEqual("Internal Server Error");
       
      })
   });
    const req =httpMock.expectOne(ApiUrl);
    expect(req.request.method).toBe('GET');
    req.flush({},mockHttpError);

  });












  it('should get all favourite paginated contact with letter',()=>{
    //Arrange
    const page = 1;
    const pageSize = 2;
    
    const letter  = "R";
    
   

     //act
     service.getAllFavouritePaginatedContacts(page,pageSize,letter).subscribe(response =>{
      //assert
      expect(response.data.length).toBe(2);
      expect(response.data).toEqual(mockApiResponse.data);

    });
    const req =httpMock.expectOne(`http://localhost:5104/api/Contact/GetAllFavouriteContactsByPagination?letter=${letter}&page=${page}&pageSize=${pageSize}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockApiResponse);

  });
  it('should handle empty list of  favourite paginated contact with letters ',()=>{
    //Arrange
    const page = 1;
    const pageSize = 2;
   
    const letter  = "r";
    

    const emptyResponse: ApiResponse<Contact[]> = {
      success: true,
      data: [],
      message: ''
    }
   

     //act
     service.getAllFavouritePaginatedContacts(page,pageSize,letter).subscribe(response =>{
      //assert
      expect(response.data.length).toBe(0);
      expect(response.data).toEqual([]);

    });
    const req =httpMock.expectOne(`http://localhost:5104/api/Contact/GetAllFavouriteContactsByPagination?letter=${letter}&page=${page}&pageSize=${pageSize}`);
    expect(req.request.method).toBe('GET');
    req.flush(emptyResponse);

  });

  it('should handle HTTP error gracefully while fetching favourite contacts with letter', () => {
    //Arrange
    const letter="a";
    
    const page=1;
    const pageSize=1;
    const apiUrl = `http://localhost:5104/api/Contact/GetAllFavouriteContactsByPagination?letter=${letter}&page=${page}&pageSize=${pageSize}`

    const errorMessage = 'Failed to load contacts';
    //Act
    service.getAllFavouritePaginatedContacts(page,pageSize,letter).subscribe(
      () => fail('expected an error, not contacts'),
      (error) => {
        //Assert
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Internal Server Error');
      }
    );

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    //Respond with error
    req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
  });



  it('should get all favourite paginated contact without letter',()=>{
    //Arrange
    const page = 1;
    const pageSize = 2;
    
     //act
     service.getAllFavouritePaginatedContacts(page,pageSize).subscribe(response =>{
      //assert
      expect(response.data.length).toBe(2);
      expect(response.data).toEqual(mockApiResponse.data);

    });
    const req =httpMock.expectOne(`http://localhost:5104/api/Contact/GetAllFavouriteContactsByPagination?page=${page}&pageSize=${pageSize}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockApiResponse);

  });

  it('should handle empty list of  favourite paginated contact without letters ',()=>{
    //Arrange
    const page = 1;
    const pageSize = 2;
   
    
    

    const emptyResponse: ApiResponse<Contact[]> = {
      success: true,
      data: [],
      message: ''
    }
   

     //act
     service.getAllFavouritePaginatedContacts(page,pageSize).subscribe(response =>{
      //assert
      expect(response.data.length).toBe(0);
      expect(response.data).toEqual([]);

    });
    const req =httpMock.expectOne(`http://localhost:5104/api/Contact/GetAllFavouriteContactsByPagination?page=${page}&pageSize=${pageSize}`);
    expect(req.request.method).toBe('GET');
    req.flush(emptyResponse);

  });

  it('should handle HTTP error gracefully fetching favourite paginated contacts with out letter', () => {
    //Arrange
    const page = 1;
    const pageSize = 2;
    const apiUrl = `http://localhost:5104/api/Contact/GetAllFavouriteContactsByPagination?page=${page}&pageSize=${pageSize}`;

    const errorMessage = 'Failed to load contacts';
    //Act
    service.getAllFavouritePaginatedContacts(page,pageSize).subscribe(
      () => fail('expected an error, not contacts'),
      (error) => {
        //Assert
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Internal Server Error');
      }
    );

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    //Respond with error
    req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
  });




  it('should get favourite contact count without letter',()=>{
    //Arrange
    
    const mockApiResponse = { data: 2 }; 
    
     //act
     service.fetchfavouriteContactCount().subscribe(response =>{
      //assert
      expect(response.data).toBe(2);
      expect(response.data).toEqual(mockApiResponse.data);

    });
    const req =httpMock.expectOne(`http://localhost:5104/api/Contact/GetFavouriteContactsCount`);
    expect(req.request.method).toBe('GET');
    req.flush(mockApiResponse);

  });
  it('should handle when  favourite contact count is zero ', () => {
    //Arrange
    
    const apiUrl = `http://localhost:5104/api/Contact/GetFavouriteContactsCount`
     const mockApiResponse = { data: 0 }; 
    const emptyResponse: ApiResponse<number> = {
      success: true,
      data: 0,
      message: ''
    }
    //Act
    service.fetchfavouriteContactCount().subscribe((response) => {
      //Assert
      expect(response.data).toBe(0);
      expect(response.data).toEqual(mockApiResponse.data);
    });
    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(emptyResponse);
  });

  it('should handle HTTP error gracefully while fetching favourite contact count', () => {
    //Arrange
   
    const apiUrl = `http://localhost:5104/api/Contact/GetFavouriteContactsCount`;
     const errorMessage = 'Failed to load contacts';
    //Act
    service.fetchfavouriteContactCount().subscribe(
      () => fail('expected an error, not contacts'),
      (error) => {
        //Assert
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Internal Server Error');
      }
    );

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    //Respond with error
    req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
  });

  it('should get favourite contact count with letter',()=>{
    //Arrange
    const letter = "r";
    const mockApiResponse = { data: 2 }; 
    
     //act
     service.fetchfavouriteContactCount(letter).subscribe(response =>{
      //assert
      expect(response.data).toBe(2);
      expect(response.data).toEqual(mockApiResponse.data);

    });
    const req =httpMock.expectOne(`http://localhost:5104/api/Contact/GetFavouriteContactsCount?letter=${letter}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockApiResponse);

  });
  it('should handle when  favourite contact count is zero with letter', () => {
    //Arrange
    const letter = "r";
    const apiUrl = `http://localhost:5104/api/Contact/GetFavouriteContactsCount?letter=${letter}`
     const mockApiResponse = { data: 0 }; 
    const emptyResponse: ApiResponse<number> = {
      success: true,
      data: 0,
      message: ''
    }
    //Act
    service.fetchfavouriteContactCount(letter).subscribe((response) => {
      //Assert
      expect(response.data).toBe(0);
      expect(response.data).toEqual(mockApiResponse.data);
    });
    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(emptyResponse);
  });

  it('should handle HTTP error gracefully while fetching favourite contact count with letter', () => {
    //Arrange
    const letter = "r";
    const apiUrl = `http://localhost:5104/api/Contact/GetFavouriteContactsCount?letter=${letter}`;
     const errorMessage = 'Failed to load contacts';
    //Act
    service.fetchfavouriteContactCount(letter).subscribe(
      () => fail('expected an error, not contacts'),
      (error) => {
        //Assert
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Internal Server Error');
      }
    );
    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    //Respond with error
    req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
  });

  it('should fetch all contact count successfully with letter and search is not yes', () => {
    //Arrange
    const letter="a";
    const search="search";
    const apiUrl = 'http://localhost:5104/api/Contact/GetContactsCount?letter=' + letter +'&search=no';
    const mockApiResponse = { data: 2 }; 
    //Act
    service.fetchContactCount(letter,search).subscribe((response) => {
      //Assert
      expect(response.data).toBe(2);
      expect(response.data).toEqual(mockApiResponse.data);

    });
    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockApiResponse);
  });

  it('should handle zero count with letter and search is not yes ', () => {
    //Arrange
    const letter="a";
    const search="search";
    const apiUrl ='http://localhost:5104/api/Contact/GetContactsCount?letter=' + letter +'&search=no';
    const mockApiResponse = { data: 0 }; 
    const emptyResponse: ApiResponse<number> = {
      success: true,
      data: 0,
      message: ''
    }
    //Act
    service.fetchContactCount(letter,search).subscribe((response) => {
      //Assert
      expect(response.data).toBe(0);
      expect(response.data).toEqual(mockApiResponse.data);
    });
    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(emptyResponse);
  });

  it('should handle HTTP error gracefully with letter and search is not yes', () => {
    //Arrange
    const letter="a";
    const search="search";
    const apiUrl = 'http://localhost:5104/api/Contact/GetContactsCount?letter=' + letter +'&search=no';
    const errorMessage = 'Failed to load contacts';
    //Act
    service.fetchContactCount(letter,search).subscribe(
      () => fail('expected an error, not contacts'),
      (error) => {
        //Assert
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Internal Server Error');
      }
    );
    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    //Respond with error
    req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
  });


  it('should fetch all contact count successfully with letter and search is  yes', () => {
    //Arrange
    const letter="a";
    const search="yes";
    const apiUrl = 'http://localhost:5104/api/Contact/GetContactsCount?letter=' + letter +'&search=yes';
    const mockApiResponse = { data: 2 }; 
    //Act
    service.fetchContactCount(letter,search).subscribe((response) => {
      //Assert
      expect(response.data).toBe(2);
      expect(response.data).toEqual(mockApiResponse.data);

    });
    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockApiResponse);
  });

  it('should handle zero count with letter and search is  yes ', () => {
    //Arrange
    const letter="a";
    const search="yes";
    const apiUrl ='http://localhost:5104/api/Contact/GetContactsCount?letter=' + letter +'&search=yes';
    const mockApiResponse = { data: 0 }; 
    const emptyResponse: ApiResponse<number> = {
      success: true,
      data: 0,
      message: ''
    }
    //Act
    service.fetchContactCount(letter,search).subscribe((response) => {
      //Assert
      expect(response.data).toBe(0);
      expect(response.data).toEqual(mockApiResponse.data);
    });
    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(emptyResponse);
  });

  it('should handle HTTP error gracefully with letter and search is yes', () => {
    //Arrange
    const letter="a";
    const search="yes";
    const apiUrl = 'http://localhost:5104/api/Contact/GetContactsCount?letter=' + letter +'&search=yes';
    const errorMessage = 'Failed to load contacts';
    //Act
    service.fetchContactCount(letter,search).subscribe(
      () => fail('expected an error, not contacts'),
      (error) => {
        //Assert
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Internal Server Error');
      }
    );
    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    //Respond with error
    req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
  });

  it('should fetch all contact count successfully with letter is null and search is not yes', () => {
    //Arrange
    
    const search="no";
    const apiUrl = 'http://localhost:5104/api/Contact/GetContactsCount?search=no';
    const mockApiResponse = { data: 2 }; 
    //Act
    service.fetchContactCount(undefined,search).subscribe((response) => {
      //Assert
      expect(response.data).toBe(2);
      expect(response.data).toEqual(mockApiResponse.data);

    });
    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockApiResponse);
  });

  it('should handle zero count with letter is null and search is not  yes ', () => {
    //Arrange
    const search="no";
    const apiUrl =`http://localhost:5104/api/Contact/GetContactsCount?search=no`;
    const mockApiResponse = { data: 0 }; 
    const emptyResponse: ApiResponse<number> = {
      success: true,
      data: 0,
      message: ''
    }
    //Act
    service.fetchContactCount(undefined,search).subscribe((response) => {
      //Assert
      expect(response.data).toBe(0);
      expect(response.data).toEqual(mockApiResponse.data);
    });
    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(emptyResponse);
  });

  it('should handle HTTP error gracefully with letter is null and search is not yes', () => {
    //Arrange
    const letter="a";
    const search="no";
    const apiUrl = `http://localhost:5104/api/Contact/GetContactsCount?search=no`;
    const errorMessage = 'Failed to load contacts';
    //Act
    service.fetchContactCount(undefined,search).subscribe(
      () => fail('expected an error, not contacts'),
      (error) => {
        //Assert
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Internal Server Error');
      }
    );
    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    //Respond with error
    req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
  });

  
  




  
  



});
