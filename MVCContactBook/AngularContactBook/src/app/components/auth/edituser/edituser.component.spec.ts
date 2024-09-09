import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdituserComponent } from './edituser.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from 'src/app/models/ApiResponse(T)';
import { of, throwError } from 'rxjs';
import { EditUser } from 'src/app/models/edituser.model';

describe('EdituserComponent', () => {
  let component: EdituserComponent;
  let fixture: ComponentFixture<EdituserComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  const mockUser: EditUser = {
    userId: 1,
    firstName: 'John',
    lastName: 'Doe',
    loginId: 'testusername',
    email: 'john.doe@example.com',
    contactNumber: '1234567890',
    password: '',
    confirmPassword: '',
    imageByte: 'base64-encoded-image',
    fileName: null
  };

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['fetchUserByloginId','editContact']);
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,RouterTestingModule,FormsModule],
      declarations: [EdituserComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: new Map().set('username', 'testuser') } } },
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) }
      ]
    });
    fixture = TestBed.createComponent(EdituserComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch loginId from routes and fetch contact details',()=>{
    const mockResponse : ApiResponse<EditUser>={success:true,data:mockUser,message:''}
    authService.fetchUserByloginId.and.returnValue(of(mockResponse));

    component.ngOnInit();

    expect(component.user.userId).toBe(1);
    expect(authService.fetchUserByloginId).toHaveBeenCalled();
  })

  it('should fetch user details and update component properties', () => {
    
    //Arrange
    authService.fetchUserByloginId.and.returnValue(of({ success: true, data: mockUser } as ApiResponse<EditUser>));

    //Act
    component.loacontactDetails('testusername');

    //Assert
    expect(component.user).toEqual(mockUser);
    expect(component.imageUrl).toEqual('data:image/jpeg;base64,base64-encoded-image');
    
  });

  it('should alert error essage on fetching contactdetails ', () => {
    
    //Arrange
    authService.fetchUserByloginId.and.returnValue(of({ success: false, data: mockUser,message: 'Failed to fetch user:' } as ApiResponse<EditUser>));
    spyOn(console,'error');
    //Act
    component.loacontactDetails('testusername');

    //Assert
    
    expect(console.error).toHaveBeenCalledWith('Failed to fetch user: ','Failed to fetch user:');
   
    
  });
  it('should handle http error while updating user',()=>{
    // Arrange
    spyOn(window, 'alert');
    const mockError = { error: { message: 'HTTP error' } };
    authService.fetchUserByloginId.and.returnValue(throwError(mockError));

    // Act
    
    component.loacontactDetails('testusername');

    // Assert
    expect(window.alert).toHaveBeenCalledWith(mockError.error.message);
  })

  it('should navigate to paginatedcontacts page after successfully edit the user',()=>{
    //Arrange
     // Arrange
     
     const mockResponse: ApiResponse<EditUser> = { success: true, data:mockUser, message: '' };
     authService.editContact.and.returnValue(of(mockResponse));
 
     // Act
     
     component.onSubmit({ valid: true } as NgForm);
 
     // Assert
     expect(router.navigate).toHaveBeenCalledWith(['/paginatedcontacts']);
     expect(component.loading).toBe(false);
    
  })

  it('should alert error message on unsuccessful user modification',()=>{
    const mockResponse: ApiResponse<EditUser> = { success: false, data: mockUser, message: '' };
    authService.editContact.and.returnValue(of(mockResponse));
    spyOn(window,'alert');
     // Act
     
     component.onSubmit({ valid: true } as NgForm);

     //Assert 
     expect(authService.editContact).toHaveBeenCalled();
     expect(window.alert).toHaveBeenCalledWith(mockResponse.message);

  })

  it('should handle http error while editing user',()=>{
    // Arrange
    spyOn(window, 'alert');
    const mockError = { error: { message: 'HTTP error' } };
    authService.editContact.and.returnValue(throwError(mockError));

    // Act
    
    component.onSubmit({ valid: true } as NgForm);

    // Assert
    expect(window.alert).toHaveBeenCalledWith(mockError.error.message);
  })

  it('should not call authService.editContact on invalid form submission', () => {
    // Arrange
    const form = { valid: false } as NgForm;

    // Act
    component.onSubmit(form);

    // Assert
    expect(authService.editContact).not.toHaveBeenCalled();
  });

  
});
