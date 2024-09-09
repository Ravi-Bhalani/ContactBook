import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/models/ApiResponse(T)';
import { PasswordRecovery } from 'src/app/models/passwordrecovery.model';
import { AuthService } from 'src/app/services/auth.service';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent {

  user : PasswordRecovery={
    username: '',
    password: '',
    confirmPassword:'',
  };

  constructor(
    private contactService : ContactService,
    private authService : AuthService,
    
    private router :Router,) {}

    onSubmit(myForm :NgForm){
      if(myForm.valid)
        {
          
          this.authService.passwordDiscovery(this.user)
          .subscribe({
            next: (response :ApiResponse<string>)=> {
              console.log(response)
              if(response.success){
                alert("contacts created successfully:",);
              this.router.navigate(['/signin']);
       
              }
              else if (!response.success){
                
                alert(response.message)
      
              }
              
            },
            error: (error)=> {
              console.error("Error occurred:", error);
              alert(error.error.message)
              
            }
        });
        }
    }
    checkPasswords(myForm: NgForm):void {
      const password = myForm.controls['password'];
      const confirmPassword = myForm.controls['confirmPassword'];
   
      if (password && confirmPassword && password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ passwordMismatch: true });
      } else {
        confirmPassword.setErrors(null);
      }
    }

}
