import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditUser } from 'src/app/models/edituser.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent {
  user : EditUser={
    userId : 0,
    firstName : '',
    lastName :'',
    loginId: '',
    email:'',
    contactNumber: '',
    password: '',
    confirmPassword : '',
    imageByte : '',
    fileName : null
  };
  imageName: string = '';
  imageUrl: string | ArrayBuffer | null = null;
  loading : boolean = false;
  username : string|null|undefined;

  constructor(
    private authService : AuthService,
    private router :Router,
  private route : ActivatedRoute

  ){}
  ngOnInit(): void {
    const loginId = this.route.snapshot.paramMap.get('username')!;
   this.loacontactDetails(loginId);
  } 

  loacontactDetails(loginId:string):void{
    this.authService.fetchUserByloginId(loginId).subscribe({
      next: (response) => {
        if (response.success) {
          // Parse the date string received from the server
          
  console.log(response.data);
          this.user = response.data;
          this.username = response.data.loginId;
         
          // Set imageUrl if contact has an image
          if (this.user.imageByte) {
            this.imageUrl = 'data:image/jpeg;base64,' + this.user.imageByte;
          }
        } else {
          console.error('Failed to fetch user: ', response.message)
        }
      },
      error: (err) => {
        alert(err.error.message);
      },
      complete: () => {
        console.log('Completed');
      }
    });
  }


}
