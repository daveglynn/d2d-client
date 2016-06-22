import {EventEmitter} from "@angular/core"
import {Error} from "./error";
export class ErrorService {
 
        errorOccurred = new EventEmitter<Error>()
        handleError(error: any) {
        var errorData = new Error("", "");
        //error.errors[0].message

        if ((error.status != 'undefined') && (error.status != undefined)) {
            if (error.status == '401') {
                errorData = new Error(error.status, "Authentication is required for this screen");
            }
        }  
        if ((error._body != undefined) && (error._body != 'undefined')) {
 
            if ((errorData.title === "") && (JSON.parse(error._body).message != 'undefined') && (JSON.parse(error._body).message != undefined)) {
                errorData = new Error(JSON.parse(error._body).title, JSON.parse(error._body).message);
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