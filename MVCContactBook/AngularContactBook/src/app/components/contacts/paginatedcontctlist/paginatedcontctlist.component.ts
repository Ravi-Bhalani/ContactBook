import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/models/ApiResponse(T)';
import { Contact } from 'src/app/models/contact.model';
import { AuthService } from 'src/app/services/auth.service';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-paginatedcontctlist',
  templateUrl: './paginatedcontctlist.component.html',
  styleUrls: ['./paginatedcontctlist.component.css']
})
export class PaginatedcontctlistComponent {

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
  sortOrder : string = 'asc';
  searchQuery: string = ''; // Added searchQuery property
  totalcontactcount : number =0;
  search : string = 'no';
  uniqueFirstLetters: string[] = [];

 

;

  constructor(private contactService: ContactService,
     private router: Router,
     private authService : AuthService,
     private cdr : ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadContactsCount();
    this.loadAllContacts();
     this.loadContacts();
     this.authService.isAuthenticated().subscribe((authState:boolean=false)=>{
      this.isAuthenticated=authState;
      this.cdr.detectChanges();//Manually trigger change detection.
     
    }); 
  }
  loadContactsCount(letter? : string): void {
    if(letter == null){
      this.search = 'no';
    }
    this.contactService.fetchContactCount(letter).subscribe({
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
    this.contactService.getAllPaginatedContacts(this.pageNumber, this.pageSize,this.sortOrder,letter).subscribe({
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

  loadFilteredContacts(query: string): void {
    this.loading = true;
    // this.pageNumber = 1; // Reset to first page when performing a search
    // if(this.pageNumber>=1&&(this.totalItems==0||this.totalItems==null)){
    //   this.pageNumber =1;
    // }
    this.search = 'yes';
    
    this.contactService.fetchContactCount(query, this.search).subscribe({
      next: (response: ApiResponse<number>) => { 
        if (response.success) {
          console.log(response.data);
          this.totalItems = response.data;
          this.totalPages = Math.ceil(this.totalItems / this.pageSize);
          if (this.totalItems <= this.pageSize) {
            this.pageNumber = 1;
        }
          // Load the filtered contacts based on the current page number and page size
          this.contactService.getAllPaginatedContacts(this.pageNumber, this.pageSize, this.sortOrder, query, this.search).subscribe({
            next: (response: ApiResponse<Contact[]>) => {
              if (response.success) {
                console.log(response.data);
                this.contacts = response.data;
              } else {
                console.error('Failed to fetch filtered contacts', response.message);
              }
              this.loading = false;
            },
            error: (error) => {
              console.error('Error fetching filtered contacts.', error);
              this.loading = false;
            }
          });
        } else {
          console.error('Failed to fetch filtered contacts count', response.message);
          this.loading = false;
        }
      },
      error: (error) => {
        console.error('Error fetching filtered contacts count.', error);
        this.loading = false;
      }
    });
  }
  loadAllContacts(): void {
    this.loading = true;
    this.contactService.getAllContacts().subscribe({
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
    
   
    // this.loadContacts(letter);
    this.contactDetails();
     // If a search has been performed
 
  }

  changePageSize(pageSize: number,letter? :string): void {
   
    this.pageSize = pageSize;
    this.pageNumber = 1; // Reset to first page
    this.totalPages = Math.ceil(this.totalItems / this.pageSize); // Recalculate total pages
    // this.loadContacts(letter);
    this.contactDetails();
  }

  contactDetails(){
    if((this.selectedLetter == ''||this.selectedLetter==null)&&this.search=="no"){
       this.loadContacts();
    }
    else if(this.searchQuery==''&& this.search=='yes'){
      this.search='no'
      this.loadContacts();
    }
    else if((this.selectedLetter!=''||this.searchQuery!='')&&this.search =='yes'){
      this.filterContacts();
    }
    else{
      this.loadContacts(this.selectedLetter)
    }
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
  // deleteContact(contactId: number) {
  //   if (confirm('Are you sure you want to delete this contact?')) {
  //     this.contactService.RemoveContact(contactId).subscribe(() => {
  //       // Refresh categories after successful deletion
  //       this.loadContacts();
  //       this.loadContactsCount();

  //     });
  //   }
  // }
  deleteContact(contactId: number) {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.contactService.RemoveContact(contactId).subscribe(() => {
        // Refresh contacta after successful deletion
        this.loadAllContacts();
        this.loadContacts(this.selectedLetter); // Update the contacts list with the selected letter
        this.loadContactsCount(this.selectedLetter); // Update the total count for the selected letter
      });
    }
  }

  sortAse(letter?: string){
    this.sortOrder ="asc";
    this.pageNumber = 1;
    //this.loadContacts(letter);
    this.contactDetails();


  }
  sortDes(letter?: string){
    this.sortOrder ="desc";
    this.pageNumber = 1;
   // this.loadContacts(letter);
   this.contactDetails();


  }
   // New method to filter contacts based on search query
   filterContacts() {
    // If the search query is empty, load all contacts
    if (!this.searchQuery.trim()) {
      this.loadContacts(this.selectedLetter);
      return;
    }
   
     this.loadFilteredContacts(this.searchQuery);
    // Filter contacts based on search query

      
   
    this.contacts = this.contacts?.filter(contact => {
      const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
      return fullName.includes(this.searchQuery.toLowerCase());
      
    });
  }
   // New method to clear search query and load all contacts
   clearSearch() {
    this.searchQuery = '';
    this.loadContacts(this.selectedLetter);
  }

  toggleFavourite(contact: Contact): void {
    contact.isFavourite = !contact.isFavourite; // Toggle isFavourite property
    this.contactService.editContact(contact).subscribe(
        (response: any) => { 
          if(response.success){
            alert(response.message)
          }
          else{
            alert(response.message)
          }
            // Handle success if needed
        },
        (error: any) => {
            console.error('Failed to update contact', error);
            // Optionally revert isFavourite property on error
            contact.isFavourite = !contact.isFavourite;
        }
    );
}

}
