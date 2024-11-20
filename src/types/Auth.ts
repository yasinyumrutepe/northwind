

export type LoginRequest = {
    email:string,
    password:string

}


export type RegisterRequest = {
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    confirmPassword:string
}


export type ChangePasswordRequest = {
    customerID : string;
    currentPassword : string;
    newPassword:string;
    confirmPassword:string;
}

export type ChangePasswordResponse = {
    isChange:boolean;
    statusCode : number;
}