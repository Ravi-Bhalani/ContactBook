import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/models/ApiResponse(T)';
import { Contact } from 'src/app/models/contact.model';
import { AuthService } from 'src/app/services/auth.service';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-favouritecontacts',
  templateUrl: './favouritecontacts.component.html',
  styleUrls: ['./favouritecontacts.component.css']
})
export class FavouritecontactsComponent {

  contacts: Contact[] = [];
  contacts1: Contact[] = [];

  contactId: number | undefined;

  loading: boolean = false;
  pageNumber: number = 1;
  pageSize: number = 2;
  totalItems: number = 0;
  totalPages: number = 0;
  letter : string = '';
  selectedLetter: string= '';
  // currentPage : number = 0;
  alphabet : string[] =["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  isAuthenticated: boolean = false;
  uniqueFirstLetters: string[] = [];

  constructor(private contactService: ContactService, private router: Router, private authService : AuthService,
    private cdr : ChangeDetectorRef) { }

    ngOnInit(): void {
      this.loadContactsCount();
      this.loadAllContacts();
       this.loadContacts();
       this.authService.isAuthenticated().subscribe((authState:boolean)=>{
        this.isAuthenticated=authState;
        this.cdr.detectChanges();//Manually trigger change detection.
      }); 
    }

  loadContactsCount(letter? : string): void {
    this.contactService.fetchfavouriteContactCount(letter).subscribe({
      next: (response: ApiResponse<number>) => {
        if (response.success) {
          console.log(response.data);
          this.totalItems = response.data;
          this.totalPages = Math.ceil(this.totalItems / this.pageSize);
          // this.loadContacts();
        } else {
          console.error('Failed to fetch contacts count', response.message);
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching contacts count.', error);
        this.loading = false;
      }
    });
  }

  loadContacts(letter? : string): void {
    this.loading = true;
    this.contactService.getAllFavouritePaginatedContacts(this.pageNumber, this.pageSize,letter).subscribe({
      next: (response: ApiResponse<Contact[]>) => {
        if (response.success) {
          console.log(response.data);
          this.contacts = response.data;
        } else {
          console.error('Failed to fetch contacts', response.message);
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching contacts.', error);
        this.loading = false;
      }
    });
  }

  loadAllContacts(): void {
    this.loading = true;
    this.contactService.getAllFavouriteContacts().subscribe({
      next: (response: ApiResponse<Contact[]>) => {
        if (response.success) {
          console.log(response.data);
          this.contacts1 = response.data;
          this.updateUniqueFirstLetters();
        } else {
          console.error('Failed to fetch contacts', response.message);
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching contacts.', error);
        this.loading = false;
      }
    });
  }
  getUniqueFirstLetters(): string[] {
    // Extract first letters from contact names and filter unique letters
    const firstLetters = Array.from(new Set(this.contacts1.map(contact => contact.firstName.charAt(0).toUpperCase())));
    return firstLetters.sort(); // Sort alphabetically
}
updateUniqueFirstLetters(): void {
  this.uniqueFirstLetters = this.getUniqueFirstLetters();
}

  changePage(pageNumber: number,letter? : string): void {
    this.pageNumber = pageNumber;
    this.loadContacts(letter);
  }

  changePageSize(pageSize: number,letter? :string): void {
   
    this.pageSize = pageSize;
    this.pageNumber = 1; // Reset to first page
    this.totalPages = Math.ceil(this.totalItems / this.pageSize); // Recalculate total pages
    this.loadContacts(letter);
  }

  onLetterClick(letter: string) {
    this.selectedLetter = letter;
    this.pageNumber = 1;
    this.loadContacts(letter);
    this.loadContactsCount(letter);
  }

  onShowAll() {
    this.selectedLetter = '';
    this.pageNumber = 1;
    this.loadContactsCount();
    this.loadContacts();
  }
  deleteContact(contactId: number) {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.contactService.RemoveContact(contactId).subscribe(() => {
        // Refresh categories after successful deletion
        this.loadContacts(this.selectedLetter); // Update the contacts list with the selected letter
        this.loadContactsCount(this.selectedLetter); // Update the total count for the selected letter
      });
    }
  }



}
