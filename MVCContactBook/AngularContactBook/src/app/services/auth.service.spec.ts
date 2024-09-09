import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PasswordRecovery } from '../models/passwordrecovery.model';
import { ApiResponse } from '../models/ApiResponse(T)';
import { User } from '../models/user.model';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock:HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock=TestBed.inject(HttpTestingController);
  });

  afterEach(()=>{
    httpMock.verify();
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  // Register User
  it('should register user successfully',()=>{
    //arrange
    const registerUser:User={
      "userId": 1,
      "firstName": "string",
      "lastName": "string",
      "loginId": "string",
      "email": "user@example.com",
      "contactNumber": "330407 1959",
      "password": "Di5;reP9]]A,0@c\\%V*g?Do>A/<5I?yBkWM2`dCWQ.s'!%U.+syh,0 P8sb-XmUqD",
      "confirmPassword": "string",
      imageByte: '',
      fileName: null
    };
    const mockSuccessResponse:ApiResponse<string>={
      success:true,
      message:"User register successfully.",
      data:""
    }
    //act
    service.signUp(registerUser).subscribe(response=>{
      //assert
      expect(response).toBe(mockSuccessResponse);
    });
    const req=httpMock.expectOne('http://localhost:5104/api/auth/Register');
    expect(req.request.method).toBe('POST');
    req.flush(mockSuccessResponse);

  });
  it('should handle failed user register',()=>{
    //arrange
    const registerUser:User={
      "userId": 0,
      "firstName": "string",
      "lastName": "string",
      "loginId": "string",
      "email": "user@example.com",
      "contactNumber": "330407 1959",
      "password": "Di5;reP9]]A,0@c\\%V*g?Do>A/<5I?yBkWM2`dCWQ.s'!%U.+syh,0 P8sb-XmUqD",
      "confirmPassword": "string",
      imageByte: '',
      fileName: null
    };
    const mockErrorResponse:ApiResponse<string>={
      success:true,
      message:"User already exists.",
      data:""
    }
    //act
    service.signUp(registerUser).subscribe(response=>{
      //assert
      expect(response).toBe(mockErrorResponse);
    });
    const req=httpMock.expectOne('http://localhost:5104/api/auth/Register');
    expect(req.request.method).toBe('POST');
    req.flush(mockErrorResponse);

  });
  it('should handle Http error while register user',()=>{
    //arrange
    const registerUser:User={
      "userId": 0,
      "firstName": "string",
      "lastName": "string",
      "loginId": "string",
      "email": "user@example.com",
      "contactNumber": "330407 1959",
      "password": "Di5;reP9]]A,0@c\\%V*g?Do>A/<5I?yBkWM2`dCWQ.s'!%U.+syh,0 P8sb-XmUqD",
      "confirmPassword": "string",
      imageByte: '',
      fileName: null
    };
    const mockHttpError={
      statusText:"Internal Server Error",
      status:500
    }
    //act
    service.signUp(registerUser).subscribe({
      next:()=>fail('should have failed with the 500 error'),
      error:(error)=>{
        //assert
      expect(error.status).toEqual(500);
      expect(error.statusText).toEqual('Internal Server Error');
      }
    });
    const req=httpMock.expectOne('http://localhost:5104/api/auth/Register');
    expect(req.request.method).toBe('POST');
    req.flush({},mockHttpError);

  });
  //Forget Password
  it('should update password successfully',()=>{
    //arrange
    const forgetPassword:PasswordRecovery={
      "username": "string",
      "password": "string",
      "confirmPassword": "string"
    };
    const mockSuccessResponse:ApiResponse<string>={
      success:true,
      message:"Password successfully change.",
      data:""
    }
    //act
    service.passwordDiscovery(forgetPassword).subscribe(response=>{
      //assert
      expect(response).toBe(mockSuccessResponse);
    });
    const req=httpMock.expectOne('http://localhost:5104/api/auth/forgetpassword');
    expect(req.request.method).toBe('POST');
    req.flush(mockSuccessResponse);

  });
  it('should handle failed user forget password',()=>{
    //arrange
    const forgetPassword:PasswordRecovery={
      "username": "string",
  "password": "string",
  "confirmPassword": "string"
    };
    const mockErrorResponse:ApiResponse<string>={
      success:true,
      message:"User already exists.",
      data:""
    }
    //act
    service.passwordDiscovery(forgetPassword).subscribe(response=>{
      //assert
      expect(response).toBe(mockErrorResponse);
    });
    const req=httpMock.expectOne('http://localhost:5104/api/auth/forgetpassword');
    expect(req.request.method).toBe('POST');
    req.flush(mockErrorResponse);

  });
  it('should handle Http error while forget password',()=>{
    //arrange
    const forgetPassword:PasswordRecovery={
      "username": "string",
      "password": "string",
      "confirmPassword": "string"
    };
    const mockHttpError={
      statusText:"Internal Server Error",
      status:500
    }
    //act
    service.passwordDiscovery(forgetPassword).subscribe({
      next:()=>fail('should have failed with the 500 error'),
      error:(error)=>{
        //assert
      expect(error.status).toEqual(500);
      expect(error.statusText).toEqual('Internal Server Error');
      }
    });
    const req=httpMock.expectOne('http://localhost:5104/api/auth/forgetpassword');
    expect(req.request.method).toBe('POST');
    req.flush({},mockHttpError);

  });
});
