import { Component } from '@angular/core';

import { ApiResponse } from 'src/app/models/ApiResponse(T)';
import { ContactSP } from 'src/app/models/contactSP.model';
import { Country } from 'src/app/models/country.model';
import { State } from 'src/app/models/state.model';
import { ContactService } from 'src/app/services/contact.service';
import { CountryService } from 'src/app/services/country.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-getcontactbystate',
  templateUrl: './getcontactbystate.component.html',
  styleUrls: ['./getcontactbystate.component.css']
})
export class GetcontactbystateComponent {
  contacts: ContactSP[] | null = [];
  country : Country[] = []
  state : State[] = []
  selectedState: number = 0;
  selectedCountry: number = 0;
  

  constructor(private contactervice: ContactService, 
    private countryService : CountryService,
    private stateService: StateService,) { }

  ngOnInit(): void {
    this.loadCountries();
  } 

  loadCountries() { 
    this.countryService.getAllCountries().subscribe({
      next:(response : ApiResponse<Country[]>) => {
        if(response.success){
          
          this.country = response.data;
        } else {
          console.error('Failed to fetch countries' , response.message);
        }
      },
      error:(error=>{
        console.error('Error fetching countries :' ,error);
      })
    });
  }

  onSelectCountry(countryId: number) {
    // Clear existing states
    this.state = [];
     
    // Fetch states based on selected country
    this.stateService.getStateByCountryId(countryId).subscribe({
      next:(response : ApiResponse<State[]>) => {
        if(response.success){
          this.state = response.data;
        } else {
          console.error('Failed to fetch states' , response.message);
        }
      },
      error:(error=>{
        console.error('Error fetching states :' ,error);
      })
    });
  }

  
  getContacts(): void {
    if (this.selectedState ) {
      this.contactervice.GETCONTACTBYSTATE(this.selectedState).subscribe({
        next: (response: ApiResponse<ContactSP[]>) => {
          if (response.success && response.data.length > 0) {
            // Assuming API returns only one record for the selected month and year
            this.contacts = response.data;
          } else {
            console.error('No data found for the selected month and year.');
            this.contacts = null;
          }
        },
        error: (error) => {
          console.error('Error fetching Prof Tax data:', error);
          this.contacts = null;
        }
      });
    }
  }


}
