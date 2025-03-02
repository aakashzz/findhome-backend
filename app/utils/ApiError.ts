export class ApiError extends Error {
   statusCode: number;
   message: string;
   error? : any;
   constructor(statusCode: number, message: string, error = []) {
      super(message);
      this.statusCode = statusCode;
      this.message = message;
      this.error = error;
   }
}


export class ApiResponse {
    statusCode: number;
    data: any;
    message: string;
    constructor(statusCode:number, message: string, data?: any){
        this.statusCode = statusCode
        this.message = message;
        this.data = data;
    }
}