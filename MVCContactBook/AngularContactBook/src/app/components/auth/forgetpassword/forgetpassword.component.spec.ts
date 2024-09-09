import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetpasswordComponent } from './forgetpassword.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from 'src/app/models/ApiResponse(T)';
import { of, throwError } from 'rxjs';

describe('ForgetpasswordComponent', () => {
  let component: ForgetpasswordComponent;
  let fixture: ComponentFixture<ForgetpasswordComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getUsername', 'passwordDiscovery']);
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,RouterTestingModule,FormsModule],
      declarations: [ForgetpasswordComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: new Map().set('username', 'testuser') } } },
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) }
      ]
    });
    fixture = TestBed.createComponent(ForgetpasswordComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to signin page after successfully chang the password',()=>{
    //Arrange
     // Arrange
     
     const mockResponse: ApiResponse<string> = { success: true, data: "", message: '' };
     authService.passwordDiscovery.and.returnValue(of(mockResponse));
 
     // Act
     
     component.onSubmit({ valid: true } as NgForm);
 
     // Assert
     expect(router.navigate).toHaveBeenCalledWith(['/signin']);
     
    
  })

  it('should alert error message on unsuccessful password modifivcation',()=>{
    const mockResponse: ApiResponse<string> = { success: false, data: "", message: '' };
    authService.passwordDiscovery.and.returnValue(of(mockResponse));
    spyOn(window,'alert');
     // Act
     
     component.onSubmit({ valid: true } as NgForm);

     //Assert 
     expect(authService.passwordDiscovery).toHaveBeenCalled();
     expect(window.alert).toHaveBeenCalledWith(mockResponse.message);

  })

  it('should handle http error while changing password',()=>{
    // Arrange
    spyOn(window, 'alert');
    const mockError = { error: { message: 'HTTP error' } };
    authService.passwordDiscovery.and.returnValue(throwError(mockError));

    // Act
    
    component.onSubmit({ valid: true } as NgForm);

    // Assert
    expect(window.alert).toHaveBeenCalledWith(mockError.error.message);
  })
  it('should not call authService.passwordDiscovery on invalid form submission', () => {
    // Arrange
    const form = { valid: false } as NgForm;

    // Act
    component.onSubmit(form);

    // Assert
    expect(authService.passwordDiscovery).not.toHaveBeenCalled();
  });

});
