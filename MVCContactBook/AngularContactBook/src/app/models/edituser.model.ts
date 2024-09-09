export interface EditUser{
    userId:number,
    firstName: string,
    lastName : string,
    loginId: string|null|undefined,
    email:string,
    contactNumber:string,
    password: string,
    confirmPassword:string,
    imageByte:string,
    fileName: null
}