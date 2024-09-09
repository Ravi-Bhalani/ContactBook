import { Injectable } from '@angular/core';
import { LocalstorageService } from './helpers/localstorage.service';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/ApiResponse(T)';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/user.model';
import { LocalStorageKeys } from './helpers/localstoragekeys';
import { PasswordRecovery } from '../models/passwordrecovery.model';
import { EditUser } from '../models/edituser.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5104/api/auth/';
  private authState = new BehaviorSubject<boolean>(this.localStorageHelper.hasItem(LocalStorageKeys.TokenName));
  private usernameSubject = new BehaviorSubject<string|null|undefined>(this.localStorageHelper.getItem(LocalStorageKeys.UserId));

  constructor(private localStorageHelper : LocalstorageService,private http: HttpClient) { }
   
  signUp(user : User): Observable<ApiResponse<string>>{
    const body = user;
    return this.http.post<ApiResponse<string>>(this.apiUrl + "Register",body)
  }
  signIn(username:string, password: string):Observable<ApiResponse<string>>{
    const body={username,password};
    return this.http.post<ApiResponse<string>>(this.apiUrl + "Login",body).pipe(
      tap(response =>{
        if(response.success){
          this.localStorageHelper.setItem(LocalStorageKeys.TokenName,response.data);
          this.localStorageHelper.setItem(LocalStorageKeys.UserId,username);
          this.authState.next(this.localStorageHelper.hasItem(LocalStorageKeys.TokenName));
          this.usernameSubject.next(username)

        }
      })
    );
  }
  signOut(){
    this.localStorageHelper.removeItem(LocalStorageKeys.TokenName);
    this.localStorageHelper.removeItem(LocalStorageKeys.UserId);
    this.authState.next(false);
    this.usernameSubject.next(null);
  }
  isAuthenticated(){
    return this.authState.asObservable();
  }
  getUsername() : Observable<string |null | undefined>{
    return this.usernameSubject.asObservable();
  }
 
  passwordDiscovery(contact: PasswordRecovery): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(this.apiUrl + 'forgetpassword', contact);
  }
  fetchUserByloginId(loginId: string|null|undefined): Observable<ApiResponse<EditUser>> {
    return this.http.get<ApiResponse<EditUser>>(this.apiUrl + 'GetUserByLoginId/' + loginId);
  }
  editContact(user: EditUser): Observable<ApiResponse<EditUser>> {
    return this.http.put<ApiResponse<EditUser>>(this.apiUrl + 'ModifyUser',user);
  }
}
