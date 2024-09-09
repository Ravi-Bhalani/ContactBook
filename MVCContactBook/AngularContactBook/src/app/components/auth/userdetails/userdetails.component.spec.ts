import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserdetailsComponent } from './userdetails.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { EditUser } from 'src/app/models/edituser.model';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { ApiResponse } from 'src/app/models/ApiResponse(T)';

describe('UserdetailsComponent', () => {
  let component: UserdetailsComponent;
  let fixture: ComponentFixture<UserdetailsComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  const mockUser: EditUser = {
    firstName: '',
    lastName: '',
    loginId: 'testUser',
    contactNumber: '',
    fileName: null,
    imageByte: '',
    email: '',
    userId: 0,
    password:'',
    confirmPassword:''
  }

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['fetchUserByloginId', 'getUsername','isAuthenticated']);
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,RouterTestingModule,FormsModule],
      declarations: [UserdetailsComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => 'testUser'} }
          }
        }
      ]
    });
    fixture = TestBed.createComponent(UserdetailsComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should  get username and get userDetails correctly', () => {
    // Arrange

    const mockResponse: ApiResponse<EditUser> = { success: true, data: mockUser, message: '' };
    authService.fetchUserByloginId.and.returnValue(of(mockResponse));
    // Act (ngOnInit will be called automatically)
    fixture.detectChanges();
    // Assert
    
   
    
    expect(component.user.loginId).toEqual('testUser');
    expect(authService.fetchUserByloginId).toHaveBeenCalledWith("testUser"); // Adjust based on your actual implementation
  });

  it('should set isAuthenticated false,not get username and not get userDetails', () => {
    // Arrange
    
    const mockError = {error: { message: 'Network error' }};
    authService.fetchUserByloginId.and.returnValue(throwError(()=> mockError));
    spyOn(window,'alert');
    // Act (ngOnInit will be called automatically)
    fixture.detectChanges();
    // Assert
    
    expect(authService.fetchUserByloginId).toHaveBeenCalled(); 
    expect(window.alert).toHaveBeenCalledWith(mockError.error.message)
  });

  it('should set isAuthenticated true, get username and get success false in userDetails', () => {
    // Arrange
   
    const mockResponse: ApiResponse<EditUser> = { success: false, data: mockUser, message: '' };
    authService.fetchUserByloginId.and.returnValue(of(mockResponse));
    spyOn(console,'error');
    // Act (ngOnInit will be called automatically)
    fixture.detectChanges();
    // Assert
   
    expect(component.user.loginId).toEqual('');
    expect(authService.fetchUserByloginId).toHaveBeenCalledWith('testUser'); 
    expect(console.error).toHaveBeenCalledWith('Failed to fetch user: ', mockResponse.message)
  });
});
