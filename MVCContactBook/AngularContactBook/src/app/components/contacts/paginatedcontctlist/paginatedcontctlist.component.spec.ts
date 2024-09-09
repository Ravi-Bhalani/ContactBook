import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatedcontctlistComponent } from './paginatedcontctlist.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';
import { Router } from '@angular/router';
import { Contact } from 'src/app/models/contact.model';
import { ApiResponse } from 'src/app/models/ApiResponse(T)';
import { of, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ChangeDetectorRef } from '@angular/core';

describe('PaginatedcontctlistComponent', () => {
  let component: PaginatedcontctlistComponent;
  let fixture: ComponentFixture<PaginatedcontctlistComponent>;
  let contactServiceSpy: jasmine.SpyObj<ContactService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let cdrSpy: jasmine.SpyObj<ChangeDetectorRef>;

  const mockContacts: Contact[] = [
    { contactId: 1, firstName: 'Ravi', lastName:'Bhalani', email: 'ravi@gmail.com',phone:'1234567890',gender:'m',address:'pune',isFavourite:true,countryId:1,stateId:1,fileName: null,birthdate:' ',imageByte:'',country:{countryId :1,countryName:'India'},state:{stateId:1,stateName:'Gujrat',countryId:1} },
    { contactId: 1, firstName: 'Ravi2', lastName:'Bhalani', email: 'ravi2@gmail.com',phone:'1244567890',gender:'m',address:'pune',isFavourite:true,countryId:1,stateId:1,fileName: null,birthdate:' ',imageByte:'',country:{countryId :1,countryName:'India'},state:{stateId:1,stateName:'Gujrat',countryId:1} },
    
  ];

  beforeEach(() => {
    contactServiceSpy = jasmine.createSpyObj('ContactService', ['fetchContactCount','getAllPaginatedContacts','getAllContacts','editContact']);
    authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
    cdrSpy = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,RouterTestingModule,FormsModule],
      declarations: [PaginatedcontctlistComponent],
      providers: [
        { provide: ContactService, useValue: contactServiceSpy },
        { provide: ChangeDetectorRef, useValue: cdrSpy }
      ],
    });
    fixture = TestBed.createComponent(PaginatedcontctlistComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calaulate total contact count with out letter successfully',()=>{
    //Arrange
    const mockResponse :ApiResponse<number> ={success:true,data:2,message:''};
    contactServiceSpy.fetchContactCount.and.returnValue(of(mockResponse));

    //Act
    component.loadContactsCount();

    //Assert
    expect(contactServiceSpy.fetchContactCount).toHaveBeenCalled();
    expect (component.totalItems).toBe(2);
    expect(component.totalPages).toBe(Math.ceil(2 / component.pageSize));
    expect(component.loading).toBe(false);
  })

  it('should fail to calculate total count without letter ',()=>{
    //Arrange
    const mockResponse :ApiResponse<number> ={success:false,data:0,message:'Failed to fetch contacts'};
    contactServiceSpy.fetchContactCount.and.returnValue(of(mockResponse));
    spyOn(console,'error')
    //Act
    component.loadContactsCount();
    //Assert
    expect(contactServiceSpy.fetchContactCount).toHaveBeenCalled();
    expect (component.totalItems).toBe(0);
    expect(component.totalPages).toBe(0);
    expect(component.loading).toBe(false);
    expect(console.error).toHaveBeenCalledWith('Failed to fetch contacts count','Failed to fetch contacts');

  })

  it('should handle Http error response',()=>{
    //Arrange
    const mockError = {message:'Network Error'};
    contactServiceSpy.fetchContactCount.and.returnValue(throwError(mockError));
    spyOn(console,'error')

    //Act
    component.loadContactsCount();

    //Assert
    expect(contactServiceSpy.fetchContactCount).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Error fetching contacts count.',mockError);
    expect(component.loading).toBe(false);


  })

  it('should calaulate total contact count with letter successfully',()=>{
    //Arrange
    const letter = 'A';
    const mockResponse :ApiResponse<number> ={success:true,data:2,message:''};
    contactServiceSpy.fetchContactCount.and.returnValue(of(mockResponse));

    //Act
    component.loadContactsCount(letter);

    //Assert
    expect(contactServiceSpy.fetchContactCount).toHaveBeenCalled();
    expect (component.totalItems).toBe(2);
    expect(component.totalPages).toBe(Math.ceil(2 / component.pageSize));
    expect(component.loading).toBe(false);
  })

  it('should fail to calculate total count with letter ',()=>{
    //Arrange
    const letter = 'A';
    const mockResponse :ApiResponse<number> ={success:false,data:0,message:'Failed to fetch contacts'};
    contactServiceSpy.fetchContactCount.and.returnValue(of(mockResponse));
    spyOn(console,'error')
    //Act
    component.loadContactsCount(letter);
    //Assert
    expect(contactServiceSpy.fetchContactCount).toHaveBeenCalled();
    expect (component.totalItems).toBe(0);
    expect(component.totalPages).toBe(0);
    expect(component.loading).toBe(false);
    expect(console.error).toHaveBeenCalledWith('Failed to fetch contacts count','Failed to fetch contacts');

  })

  it('should handle Http error response',()=>{
    //Arrange
    const letter = 'A';
    const mockError = {message:'Network Error'};
    contactServiceSpy.fetchContactCount.and.returnValue(throwError(mockError));
    spyOn(console,'error')

    //Act
    component.loadContactsCount(letter);

    //Assert
    expect(contactServiceSpy.fetchContactCount).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Error fetching contacts count.',mockError);
    expect(component.loading).toBe(false);


  })

  it('should load contacts  without letter successfully',()=>{
    //Arrange
   
    const mockResponse :ApiResponse<Contact[]> ={success:true,data:mockContacts,message:''};
    contactServiceSpy.getAllPaginatedContacts.and.returnValue(of(mockResponse));

    //Act
    component.loadContacts();

    //Assert
    expect(contactServiceSpy.getAllPaginatedContacts).toHaveBeenCalled();
    expect(component.contacts).toEqual(mockContacts);
    expect(component.loading).toBe(false);
  })
  it('should fail to load contacts  without letter ',()=>{
    //Arrange
    
    const mockResponse :ApiResponse<Contact[]> ={success:false,data:[],message:'Failed to fetch contacts'};
    contactServiceSpy.getAllPaginatedContacts.and.returnValue(of(mockResponse));
    spyOn(console,'error')
    //Act
    component.loadContacts();
    //Assert
    expect(contactServiceSpy.getAllPaginatedContacts).toHaveBeenCalled();
    expect(component.contacts).toEqual([]);
    expect(component.loading).toBe(false);
    expect(console.error).toHaveBeenCalledWith('Failed to fetch contacts','Failed to fetch contacts');

  })
  it('should handle Http error response',()=>{
    //Arrange
    
    const mockError = {message:'Network Error'};
    contactServiceSpy.getAllPaginatedContacts.and.returnValue(throwError(mockError));
    spyOn(console,'error')

    //Act
    component.loadContacts();

    //Assert
    expect(contactServiceSpy.getAllPaginatedContacts).toHaveBeenCalled();
    expect(component.contacts).toEqual([]);
    expect(console.error).toHaveBeenCalledWith('Error fetching contacts.',mockError);
    expect(component.loading).toBe(false);


  })

  it('should load contacts  with letter successfully',()=>{
    //Arrange
   const letter = 'R';
    const mockResponse :ApiResponse<Contact[]> ={success:true,data:mockContacts,message:''};
    contactServiceSpy.getAllPaginatedContacts.and.returnValue(of(mockResponse));

    //Act
    component.loadContacts(letter);

    //Assert
    expect(contactServiceSpy.getAllPaginatedContacts).toHaveBeenCalled();
    expect(component.contacts).toEqual(mockContacts);
    expect(component.loading).toBe(false);
  })
  it('should fail to load contacts  with letter ',()=>{
    //Arrange
    const letter = 'R';
    const mockResponse :ApiResponse<Contact[]> ={success:false,data:[],message:'Failed to fetch contacts'};
    contactServiceSpy.getAllPaginatedContacts.and.returnValue(of(mockResponse));
    spyOn(console,'error')
    //Act
    component.loadContacts(letter);
    //Assert
    expect(contactServiceSpy.getAllPaginatedContacts).toHaveBeenCalled();
    expect(component.contacts).toEqual([]);
    expect(component.loading).toBe(false);
    expect(console.error).toHaveBeenCalledWith('Failed to fetch contacts','Failed to fetch contacts');

  })
  it('should handle Http error response',()=>{
    //Arrange
    const letter = 'R';
    const mockError = {message:'Network Error'};
    contactServiceSpy.getAllPaginatedContacts.and.returnValue(throwError(mockError));
    spyOn(console,'error')

    //Act
    component.loadContacts(letter);

    //Assert
    expect(contactServiceSpy.getAllPaginatedContacts).toHaveBeenCalled();
    expect(component.contacts).toEqual([]);
    expect(console.error).toHaveBeenCalledWith('Error fetching contacts.',mockError);
    expect(component.loading).toBe(false);
  })

  it('should loads filtered contacts successfully',()=>{
    //Arrange
    const query = 'John'; 
    //mock for fetchContactCount
    const mockCountResponse: ApiResponse<number> = { success: true, data: 2, message: '' };
    contactServiceSpy.fetchContactCount.and.returnValue(of(mockCountResponse));
    //mock for getPaginatedContact
    const mockContactsResponse: ApiResponse<Contact[]> = { success: true, data: mockContacts, message: '' };
    contactServiceSpy.getAllPaginatedContacts.and.returnValue(of(mockContactsResponse));

    //Act
    component.loadFilteredContacts(query);

    //Assert

    //for fetchContactCount 
    expect(contactServiceSpy.fetchContactCount).toHaveBeenCalledWith(query,"yes");
    expect(component.totalItems).toBe(mockCountResponse.data);
    expect(component.totalPages).toBe(Math.ceil(mockCountResponse.data / component.pageSize));

    //for getPaginatedContact
    expect(contactServiceSpy.getAllPaginatedContacts).toHaveBeenCalledWith(component.pageNumber,component.pageSize,component.sortOrder,query,'yes');
    expect(component.contacts).toEqual(mockContacts); // Ensure contacts are set correctly
    expect(component.loading).toBe(false); 

  })

  it('should handle unsuccessful response from getAllPaginatedContacts',()=>{
    //Arrange
    const query = 'John'; 
    //mock for fetchContactCount
    const mockCountResponse: ApiResponse<number> = { success: true, data: 1, message: '' };
    contactServiceSpy.fetchContactCount.and.returnValue(of(mockCountResponse));
    //mock for getPaginatedContact
    const mockContactsResponse: ApiResponse<Contact[]> = { success: false, data: [], message: 'Failed to fetch filtered contacts' };
    contactServiceSpy.getAllPaginatedContacts.and.returnValue(of(mockContactsResponse));
    spyOn(console,'error');

    //Act
    component.loadFilteredContacts(query);

    //Assert

    //for fetchContactCount 
    expect(contactServiceSpy.fetchContactCount).toHaveBeenCalledWith(query,"yes");
    expect(component.totalItems).toBe(mockCountResponse.data);
    expect(component.totalPages).toBe(Math.ceil(mockCountResponse.data / component.pageSize));

    //for getPaginatedContact
    expect(contactServiceSpy.getAllPaginatedContacts).toHaveBeenCalledWith(component.pageNumber,component.pageSize,component.sortOrder,query,'yes');
    expect(component.contacts).toEqual([]); // Ensure contacts are set correctly
    expect(console.error).toHaveBeenCalledWith('Failed to fetch filtered contacts', 'Failed to fetch filtered contacts'); 
    expect(component.loading).toBe(false); 

  })


  it('should handle error from getAllPaginatedContacts',()=>{
    //Arrange
    const query = 'John'; 
    //mock for fetchContactCount
    const mockCountResponse: ApiResponse<number> = { success: true, data: 1, message: '' };
    contactServiceSpy.fetchContactCount.and.returnValue(of(mockCountResponse));
    //mock for getPaginatedContact
    const mockError = new Error('Network error');
    contactServiceSpy.getAllPaginatedContacts.and.returnValue(throwError(mockError));
    spyOn(console,'error');

    //Act
    component.loadFilteredContacts(query);

    //Assert

    //for fetchContactCount 
    expect(contactServiceSpy.fetchContactCount).toHaveBeenCalledWith(query,"yes");
    expect(component.totalItems).toBe(mockCountResponse.data);
    expect(component.totalPages).toBe(Math.ceil(mockCountResponse.data / component.pageSize));

    //for getPaginatedContact
    expect(contactServiceSpy.getAllPaginatedContacts).toHaveBeenCalledWith(component.pageNumber,component.pageSize,component.sortOrder,query,'yes');
    expect(component.contacts).toEqual([]); // Ensure contacts are set correctly
    expect(console.error).toHaveBeenCalledWith('Error fetching filtered contacts.', mockError); 
    expect(component.loading).toBe(false); 

  })

  it('should handle unsuccessful response from fetchContactCount',()=>{
    //Arrange
    const query = 'John'; 
    //mock for fetchContactCount
    const mockCountResponse: ApiResponse<number> = { success: false, data: 0, message: 'Failed to fetch filtered contacts count' };
    contactServiceSpy.fetchContactCount.and.returnValue(of(mockCountResponse));
    spyOn(console,'error')
    

    //Act
    component.loadFilteredContacts(query);

    //Assert

    //for fetchContactCount 
    expect(contactServiceSpy.fetchContactCount).toHaveBeenCalledWith(query,"yes");
    expect(component.totalItems).toBe(0);
    expect(console.error).toHaveBeenCalledWith('Failed to fetch filtered contacts count', 'Failed to fetch filtered contacts count');
    expect(component.loading).toBe(false);

  })

  it('should handle error from fetchContactCount', () => {
    const query = 'Smith'; // Example query to test

    // Mock error response from fetchContactCount
    const mockError = new Error('Network error');
    contactServiceSpy.fetchContactCount.and.returnValue(throwError(mockError));
    spyOn(console,'error');

    // Call the method to test
    component.loadFilteredContacts(query);

    // Expectations for fetchContactCount
    expect(contactServiceSpy.fetchContactCount).toHaveBeenCalledWith(query, 'yes');
    expect(component.totalItems).toBe(0); // Ensure totalItems is not set on error response
    expect(console.error).toHaveBeenCalledWith('Error fetching filtered contacts count.', mockError); // Check console.error call
    expect(component.loading).toBe(false); // Ensure loading is set correctly
    // Optionally, check other error handling or behavior in your component for error scenario
  });

  it('should load all contacts successfully',()=>{
    //Arrange
   
    const mockResponse :ApiResponse<Contact[]> ={success:true,data:mockContacts,message:''};
    contactServiceSpy.getAllContacts.and.returnValue(of(mockResponse));

    //Act
    component.loadAllContacts();

    //Assert
    expect(contactServiceSpy.getAllContacts).toHaveBeenCalled();
    expect(component.contacts1).toEqual(mockContacts);
    expect(component.loading).toBe(false);
  })
  it('should fail to load all contacts',()=>{
    //Arrange
    
    const mockResponse :ApiResponse<Contact[]> ={success:false,data:[],message:'Failed to fetch contacts'};
    contactServiceSpy.getAllContacts.and.returnValue(of(mockResponse));
    spyOn(console,'error')
    //Act
    component.loadAllContacts();
    //Assert
    expect(contactServiceSpy.getAllContacts).toHaveBeenCalled();
    expect(component.contacts1).toEqual([]);
    expect(component.loading).toBe(false);
    expect(console.error).toHaveBeenCalledWith('Failed to fetch contacts','Failed to fetch contacts');

  })
  it('should handle Http error response',()=>{
    //Arrange
    
    const mockError = {message:'Network Error'};
    contactServiceSpy.getAllContacts.and.returnValue(throwError(mockError));
    spyOn(console,'error')

    //Act
    component.loadAllContacts();

    //Assert
    expect(contactServiceSpy.getAllContacts).toHaveBeenCalled();
    expect(component.contacts1).toEqual([]);
    expect(console.error).toHaveBeenCalledWith('Error fetching contacts.',mockError);
    expect(component.loading).toBe(false);
  })

  it('should call loadContactsCount, loadAllContacts, and loadContacts on initialization', () => {
    // Mocking isAuthenticated to return true
    authServiceSpy.isAuthenticated.and.returnValue(of(true));

    // Spy on component methods
    spyOn(component, 'loadContactsCount');
    spyOn(component, 'loadAllContacts');
    spyOn(component, 'loadContacts');
    
    
    

    // Call ngOnInit
    component.ngOnInit();
   

    // Expectations
    expect(component.loadContactsCount).toHaveBeenCalled();
    expect(component.loadAllContacts).toHaveBeenCalled();
    expect(component.loadContacts).toHaveBeenCalled();
   
  });

  it('should toggle favourite status of contact and handle success response', () => {
    // Arrange
    const mockContact: Contact = {
      contactId: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      gender: 'm',
      address: '123 Street, City',
      isFavourite: false,
      countryId: 1,
      stateId: 1,
      fileName: null,
      birthdate: '',
      imageByte: '',
      country: { countryId: 1, countryName: 'Country' },
      state: { stateId: 1, stateName: 'State', countryId: 1 }
    };
  
    // Mock editContact to return success
    const successResponse = { success: true, data:mockContact,message: 'Contact updated successfully' };
    contactServiceSpy.editContact.and.returnValue(of(successResponse));
    spyOn(window,'alert');
  
    // Act
    component.toggleFavourite(mockContact);
  
    // Assert
    expect(mockContact.isFavourite).toBe(true); // Ensure isFavourite is toggled
    expect(contactServiceSpy.editContact).toHaveBeenCalledWith(mockContact);
    // Optionally, you can spy on window.alert to check if alert was called with success message
    expect(window.alert).toHaveBeenCalledWith(successResponse.message);
  });

  it('should revert favourite status of contact and handle error response', () => {
    // Arrange
    const mockContact: Contact = {
      contactId: 1,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phone: '0987654321',
      gender: 'f',
      address: '456 Avenue, Town',
      isFavourite: true,
      countryId: 1,
      stateId: 1,
      fileName: null,
      birthdate: '',
      imageByte: '',
      country: { countryId: 1, countryName: 'Country' },
      state: { stateId: 1, stateName: 'State', countryId: 1 }
    };
  
    // Mock editContact to return error
    const errorResponse = {message: 'Failed to update contact' };
    contactServiceSpy.editContact.and.returnValue(throwError(errorResponse));
    spyOn(console,'error');
  
    // Act
    component.toggleFavourite(mockContact);
  
    // Assert
    expect(mockContact.isFavourite).toBe(true); // Ensure isFavourite is reverted
    expect(contactServiceSpy.editContact).toHaveBeenCalledWith(mockContact);
    // Optionally, you can spy on console.error to check if error was logged
    expect(console.error).toHaveBeenCalledWith('Failed to update contact',errorResponse);
  });
  

});
