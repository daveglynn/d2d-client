import {EventEmitter} from "@angular/core"
import {Error} from "./error";
export class ErrorService {
 
    errorOccurred = new EventEmitter<Error>()
    handleError(error: any) {
        //error.errors[0].message
        const errorData = new Error(error.name, error.message);
        this.errorOccurred.emit(errorData);
    };
} 