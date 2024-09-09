import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContactListComponent } from './components/contacts/contact-list/contact-list.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { AddContactComponent } from './components/contacts/add-contact/add-contact.component';
import { EditContactComponent } from './components/contacts/edit-contact/edit-contact.component';
import { ContactdetailsComponent } from './components/contacts/contactdetails/contactdetails.component';
import { SignupsuccessComponent } from './components/auth/signupsuccess/signupsuccess.component';
import { PaginatedcontctlistComponent } from './components/contacts/paginatedcontctlist/paginatedcontctlist.component';
import { authGuard } from './guards/auth.guard';
import { FavouritecontactsComponent } from './components/contacts/favouritecontacts/favouritecontacts.component';
import { ForgetpasswordComponent } from './components/auth/forgetpassword/forgetpassword.component';
import { NgModelGroup } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ChangepasswordComponent } from './components/auth/changepassword/changepassword.component';
import { EdituserComponent } from './components/auth/edituser/edituser.component';
import { UserdetailsComponent } from './components/auth/userdetails/userdetails.component';
import { AddcontactrfComponent } from './components/contacts/addcontactrf/addcontactrf.component';
import { EditcontactrfComponent } from './components/contacts/editcontactrf/editcontactrf.component';
import { GetcontactbybirthdatemonthComponent } from './components/reports/getcontactbybirthdatemonth/getcontactbybirthdatemonth.component';
import { GetcontactbystateComponent } from './components/reports/getcontactbystate/getcontactbystate.component';
import { GetcontactscountbasedoncountryComponent } from './components/reports/getcontactscountbasedoncountry/getcontactscountbasedoncountry.component';
import { GetcontactcountbystateComponent } from './components/reports/getcontactcountbystate/getcontactcountbystate.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path:'contacts', component:ContactListComponent},
  {path:'signin', component:SigninComponent},
  {path:'signup', component:SignupComponent},
  {path:'addcontacts', component:AddContactComponent, canActivate:[authGuard]},
  {path:'editcontacts/:contactId', component:EditContactComponent,canActivate:[authGuard]},
  {path:'contactdetails/:contactId', component:ContactdetailsComponent},
  {path:'signupsuccess', component:SignupsuccessComponent},
  {path:'paginatedcontacts', component:PaginatedcontctlistComponent},
  {path:'favouritecontacts',component:FavouritecontactsComponent},
  {path:'forgetpassword',component:ForgetpasswordComponent},
  {path:'changepassword',component:ChangepasswordComponent},
  {path:'edituser/:username', component:EdituserComponent},
  {path:'userdetail/:username', component:UserdetailsComponent},
  {path:'addrf',component:AddcontactrfComponent},
  {path:'editrf/:contactId',component:EditcontactrfComponent},
  {path:'getcontactsbybirthdatemonth',component:GetcontactbybirthdatemonthComponent},
  {path:'getcontactbystate',component:GetcontactbystateComponent},
  {path:'getcountbycountry' ,component:GetcontactscountbasedoncountryComponent},
  {path:'getcountofeachgender',component:GetcontactcountbystateComponent}










];

@NgModule({
  imports: [RouterModule.forRoot(routes),NgbDropdownModule],      
  exports: [RouterModule]
})
export class AppRoutingModule { }
