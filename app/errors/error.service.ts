import {EventEmitter} from "@angular/core"
import {Error} from "./error";
export class ErrorService {
 
    errorOccurred = new EventEmitter<Error>()
    handleError(error: any) {

        const errorData = new Error("Error", "An Error occurred proccessing your request");
        //error.errors[0].message
        if (error.name != undefined) {
            const errorData = new Error(error.name, error.message);
        }  
        this.errorOccurred.emit(errorData);
    };
} 