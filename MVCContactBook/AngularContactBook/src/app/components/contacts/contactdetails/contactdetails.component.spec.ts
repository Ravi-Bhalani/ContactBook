import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactdetailsComponent } from './contactdetails.component';
import { ContactService } from 'src/app/services/contact.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ApiResponse } from 'src/app/models/ApiResponse(T)';

describe('ContactdetailsComponent', () => {
  let component: ContactdetailsComponent;
  let fixture: ComponentFixture<ContactdetailsComponent>;
  let contactService: jasmine.SpyObj<ContactService>;
  let route: ActivatedRoute;
  let router : Router;

  const mockContact :Contact = {
    contactId: 1,
    firstName: 'John',
    lastName: 'Doe',
    phone: '1234567890',
    address: '123 Street, City',
    email: 'john.doe@example.com',
    gender: 'Male',
    isFavourite: false,
    countryId: 1,
    stateId: 1,
    fileName: null,
    imageByte: '',
    country: { countryId: 1, countryName: 'Country A' },
    state: { stateId: 1, stateName: 'State A', countryId: 1 },
    birthdate: '1990-01-01'
  };

  beforeEach(() => {
    const contactServiceSpy = jasmine.createSpyObj('ContactService', ['fetchContactById','RemoveContact']);
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,RouterTestingModule],
      declarations: [ContactdetailsComponent],
      providers: [
        { provide: ContactService, useValue: contactServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => '1' } }
          }
        }
      ]
    });
    fixture = TestBed.createComponent(ContactdetailsComponent);
    component = fixture.componentInstance;
     contactService =TestBed.inject(ContactService) as jasmine.SpyObj<ContactService>;
     route =TestBed.inject(ActivatedRoute);
     router =TestBed.inject(Router);

    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch contact details successfully', () => {
    
    // Mock fetchContactById to return a successful response
    
    const mockResponse: ApiResponse<Contact> = { success: true, data: mockContact, message: '' };

    contactService.fetchContactById.and.returnValue(of(mockResponse));

    // Call loacontactDetails with a mock contactId
    fixture.detectChanges();

    // Expectations
    expect(component.contact.contactId).toBe(1);
    expect(contactService.fetchContactById).toHaveBeenCalledWith(1);
    expect(component.contact).toEqual(mockContact);
  });

  it('should handle Http error response',()=>{
    //Arrange
    const mockError = {message:'Network Error'};
    contactService.fetchContactById.and.returnValue(throwError(mockError));
    spyOn(console,'error')

    //Act
    fixture.detectChanges();

    //Assert
    expect(contactService.fetchContactById).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Error while fetching contacts:',mockError);
    
  })

  it('should delete contact and navigate to /paginatedcontacts on confirmation', () => {
    // Arrange
    const contactId = 1;
    const mockResponse: ApiResponse<Contact> = { success: true, data: mockContact, message: '' };
    spyOn(window, 'confirm').and.returnValue(true); // Mock confirmation dialog
    spyOn(router,'navigate').and.stub();
  
    // Mock RemoveContact to return an observable of undefined
    contactService.RemoveContact.and.returnValue(of(mockResponse));
  
    // Act
    component.deleteContact(contactId);
  
    // Assert
    expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to delete this contact?');
    expect(contactService.RemoveContact).toHaveBeenCalledWith(contactId);
    expect(router.navigate).toHaveBeenCalledWith(['/paginatedcontacts']);
  });
  
  it('should not delete contact if confirmation is cancelled', () => {
    // Arrange
    const contactId = 2;
    const mockResponse: ApiResponse<Contact> = { success: true, data: mockContact, message: 'Failed to delete contact' };

    spyOn(window, 'confirm').and.returnValue(false); // Mock confirmation dialog
    spyOn(router,'navigate').and.stub();
    contactService.RemoveContact.and.returnValue(of(mockResponse));
  
    // Act
    component.deleteContact(contactId);
  
    // Assert
    expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to delete this contact?');
    expect(contactService.RemoveContact).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });
  

});
