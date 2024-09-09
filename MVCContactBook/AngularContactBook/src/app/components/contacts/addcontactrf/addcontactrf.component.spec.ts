import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcontactrfComponent } from './addcontactrf.component';
import { ContactService } from 'src/app/services/contact.service';
import { CountryService } from 'src/app/services/country.service';
import { StateService } from 'src/app/services/state.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { PaginatedcontctlistComponent } from '../paginatedcontctlist/paginatedcontctlist.component';

describe('AddcontactrfComponent', () => {
  let component: AddcontactrfComponent;
  let fixture: ComponentFixture<AddcontactrfComponent>;
  let contactServiceSpy: jasmine.SpyObj<ContactService>;
  let countryServiceSpy: jasmine.SpyObj<CountryService>;
  let stateServiceSpy: jasmine.SpyObj<StateService>;
  let routerSpy: Router

  beforeEach(() => {
    contactServiceSpy = jasmine.createSpyObj('ContactService', ['addContact']);
    countryServiceSpy = jasmine.createSpyObj('CountryService', ['getAllCountries']);
    stateServiceSpy = jasmine.createSpyObj('StateService', ['getStatesByCountry']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      declarations: [AddcontactrfComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule, RouterTestingModule.withRoutes([{path:'paginatedcontacts', component: PaginatedcontctlistComponent}])],
      
      providers: [
        { provide: ContactService, useValue: contactServiceSpy },
        { provide: CountryService, useValue: countryServiceSpy },
        { provide: StateService, useValue: stateServiceSpy },
      ]
    });
    fixture = TestBed.createComponent(AddcontactrfComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
    routerSpy = TestBed.inject(Router)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});
