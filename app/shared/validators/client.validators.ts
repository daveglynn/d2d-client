import {Control} from '@angular/common';
 
 
 
export class ClientValidators{
   


    static containsSpace(control: Control) {
        if (control.value.trim() != "") {
            if (control.value.trim().indexOf(' ') >= 0)
                return { containsSpace: true };
            return null;
        }
    }

    static invalidEmailAddress(control: Control) {
        if (control.value.trim() != "") {
            if (!control.value.match("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")) {
                return { invalidEmailAddress: true };
            }
            return null;
        }
    }


    static invalidPassword(control: Control) {
        if (control.value.trim() != "") {
            if (!control.value.match("^.{6,10}$")) {
                return { invalidPassword: true };
            }
            if (!control.value.match("[0-9]")) {
                return { invalidPassword: true };
            }
            if (!control.value.match("[A-Z]")) {
                return { invalidPassword: true };
            }
            if (!control.value.match("[a-z]")) {
                return { invalidPassword: true };
            }

            return null;
        }
    }



    //static alreadyExists(control: Control) {
    //   
    //    return new Promise((resolve, reject) => {
    //        setTimeout(function () {
    //            if (control.value == "dave@dave.com")
    //                resolve({ alreadyExists: true });
    //            else
    //                resolve(null);
    //        }, 1000);
    //    });
    // }

    //static alreadyExists(test: string, http: Http) {
     //    return new Promise((resolve, reject) => {
    //         //var _http = require('http');
    //          http.get("http://d2d-demo.herokuapp.com/users/email/" + test)
    //            .subscribe(data => {
    //                data = data
    //                if (data) {
   //                     resolve({ alreadyExists: true })
    //                } else {
    //                    resolve(null);
    //                }
    //            });
    //    });
    // }


    //static alreadyExists(control: Control) {
    //    return new Promise((resolve, reject) => {
    //        setTimeout(function () {
    //            if (control.value == "dave@dave.com")
    //                resolve({ alreadyExists: true });
    //            else
    //                resolve(null);
    //        }, 1000);
    //    });
    // }


 //   static invalidCombination(control: Control) {
 //       return new Promise((resolve, reject) => {
 //           setTimeout(function () {
 //               if (control.value == "Password1")
 //                   resolve({ invalidCombination: true });
 //               else
 //                   resolve(null);
 //           }, 1000);
 //       });
 //   }


}

 