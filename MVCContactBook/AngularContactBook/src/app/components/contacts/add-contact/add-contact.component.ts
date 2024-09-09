import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/models/ApiResponse(T)';
import { AddContact } from 'src/app/models/addcontact.model';
import { Country } from 'src/app/models/country.model';
import { State } from 'src/app/models/state.model';
import { ContactService } from 'src/app/services/contact.service';
import { CountryService } from 'src/app/services/country.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent {

  contact : AddContact={
    firstName: '',
    lastName:'',
    phone: '',
    address: '',
    email:'',
    gender:'' ,
    isFavourite:false,
    countryId: 0,
    stateId : 0,
    fileName : null,
    imageByte:'',
    country : {
      countryId : 0,
      countryName : ''
    },
    state : {
      stateId : 0,
      stateName : '',
      countryId : 0
    },
    birthdate: ''

  };
  country : Country[] = []
  state : State[] = []
  imageUrl: string | ArrayBuffer | null = null;
  @ViewChild('imageInput') imageInput!: ElementRef;
  fileSizeError = false; 

  constructor(
    private contactService : ContactService,
    private countryService : CountryService,
    private stateService: StateService,
    private router :Router,) {}

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
       this.contact.stateId = 0;
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

    onFileChange(event: any): void {
      const file = event.target.files[0];
      if (file) {
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!allowedTypes.includes(file.type)) {
          this.fileSizeError = true;
          return; // Exit the method if file type is not allowed
        }
        if (file.size > 50 * 1024) { // Convert KB to bytes
          this.fileSizeError = true;
            return; // Exit the method if file size exceeds the limit
        }
        const reader = new FileReader();
        reader.onload = () => {
          this.contact.imageByte = (reader.result as string).split(',')[1]; 
          this.contact.fileName = file.name;
          this.imageUrl = reader.result; 
        };
        reader.readAsDataURL(file);
      }
    }

    removeFile() {
      this.imageUrl = null; // Clear the imageUrl variable to remove the image
      // You may want to also clear any associated form data here if needed
      this.contact.fileName = null;
      this.imageInput.nativeElement.value = '';
  }

    onSubmit(myForm :NgForm){
      if(myForm.valid && this.contact.stateId != 0)
        {
          if (this.imageUrl === null) {
            // If file has been removed, clear the imageByte and fileName in the contact object
            this.contact.imageByte = '';
            this.contact.fileName = null;
          }
          this.contactService.addContacts(this.contact)
          .subscribe({
            next: (response :ApiResponse<string>)=> {
              console.log(response)
              if(response.success){
                alert("contacts created successfully:",);
              this.router.navigate(['/paginatedcontacts']);
       
              }
              else if (!response.success){
                this.imageUrl = null;
                alert(response.message)
      
              }
              
            },
            error: (error)=> {
              console.error("Error occurred:", error);
              alert(error.error.message)
              
            }
        });
        }
    }
    }



