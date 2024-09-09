import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ContactService } from '../../../services/contact.service';
import { Contact } from 'src/app/models/contact.model';
import { ApiResponse } from 'src/app/models/ApiResponse(T)';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit{
  contacts: Contact[] | undefined;
  loading: boolean = false;
  isAuthenticated: boolean = false;
  searchQuery: string = '';
  selectedLetter: string ='';

  constructor(private contactService: ContactService,
              private authService : AuthService,
              private cdr : ChangeDetectorRef) {
   
    
  }
  ngOnInit(): void {
     this.loadContacts();
     this.authService.isAuthenticated().subscribe((authState:boolean)=>{
      this.isAuthenticated=authState;
      this.cdr.detectChanges(); //Manually trigger change detection.
    });
  }

  loadContacts():void{
    this.loading = true;
    this.contactService.getAllContacts().subscribe({
      next:(response: ApiResponse<Contact[]>) =>{
        if(response.success){
          this.contacts = response.data;
          console.log(response.data);
        }
        else{
          console.error('Failed to fetch contacts', response.message);
        }
        this.loading = false;
      },
      error:(error => {
        console.error('Failed to fetch contacts', error);
        this.loading = false;
      })
    }
  )
  }

  deleteContact(contactId: number) {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.contactService.RemoveContact(contactId).subscribe(() => {
        // Refresh categories after successful deletion
        this.loadContacts();
      });
    }
  }

  filterContacts(): void {
    // Filter the contacts based on the search query
    if (this.searchQuery.trim() !== '') {
      this.contacts = this.contacts?.filter(contact =>
        (contact.firstName.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
        (contact.lastName.toLowerCase().includes(this.searchQuery.toLowerCase()))
      );
    } else {
      // If the search query is empty, reload all contacts
      this.loadContacts();
    }
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.loadContacts();
  }

 
  
}