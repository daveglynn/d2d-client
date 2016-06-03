import {EventEmitter} from "@angular/core"
import {Error} from "./error";
export class ErrorService {
 
    errorOccurred = new EventEmitter<Error>()
    handleError(error: any) {
        debugger;
        const errorData = new Error(error.name, error.errors[0].message);
        this.errorOccurred.emit(errorData);
    };
} 