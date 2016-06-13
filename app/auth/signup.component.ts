import { Component, OnInit } from "@angular/core";
import { FormBuilder, ControlGroup, Validators, Control } from "@angular/common";
import { User } from "../users/user";
import { AuthService } from "./auth.service";
import { AuthValidators } from './auth.validators';
import { FocusDirective } from '../shared/directives/focus.directive';
import { ConstantsService } from   '../shared/constants.service';
import { ErrorService } from ".././errors/error.service";
import {SpinnerComponent} from '../shared/spinner.component';
 
 

@Component({
    selector: 'my-signup',
    templateUrl: './app/auth/signup.component.html',
    directives: [SpinnerComponent,FocusDirective]
})

export class SignupComponent implements OnInit {

    signingUp;
    form: ControlGroup;
 
    constructor(private _fb: FormBuilder, private _authService: AuthService, private cs: ConstantsService, private _errorService: ErrorService )  {
        this.form = _fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.compose([
                        Validators.required,
                        AuthValidators.containsSpace,
                        AuthValidators.invalidEmailAddress
            ])],
            password: ['',  Validators.compose([
                            Validators.required,
                            AuthValidators.invalidPassword
                            ])],
        });
    } 
    
    onSubmit() {
        this.signingUp = true; 
        const user = new User(this.form.value.email, this.form.value.password, this.form.value.firstName, this.form.value.lastName);
        console.log(user);
        this._authService.signup(user)
            .subscribe(
            data => this.handleData(data),
            error => this.handleError(error),
            () => this.handleSuccess() 
            )
    }

    handleError(error: any) {
        console.log("handle error");
        this.signingUp = false; 
        this._errorService.handleError(error);
    }

    handleData(data: any) {
        console.log("handle data");
    }

    handleSuccess() {
        console.log("handle success");
        this.signingUp = false;
        localStorage.clear();
        window.location.href = "/auth/signin";
   }

    ngOnInit() {
        
    }

}