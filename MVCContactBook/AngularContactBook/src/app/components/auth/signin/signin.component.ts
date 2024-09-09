import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LocalstorageService } from 'src/app/services/helpers/localstorage.service';
import { LocalStorageKeys } from 'src/app/services/helpers/localstoragekeys';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  loading:boolean = false;
  username : string='';
  password:string='';

  constructor(private authService : AuthService,
    private localStorage : LocalstorageService,
    private router : Router,
    private cdr: ChangeDetectorRef
  ) {}

  login(){
    // this.router.navigate(['/categories']);

    this.authService.signIn(this.username,this.password).subscribe({
      next:(response)=>{
        if(response.success){
          this.localStorage.setItem(LocalStorageKeys.TokenName,response.data);
          this.localStorage.setItem(LocalStorageKeys.UserId,this.username);
          this.cdr.detectChanges(); //Manually triger change detction
          this.router.navigate(['/paginatedcontacts']);
        }else
        {
          alert(response.message)

        }
      },
      error:(error)=>{
        alert(error.error.message);
        this.loading= false;

      }
    });

  }
}
