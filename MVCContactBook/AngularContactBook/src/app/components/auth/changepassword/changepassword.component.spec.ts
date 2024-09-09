import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangepasswordComponent } from './changepassword.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { ApiResponse } from 'src/app/models/ApiResponse(T)';

describe('ChangepasswordComponent', () => {
  let component: ChangepasswordComponent;
  let fixture: ComponentFixture<ChangepasswordComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getUsername', 'passwordDiscovery']);
    TestBed.configureTestingModule({
      
      imports:[HttpClientTestingModule,RouterTestingModule,FormsModule],
      declarations: [ChangepasswordComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: new Map().set('username', 'testuser') } } },
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) }
      ]
    });
    fixture = TestBed.createComponent(ChangepasswordComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize username when getUsername returns a valid username', () => {
    const usernameSubject = new BehaviorSubject<string | null | undefined>('testuser');
    authService.getUsername.and.returnValue(usernameSubject.asObservable());

    fixture.detectChanges(); // Trigger ngOnInit indirectly

    expect(component.username).toEqual('testuser');
  });

  it('should initialize username as null when getUsername returns null', () => {
    const usernameSubject = new BehaviorSubject<string | null | undefined>(null);
    authService.getUsername.and.returnValue(usernameSubject.asObservable());

    fixture.detectChanges(); // Trigger ngOnInit indirectly

    expect(component.username).toBeNull();
  });

  it('should initialize username as undefined when getUsername returns undefined', () => {
    const usernameSubject = new BehaviorSubject<string | null | undefined>(undefined);
    authService.getUsername.and.returnValue(usernameSubject.asObservable());

    fixture.detectChanges(); // Trigger ngOnInit indirectly

    expect(component.username).toBeUndefined();
  });
  it('should not initialize username if getUsername does not emit a value', () => {
    authService.getUsername.and.returnValue(of());

    fixture.detectChanges(); // Trigger ngOnInit indirectly

    expect(component.username).toBeUndefined();
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
     expect(component.loading).toBe(false);
    
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
