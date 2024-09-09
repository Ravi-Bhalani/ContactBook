import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contactdetails',
  templateUrl: './contactdetails.component.html',
  styleUrls: ['./contactdetails.component.css']
})
export class ContactdetailsComponent {
  contactId: number | undefined;
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
  
  errorMessage:string |undefined;

  constructor(private contactService:ContactService,private route:ActivatedRoute,private router :Router){}
  ngOnInit(): void {
    
    const contactId = Number(this.route.snapshot.paramMap.get('contactId'));
      this.contactService.fetchContactById(contactId)
      .subscribe(
        response=>{
          this.contact=response.data
        },
        error=>{
          console.error('Error while fetching contacts:',error);
        }
      )
    };
  
  // loacontactDetails(contactId:number):void{
  //   this.contactService.fetchContactById(contactId).subscribe({
  //     next:(response)=>{
  //       if(response.success){
  //         console.log(response.data)
  //         this.contact=response.data;
  //       }else{
  //         console.error('Failed to fetch product: ',response.message)
  //       }
  //     },
  //     error:(err)=>{
  //       alert(err.error.message);
  //     },
  //     complete:()=>{
  //       console.log('Completed');
  //     }
  //   })
  //   }
    deleteContact(contactId: number) {
      if (confirm('Are you sure you want to delete this contact?')) {
        this.contactService.RemoveContact(contactId).subscribe(() => {
          // Refresh categories after successful deletion
          this.router.navigate(['/paginatedcontacts'])

          
        });
      }
    }
    

}
