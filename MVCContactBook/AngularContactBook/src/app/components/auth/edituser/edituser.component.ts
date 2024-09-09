import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from 'src/app/models/ApiResponse(T)';
import { EditUser } from 'src/app/models/edituser.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent {
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
    @ViewChild('imageInput') imageInput!: ElementRef;
    fileSizeError = false; 


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
        
      });
    }

    onFileChange(event: any): void {
      const file = event.target.files[0];
      if (file) {
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!allowedTypes.includes(file.type)) {
          this.fileSizeError = true;
          return; // Exit the method if file type is not allowed
        }
        if (file.size > 50 * 1024) { // Convert KB to bytes
          this.fileSizeError = true;
            return; // Exit the method if file size exceeds the limit
        }
        const reader = new FileReader();
        reader.onload = () => {
          this.user.imageByte = (reader.result as string).split(',')[1]; 
          this.user.fileName = file.name;
          this.imageUrl = reader.result; 
          this.imageName = file.name; 
        };
        reader.readAsDataURL(file);
      }
    }
    removeFile() {
      this.imageUrl = null; // Clear the imageUrl variable to remove the image
      // You may want to also clear any associated form data here if needed
      this.user.imageByte = '';
      this.user.fileName = null;
      this.imageName = '';
      this.imageInput.nativeElement.value = '';
  }

  onSubmit(form :NgForm){
    if(form.valid )
    {
     
      if (this.imageUrl === null) {
        // If file has been removed, clear the imageByte and fileName in the contact object
        this.user.imageByte = '';
        this.user.fileName = null;
      }
      this.authService.editContact(this.user)
      .subscribe({ 
       next: (response : ApiResponse<EditUser>) => {
         console.log(response)
         if(response.success)
        {
         alert("user updated successfully:", );
         this.router.navigate(['/paginatedcontacts']);
        
         
        }
        else if (!response.success){
         alert(response.message)

       }
    },
    error:(error) => {
      console.error("Error occurred while updating contact:", error);
      alert(error.error.message)
     
    }

  });
}
}

}
