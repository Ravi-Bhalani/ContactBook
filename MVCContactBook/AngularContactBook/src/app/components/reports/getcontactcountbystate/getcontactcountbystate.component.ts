import { Component } from '@angular/core';
import { ApiResponse } from 'src/app/models/ApiResponse(T)';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-getcontactcountbystate',
  templateUrl: './getcontactcountbystate.component.html',
  styleUrls: ['./getcontactcountbystate.component.css']
})
export class GetcontactcountbystateComponent {

  maleCount : number = 0;
  femaleCount : number =0;
  genderM : string = 'M'
  genderF : string = 'F'

  ngOnInit():void{
    this.loadMale();
    this.loadFemale();
  }



  constructor(private contactervice: ContactService) { }


  loadMale() { 
    this.contactervice.GetContactsCountBasedOnGender(this.genderM).subscribe({
      next:(response : ApiResponse<number>) => {
        if(response.success){
          
          this.femaleCount = response.data;
        } else {
          console.error('Failed to fetch female count' , response.message);
        }
      },
      error:(error=>{
        console.error('Error fetching female count :' ,error);
      })
    });
  }

  loadFemale() { 
    this.contactervice.GetContactsCountBasedOnGender(this.genderF).subscribe({
      next:(response : ApiResponse<number>) => {
        if(response.success){
          
          this.maleCount = response.data;
        } else {
          console.error('Failed to fetch male count' , response.message);
        }
      },
      error:(error=>{
        console.error('Error fetching male count :' ,error);
      })
    });
  }



}
