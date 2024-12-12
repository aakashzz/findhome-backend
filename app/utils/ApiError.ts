export class ApiError extends Error{
     statusCode:number
     message:string
     error?;
    constructor(statusCode:number,message:string,error = []){
        super(message)
        this.statusCode = statusCode;
        this.message = message;
        this.error = error
    }
}