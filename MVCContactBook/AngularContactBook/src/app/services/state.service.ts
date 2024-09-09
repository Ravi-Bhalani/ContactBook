import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { State } from '../models/state.model';
import { ApiResponse } from '../models/ApiResponse(T)';
import { Observable } from 'rxjs';
import { Country } from '../models/country.model';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private apiUrl = 'http://localhost:5104/api/State/';

  constructor(private http: HttpClient) { }

  getStateByCountryId(countryId : number):Observable<ApiResponse<State[]>>{
    return this.http.get<ApiResponse<State[]>>(this.apiUrl + 'GetStateByCountry/' + countryId)
  }
  
}
