import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContactComponent } from './add-contact.component';
import { ContactService } from 'src/app/services/contact.service';
import { CountryService } from 'src/app/services/country.service';
import { StateService } from 'src/app/services/state.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { PaginatedcontctlistComponent } from '../paginatedcontctlist/paginatedcontctlist.component';
import { ApiResponse } from 'src/app/models/ApiResponse(T)';
import { of, throwError } from 'rxjs';
import { Country } from 'src/app/models/country.model';
import { State } from 'src/app/models/state.model';

describe('AddContactComponent', () => {
  let component: AddContactComponent;
  let fixture: ComponentFixture<AddContactComponent>;
  let contactServiceSpy: jasmine.SpyObj<ContactService>;
  let countryServiceSpy: jasmine.SpyObj<CountryService>;
  let stateServiceSpy: jasmine.SpyObj<StateService>;
  let routerSpy: Router

  beforeEach(() => {
    contactServiceSpy = jasmine.createSpyObj('ContactService', ['addContacts']);
    countryServiceSpy = jasmine.createSpyObj('CountryService', ['getAllCountries']);
    stateServiceSpy = jasmine.createSpyObj('StateService', ['getStateByCountryId']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      declarations: [AddContactComponent],
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule.withRoutes([{path:'paginatedcontacts', component: PaginatedcontctlistComponent}])],
      
      providers: [
        { provide: ContactService, useValue: contactServiceSpy },
        { provide: CountryService, useValue: countryServiceSpy },
        { provide: StateService, useValue: stateServiceSpy },
      ]
    });
    fixture = TestBed.createComponent(AddContactComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
    routerSpy = TestBed.inject(Router)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /contact on successful contact addition', () => {
    spyOn(routerSpy,'navigate');
    const mockResponse: ApiResponse<string> = { success: true, data: '', message: '' };
    contactServiceSpy.addContacts.and.returnValue(of(mockResponse));
 
    const form = <NgForm><unknown>{
      valid: true,
      value: {
       firstName: 'Test name',
        lastName: 'last name',
        countryId: 2,
          stateId: 2,
          email: "Test@gmail.com",
          phoneNumber: "1234567891",
          image: '',
          imageByte: "",
          company: "company 1",
          gender: "F",
          favourites: true,
          country: {
            countryId: 1,
            countryName: "country 1"
          },
          state: {
            countryId: 1,
            stateId: 2,
            stateName: "state 1"
          },
          birthdate: "09-08-2008"
      },
      controls: {
       
        phoneId: {value:1}, firstName: {value:'Test name'},
        lastName: {value:'last name'},
        countryId: {value:2},
          stateId:{value: 2},
          email: {value:"Test@gmail.com"},
          phoneNumber: {value:"1234567891"},
          image: {value:''},
          imageByte: {value:""},
          company:{value: "company 1"},
          gender:{value: "F"},
          favourites: {value:true},
          birthdate:{value: "09-08-2008"}
      }
    };
 
    component.contact.stateId = 2; // Ensure this.contact.stateId is set to match form.value.stateId
    component.onSubmit(form);
 
    expect(contactServiceSpy.addContacts).toHaveBeenCalledWith(component.contact); // Verify addContact was called with component.contact
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/paginatedcontacts']);
    
  });
  it('should alert error message on unsuccessful contact addition', () => {
    spyOn(window, 'alert');
    const mockResponse: ApiResponse<string> = { success: false, data: '', message: 'Error adding category' };
    contactServiceSpy.addContacts.and.returnValue(of(mockResponse));
    const form = <NgForm><unknown>{
      valid: true,
      value: {
       firstName: 'Test name',
        lastName: 'last name',
        countryId: 2,
          stateId: 2,
          email: "Test@gmail.com",
          phoneNumber: "1234567891",
          image: '',
          imageByte: "",
          company: "company 1",
          gender: "F",
          favourites: true,
          country: {
            countryId: 1,
            countryName: "country 1"
          },
          state: {
            countryId: 1,
            stateId: 2,
            stateName: "state 1"
          },
          birthdate: "09-08-2008"
      },
      controls: {
       
        phoneId: {value:1}, firstName: {value:'Test name'},
        lastName: {value:'last name'},
        countryId: {value:2},
          stateId:{value: 2},
          email: {value:"Test@gmail.com"},
          phoneNumber: {value:"1234567891"},
          image: {value:''},
          imageByte: {value:""},
          company:{value: "company 1"},
          gender:{value: "F"},
          favourites: {value:true},
          birthdate:{value: "09-08-2008"}
      }
    };
 
    component.contact.stateId = 2;
    component.onSubmit(form);
 
    expect(window.alert).toHaveBeenCalledWith(mockResponse.message);
   
  });

  it('should alert error message on HTTP error', () => {
    spyOn(console, 'error');
    spyOn(window, 'alert');
    const mockError = { error: { message: 'HTTP error' } };
    contactServiceSpy.addContacts.and.returnValue(throwError(mockError));
 
    const form = <NgForm><unknown>{
      valid: true,
      value: {
       firstName: 'Test name',
        lastName: 'last name',
        countryId: 2,
          stateId: 2,
          email: "Test@gmail.com",
          phoneNumber: "1234567891",
          image: '',
          imageByte: "",
          company: "company 1",
          gender: "F",
          favourites: true,
          country: {
            countryId: 1,
            countryName: "country 1"
          },
          state: {
            countryId: 1,
            stateId: 2,
            stateName: "state 1"
          },
          birthdate: "09-08-2008"
      },
      controls: {
       
        phoneId: {value:1}, firstName: {value:'Test name'},
        lastName: {value:'last name'},
        countryId: {value:2},
          stateId:{value: 2},
          email: {value:"Test@gmail.com"},
          phoneNumber: {value:"1234567891"},
          image: {value:''},
          imageByte: {value:""},
          company:{value: "company 1"},
          gender:{value: "F"},
          favourites: {value:true},
          birthdate:{value: "09-08-2008"}
      }
    };
 
    component.contact.stateId = 2;
    component.onSubmit(form);
 
    expect(console.error).toHaveBeenCalledWith('Error occurred:',mockError);
    expect(window.alert).toHaveBeenCalledWith(mockError.error.message)
  
  });
  it('should not call categoryService.addCategory on invalid form submission', () => {
    const form = <NgForm>{ valid: false };
 
    component.onSubmit(form);
 
    expect(contactServiceSpy.addContacts).not.toHaveBeenCalled();
   
  });
  it('should load countries on init', () => {
    // Arrange
    
  const mockCountries: Country[] = [
    { countryId: 1, countryName: 'Category 1'},
    { countryId: 2, countryName: 'Category 2'},
  ];
    const mockResponse: ApiResponse<Country[]> = { success: true, data: mockCountries, message: '' };
    countryServiceSpy.getAllCountries.and.returnValue(of(mockResponse));
 
    // Act
    component.ngOnInit();
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
    component.ngOnInit();
 
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
    component.ngOnInit();
 
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
});
