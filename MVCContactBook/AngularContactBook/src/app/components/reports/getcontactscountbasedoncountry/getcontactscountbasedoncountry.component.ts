import { Component } from '@angular/core';
import { ApiResponse } from 'src/app/models/ApiResponse(T)';
import { ContactSP } from 'src/app/models/contactSP.model';
import { Country } from 'src/app/models/country.model';
import { ContactService } from 'src/app/services/contact.service';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-getcontactscountbasedoncountry',
  templateUrl: './getcontactscountbasedoncountry.component.html',
  styleUrls: ['./getcontactscountbasedoncountry.component.css']
})
export class GetcontactscountbasedoncountryComponent {

  contacts: ContactSP[] | null = [];
  country : Country[] = []
  contactCount : number = 0;
  
  
  selectedCountry: number = 0;
  

  constructor(private contactervice: ContactService, 
    private countryService : CountryService,
  ) { }

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

 

  
  getContacts(): void {
    if (this.selectedCountry ) {
      this.contactervice.GetContactsCountBasedOnCountry(this.selectedCountry).subscribe({
        next: (response: ApiResponse<number>) => {
          if (response.success ) {
            // Assuming API returns only one record for the selected month and year
            this.contactCount = response.data;
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


