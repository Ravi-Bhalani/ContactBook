import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/ApiResponse(T)';
import { Contact } from '../models/contact.model';
import { AddContact } from '../models/addcontact.model';
import { ContactSP } from '../models/contactSP.model';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl = 'http://localhost:5104/api/Contact/';

  constructor(private http: HttpClient) { }

  getAllContacts():Observable<ApiResponse<Contact[]>>{
    return this.http.get<ApiResponse<Contact[]>>(this.apiUrl + 'GetAllContacts')
  }

  getAllFavouriteContacts():Observable<ApiResponse<Contact[]>>{
    return this.http.get<ApiResponse<Contact[]>>(this.apiUrl + 'GetAllFavouriteContacts')
  }
  addContacts(contact: AddContact): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(this.apiUrl + 'Create', contact);
  }
  editContact(contact: Contact): Observable<ApiResponse<Contact>> {
    return this.http.put<ApiResponse<Contact>>(this.apiUrl + 'ModifyContact',contact);
  }

  fetchContactById(contactId: number): Observable<ApiResponse<Contact>> {
    return this.http.get<ApiResponse<Contact>>(this.apiUrl + 'GetContactById/' + contactId);
  }

  RemoveContact(contactId: number): Observable<ApiResponse<Contact|undefined>> {
    return this.http.delete<ApiResponse<Contact>>(this.apiUrl + 'Remove/' + contactId);
  }

  getAllPaginatedContacts(page: number, pageSize: number,sortOrder :string,letter?: string, search?:string):Observable<ApiResponse<Contact[]>>{
    if(letter!=null)
      {
    return this.http.get<ApiResponse<Contact[]>>(this.apiUrl + `GetAllContactsByPagination?letter=${letter}&search=${search}&page=${page}&pageSize=${pageSize}&sortOrder=${sortOrder}`);
      }
      else if(letter == null )
      {
        return this.http.get<ApiResponse<Contact[]>>(this.apiUrl + `GetAllContactsByPagination?page=${page}&pageSize=${pageSize}&sortOrder=${sortOrder}`);
      }
      else{
        return this.http.get<ApiResponse<Contact[]>>(this.apiUrl + `GetAllFavouriteContactsByPagination?letter=${letter}&page=${page}&pageSize=${pageSize}`);

      }
  }

  fetchContactCount(letter?: string,search?:string): Observable<ApiResponse<number>> {
    if(letter != null && search!="yes"){
      return this.http.get<ApiResponse<number>>(this.apiUrl + 'GetContactsCount?letter=' + letter +'&search=no');
    }
    else if(letter != null && search=="yes"){
      return this.http.get<ApiResponse<number>>(this.apiUrl + 'GetContactsCount?letter=' + letter+'&search=yes');

    }
    else  {
      return this.http.get<ApiResponse<number>>(this.apiUrl + 'GetContactsCount?search=no');
    } 
    // else if(letter == null && isFavourite){
    //   return this.http.get<ApiResponse<number>>(this.apiUrl + 'GetFavouriteContactsCount');

    // }
    // else{
    //   return this.http.get<ApiResponse<number>>(this.apiUrl + 'GetFavouriteContactsCount?letter='+letter);

    // }
    
    }

    fetchfavouriteContactCount(letter?: string): Observable<ApiResponse<number>> {
      if(letter != null){
        return this.http.get<ApiResponse<number>>(this.apiUrl + 'GetFavouriteContactsCount?letter='+letter);
      }
      else {
       
        return this.http.get<ApiResponse<number>>(this.apiUrl + 'GetFavouriteContactsCount');
  
      }
     
      
      }
      getAllFavouritePaginatedContacts(page: number, pageSize: number,letter?: string):Observable<ApiResponse<Contact[]>>{
        if(letter!=null)
          {
            return this.http.get<ApiResponse<Contact[]>>(this.apiUrl + `GetAllFavouriteContactsByPagination?letter=${letter}&page=${page}&pageSize=${pageSize}`);
          }
          else(letter == null )
          {
            return this.http.get<ApiResponse<Contact[]>>(this.apiUrl + `GetAllFavouriteContactsByPagination?page=${page}&pageSize=${pageSize}`);
          }
         
      }

      

      GETCONTACTBYBIRTHDATEMONTH(month: number):Observable<ApiResponse<ContactSP[]>>{
        return this.http.get<ApiResponse<ContactSP[]>>(`${this.apiUrl}GETCONTACTBYBIRTHDATEMONTH/${month}`)
     }

    
     GetContactsCountBasedOnCountry(countryId: number):Observable<ApiResponse<number>>{
      return this.http.get<ApiResponse<number>>(`${this.apiUrl}GetContactsCountBasedOnCountry/${countryId}`)
   }

   GETCONTACTBYSTATE(month: number):Observable<ApiResponse<ContactSP[]>>{
    return this.http.get<ApiResponse<ContactSP[]>>(`${this.apiUrl}GETCONTACTBYSTATE/${month}`)
 }
 GetContactsCountBasedOnGender(gender: string):Observable<ApiResponse<number>>{
  return this.http.get<ApiResponse<number>>(`${this.apiUrl}GetContactsCountBasedOnGender/${gender}`)
}

      

      

  


    }
   





