import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactListComponent } from './components/contacts/contact-list/contact-list.component';
import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddContactComponent } from './components/contacts/add-contact/add-contact.component';
import { EditContactComponent } from './components/contacts/edit-contact/edit-contact.component';
import { ContactdetailsComponent } from './components/contacts/contactdetails/contactdetails.component';
import { SignupsuccessComponent } from './components/auth/signupsuccess/signupsuccess.component';
import { PaginatedcontctlistComponent } from './components/contacts/paginatedcontctlist/paginatedcontctlist.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthService } from './services/auth.service';
import { FavouritecontactsComponent } from './components/contacts/favouritecontacts/favouritecontacts.component';
import { ForgetpasswordComponent } from './components/auth/forgetpassword/forgetpassword.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChangepasswordComponent } from './components/auth/changepassword/changepassword.component';
import { EdituserComponent } from './components/auth/edituser/edituser.component';
import { UserdetailsComponent } from './components/auth/userdetails/userdetails.component';
import { AddcontactrfComponent } from './components/contacts/addcontactrf/addcontactrf.component';
import { EditcontactrfComponent } from './components/contacts/editcontactrf/editcontactrf.component';
import { DatePipe } from '@angular/common';
import { GetcontactbybirthdatemonthComponent } from './components/reports/getcontactbybirthdatemonth/getcontactbybirthdatemonth.component';
import { GetcontactscountbasedoncountryComponent } from './components/reports/getcontactscountbasedoncountry/getcontactscountbasedoncountry.component';
import { GetcontactbystateComponent } from './components/reports/getcontactbystate/getcontactbystate.component';
import { GetcontactcountbystateComponent } from './components/reports/getcontactcountbystate/getcontactcountbystate.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    AddContactComponent,
    EditContactComponent,
    ContactdetailsComponent,
    SignupsuccessComponent,
    PaginatedcontctlistComponent,
    FavouritecontactsComponent,
    ForgetpasswordComponent,
    ChangepasswordComponent,
    EdituserComponent,
    UserdetailsComponent,
    AddcontactrfComponent,
    EditcontactrfComponent,
    GetcontactbybirthdatemonthComponent,
    GetcontactscountbasedoncountryComponent,
    GetcontactbystateComponent,
    GetcontactcountbystateComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    ReactiveFormsModule
   
  ],
  providers: [AuthService,{provide: HTTP_INTERCEPTORS,useClass:AuthInterceptor, multi: true},DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
