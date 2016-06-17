import {EventEmitter} from "@angular/core"
import {Error} from "./error";
export class ErrorService {
 
        errorOccurred = new EventEmitter<Error>()
        handleError(error: any) {
        var errorData = new Error("", "");
        //error.errors[0].message
        debugger;

        if ((error.status != 'undefined') && (error.status != undefined)) {
            if (error.status == '401') {
                errorData = new Error(error.status, "Authentication is required for this screen");
            }
        }  
        if ((errorData.title === "") && (error.message != 'undefined') && (error.message != undefined)) {
            errorData = new Error(error.title, error.message);
        }  
        if ((errorData.title === "") && (error.name != 'undefined') && (error.name != undefined)) {
            errorData = new Error(error.name, error.message);
        }  
        if (errorData.title === "") {
            var errorData = new Error("Error", "An Error occurred proccessing your request");
        }

        this.errorOccurred.emit(errorData);
    };
} 