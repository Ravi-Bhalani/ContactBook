import { Component } from '@angular/core';
import { ApiResponse } from 'src/app/models/ApiResponse(T)';
import { Contact } from 'src/app/models/contact.model';
import { ContactSP } from 'src/app/models/contactSP.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-getcontactbybirthdatemonth',
  templateUrl: './getcontactbybirthdatemonth.component.html',
  styleUrls: ['./getcontactbybirthdatemonth.component.css']
})
export class GetcontactbybirthdatemonthComponent {
  months = [
    { name: 'January', value: 1 },
    { name: 'February', value: 2 },
    { name: 'March', value: 3 },
    { name: 'April', value: 4 },
    { name: 'May', value: 5 },
    { name: 'June', value: 6 },
    { name: 'July', value: 7 },
    { name: 'August', value: 8 },
    { name: 'September', value: 9 },
    { name: 'October', value: 10 },
    { name: 'November', value: 11 },
    { name: 'December', value: 12 }
  ];
  selectedMonth: number = 0;
  monthNames: string[] = this.months.map(month => month.name);
  contacts: ContactSP[] | null = [];

  constructor(private contactervice: ContactService) { }

 
  getContacts(): void {
    if (this.selectedMonth) {
      this.contactervice.GETCONTACTBYBIRTHDATEMONTH(this.selectedMonth).subscribe({
        next: (response: ApiResponse<ContactSP[]>) => {
          if (response.success && response.data.length > 0) {
            // Assuming API returns only one record for the selected month and year
            this.contacts = response.data;
          } else {
            console.error('No data found for the selected month .');
            this.contacts = null;
          }
        },
        error: (error) => {
          console.error('Error fetching contacts:', error);
          this.contacts = null;
        }
      });
    }
  }

  onMonthSelected(): void {
    this.contacts = null; // Clear previous data
    this.getContacts();
  }



}
