import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from 'src/app/models/ApiResponse(T)';
import { Contact } from 'src/app/models/contact.model';
import { Country } from 'src/app/models/country.model';
import { State } from 'src/app/models/state.model';
import { ContactService } from 'src/app/services/contact.service';
import { CountryService } from 'src/app/services/country.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})

export class EditContactComponent {
  
  contact : Contact={
    contactId: 0,
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
  imageName: string = '';
  country : Country[] = []
  state : State[] = []
  countrySelected: boolean = false;
  errorMessage:string |undefined;
  imageUrl: string | ArrayBuffer | null = null;
  loading : boolean = false;
  @ViewChild('imageInput') imageInput!: ElementRef;
  fileSizeError = false; 


  constructor(
    private contactService : ContactService,
    private countryService : CountryService,
    private stateService: StateService,
    private router :Router,
    private route : ActivatedRoute

  ) {}

    ngOnInit(): void {
      const contactId = Number(this.route.snapshot.paramMap.get('contactId'));
      this.contactService.fetchContactById(contactId).subscribe({
        next: (response) => {
          if (response.success) {
            // Parse the date string received from the server
            
    console.log(response.data);
            this.contact = response.data;
            this.contact.birthdate = this.formatDate(new Date(this.contact.birthdate));
            console.log(this.contact.birthdate);
            this.loadCountries();
            if (this.contact.countryId) {
              this.onSelectCountry(this.contact.countryId);
            }
            // Set imageUrl if contact has an image
            if (this.contact.imageByte) {
              this.imageUrl = 'data:image/jpeg;base64,' + this.contact.imageByte;
            }
          } else {
            console.error('Failed to fetch product: ', response.message)
          }
        },
        error: (err) => {
          alert(err.error.message);
        },
        complete: () => {
          console.log('Completed');
        }
      });
    } 
    private formatDate(date: Date): string {
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const day = ('0' + date.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    }
    // loacontactDetails(contactId:number):void{
    //   this.contactService.fetchContactById(contactId).subscribe({
    //     next: (response) => {
    //       if (response.success) {
    //         // Parse the date string received from the server
            
    // console.log(response.data);
    //         this.contact = response.data;
    //         this.contact.birthdate = this.formatDate(new Date(this.contact.birthdate));
    //         console.log(this.contact.birthdate);
    //         this.loadCountries();
    //         if (this.contact.countryId) {
    //           this.onSelectCountry(this.contact.countryId);
    //         }
    //         // Set imageUrl if contact has an image
    //         if (this.contact.imageByte) {
    //           this.imageUrl = 'data:image/jpeg;base64,' + this.contact.imageByte;
    //         }
    //       } else {
    //         console.error('Failed to fetch product: ', response.message)
    //       }
    //     },
    //     error: (err) => {
    //       alert(err.error.message);
    //     },
    //     complete: () => {
    //       console.log('Completed');
    //     }
    //   });
    // }
    
    // Function to format date to "yyyy-MM-dd" format
   
    
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
      if (this.countrySelected) {
        // Only reset the state if the country has been initially set
        this.contact.stateId = 0; // Reset the stateId to 0 or any default value indicating no state selected
      } else {
        this.countrySelected = true; // Set the flag to true after the initial country selection
      }
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
          this.imageName = file.name; 
        };
        reader.readAsDataURL(file);
      }
    }
    removeFile() {
      this.imageUrl = null; // Clear the imageUrl variable to remove the image
      // You may want to also clear any associated form data here if needed
      this.contact.imageByte = '';
      this.contact.fileName = null;
      this.imageName = '';
      this.imageInput.nativeElement.value = '';
  }

 

    onSubmit(form :NgForm){
      if(form.valid && this.contact.stateId != 0)
      {
        console.log(this.contact.birthdate)
        if (this.imageUrl === null) {
          // If file has been removed, clear the imageByte and fileName in the contact object
          this.contact.imageByte = '';
          this.contact.fileName = null;
        }
        this.contactService.editContact(this.contact)
        .subscribe({ 
         next: (response : ApiResponse<Contact>) => {
           console.log(response)
           if(response.success)
          {
           alert("contact updated successfully:", );
           this.router.navigate(['/paginatedcontacts']);
          
           
          }
          else if (!response.success){
           alert(response.message)
  
         }
      },
      error:(error) => {
        console.error("Error occurred while updating contact:", error);
        alert(error.error.message)
       
      }
  
    });
  }
  }
}
