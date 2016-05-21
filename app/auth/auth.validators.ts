import {Control} from '@angular/common';


export class AuthValidators {

    static containsSpace(control: Control) {
        if (control.value.trim().indexOf(' ') >= 0)
            return { containsSpace: true };
        return null;
    }

    static invalidEmailAddress(control: Control) {
        if (!control.value.match("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")) {
            return { invalidEmailAddress: true };
        }
        return null;
    }

    static shouldBeUnique(control: Control) {
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                if (control.value == "dave@dave.com")
                    resolve({ shouldBeUnique: true });
                else
                    resolve(null);
            }, 1000);
        });
    }
    
}