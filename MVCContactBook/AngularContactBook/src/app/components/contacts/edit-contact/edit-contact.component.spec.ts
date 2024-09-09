import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditContactComponent } from './edit-contact.component';
import { ContactService } from 'src/app/services/contact.service';
import { CountryService } from 'src/app/services/country.service';
import { StateService } from 'src/app/services/state.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { Country } from 'src/app/models/country.model';
import { State } from 'src/app/models/state.model';
import { Contact } from 'src/app/models/contact.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from 'src/app/models/ApiResponse(T)';
import { of, throwError } from 'rxjs';
import { ElementRef } from '@angular/core';


describe('EditContactComponent', () => {
  let component: EditContactComponent;
  let fixture: ComponentFixture<EditContactComponent>;
  let contactServiceSpy: jasmine.SpyObj<ContactService>;
  let countryServiceSpy: jasmine.SpyObj<CountryService>;
  let stateServiceSpy: jasmine.SpyObj<StateService>;
  let route: ActivatedRoute;
  let routerSpy: Router;

  const mockCountries: Country[] = [
    { countryId: 1, countryName: 'Country A' },
    { countryId: 2, countryName: 'Country B' }
  ];

  const mockStates: State[] = [
    { stateId: 1, stateName: 'State A', countryId: 1 },
    { stateId: 2, stateName: 'State B', countryId: 1 }
  ];

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
    contactServiceSpy = jasmine.createSpyObj('ContactService', ['fetchContactById','editContact']);
    countryServiceSpy = jasmine.createSpyObj('CountryService', ['getAllCountries']);
    stateServiceSpy = jasmine.createSpyObj('StateService', ['getStateByCountryId']);
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,RouterTestingModule,FormsModule],
      declarations: [EditContactComponent],
      providers: [
        { provide: ContactService, useValue: contactServiceSpy },
        { provide: CountryService, useValue: countryServiceSpy },
        { provide: StateService, useValue: stateServiceSpy },
        { provide: ActivatedRoute, 
          useValue: {
            snapshot: { paramMap: { get: () => '1' } }
          } }
      ]
    });
    fixture = TestBed.createComponent(EditContactComponent);
    component = fixture.componentInstance;
    contactServiceSpy = TestBed.inject(ContactService) as jasmine.SpyObj<ContactService>;
    routerSpy = TestBed.inject(Router)
    
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 


  it('should initialize contactId from route params and load category details', () => {
    // Arrange
 
 
    const mockResponseCountries: ApiResponse<Country[]> = { success: true, data: [], message: '' };
    const mockResponseStates: ApiResponse<State[]> = { success: true, data: [], message: '' };
    const mockResponse: ApiResponse<Contact> = { success: true, data: mockContact, message: '' };
    contactServiceSpy.fetchContactById.and.returnValue(of(mockResponse));
    countryServiceSpy.getAllCountries.and.returnValue(of(mockResponseCountries))
    stateServiceSpy.getStateByCountryId.and.returnValue(of(mockResponseStates))
    // Act
    component.ngOnInit();
    component.loadCountries();
    component.onSelectCountry(1); // ngOnInit is called here
 
    // Assert
    expect(component.contact.contactId).toBe(1);
    expect(contactServiceSpy.fetchContactById).toHaveBeenCalledWith(1);
    expect(component.contact).toEqual(mockContact);
  });

  it('should load countries', () => {
    // Arrange
    
  const mockCountries: Country[] = [
    { countryId: 1, countryName: 'Category 1'},
    { countryId: 2, countryName: 'Category 2'},
  ];
    const mockResponse: ApiResponse<Country[]> = { success: true, data: mockCountries, message: '' };
    countryServiceSpy.getAllCountries.and.returnValue(of(mockResponse));
 
    // Act
    component.loadCountries();
  // fixture.detectChanges();// ngOnInit is called here
 
    // Assert
    expect(countryServiceSpy.getAllCountries).toHaveBeenCalled();
    expect(component.country).toEqual(mockCountries);
  });

  it('should handle failed country loading', () => {
    // Arrange
    const mockResponse: ApiResponse<Country[]> = { success: false, data: [], message: 'Failed to fetch countries' };
    countryServiceSpy.getAllCountries.and.returnValue(of(mockResponse));
    spyOn(console, 'error');
 
    // Act
    component.loadCountries();
 
    // Assert
    expect(countryServiceSpy.getAllCountries).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Failed to fetch countries', 'Failed to fetch countries');
  });

  it('should handle error during country loading HTTP Error', () => {
    // Arrange
    const mockError = { message: 'Network error' };
    countryServiceSpy.getAllCountries.and.returnValue(throwError(() => mockError));
    spyOn(console, 'error');
 
    // Act
    component.loadCountries();
 
    // Assert
    expect(countryServiceSpy.getAllCountries).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Error fetching countries :', mockError);
  });

  it('should load state from country Id', () => {
    // Arrange
    const mockStates: State[] = [
      { countryId: 1, stateName: 'Category 1', stateId: 2},
      { countryId: 2, stateName: 'Category 2', stateId: 1},
    ];
    const mockResponse: ApiResponse<State[]> = { success: true, data: mockStates, message: '' };
    stateServiceSpy.getStateByCountryId.and.returnValue(of(mockResponse));
  const countryId = 1;
    // Act
    component.onSelectCountry(countryId) // ngOnInit is called here

    // Assert
    expect(stateServiceSpy.getStateByCountryId).toHaveBeenCalledWith(countryId);
    expect(component.state).toEqual(mockStates);
  });

  it('should not load state when response is false', () => {
    // Arrange

    const mockResponse: ApiResponse<State[]> = { success: false, data: [], message: 'Failed to fetch states' };
    stateServiceSpy.getStateByCountryId.and.returnValue(of(mockResponse));
    spyOn(console, 'error');

     const countryId = 1;
    // Act
    component.onSelectCountry(countryId) // ngOnInit is called here

    // Assert
    expect(stateServiceSpy.getStateByCountryId).toHaveBeenCalledWith(countryId);
    expect(console.error).toHaveBeenCalledWith('Failed to fetch states', 'Failed to fetch states');
  });

  it('should handle error during country loading HTTP Error', () => {
    // Arrange
    const mockError = { message: 'Network error' };
    stateServiceSpy.getStateByCountryId.and.returnValue(throwError(() => mockError));
    spyOn(console, 'error');
    const countryId = 1;

    // Act
    component.onSelectCountry(countryId) // ngOnInit is called here
 
    // Assert
    expect(stateServiceSpy.getStateByCountryId).toHaveBeenCalledWith(countryId);
    expect(console.error).toHaveBeenCalledWith('Error fetching states :', mockError);
  });

  it('should navigate to /paginatedContacts on successful contact modification', () => {
    // Arrange
    spyOn(routerSpy, 'navigate');
    const mockResponse: ApiResponse<Contact> = { success: true, data: mockContact, message: '' };
    contactServiceSpy.editContact.and.returnValue(of(mockResponse));

    // Act
    component.contact.stateId = 2; // Ensure this.contact.stateId is set to match form.value.stateId
    component.onSubmit({ valid: true } as NgForm);

    // Assert
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/paginatedcontacts']);
    expect(component.loading).toBe(false);
  });

  it('should alert error message on unsuccessful category modification', () => {
    // Arrange
    spyOn(window, 'alert'); // Spy on console.error method
    const mockResponse: ApiResponse<Contact> = { success: false, data: mockContact, message: 'Error modifying category' };
    contactServiceSpy.editContact.and.returnValue(of(mockResponse));

    // Act
    component.contact.stateId = 2; // Ensure this.contact.stateId is set to match form.value.stateId
    component.onSubmit({ valid: true } as NgForm);

    // Assert
    expect(window.alert).toHaveBeenCalledWith(mockResponse.message); // Check if console.error was called with the correct error message
  });

  it('should alert error message on HTTP error', () => {
    // Arrange
    spyOn(window, 'alert');
    const mockError = { error: { message: 'HTTP error' } };
    contactServiceSpy.editContact.and.returnValue(throwError(mockError));

    // Act
    component.contact.stateId = 2; // Ensure this.contact.stateId is set to match form.value.stateId
    component.onSubmit({ valid: true } as NgForm);

    // Assert
    expect(window.alert).toHaveBeenCalledWith(mockError.error.message);
  });

  it('should not call categoryService.modifyCategory on invalid form submission', () => {
    // Arrange
    const form = { valid: false } as NgForm;

    // Act
    component.onSubmit(form);

    // Assert
    expect(contactServiceSpy.editContact).not.toHaveBeenCalled();
  });

  


});
