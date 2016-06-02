import { Component, OnInit } from "@angular/core";
import { FormBuilder, ControlGroup, Validators, Control } from "@angular/common";
import { User } from "../users/user";
import { AuthService } from "./auth.service";
import { AuthValidators } from './auth.validators';
import { FocusDirective } from '../shared/directives/focus.directive';
import { ConstantsService } from   '../shared/constants.service';
import { ErrorService } from ".././errors/error.service";
 
// error 


//required for Server validation
//import { Http, Headers } from "@angular/http";
//import { AuthAsyncValidators } from './auth.async.validators';
//import { Observable } from "rxjs/Observable";
//import {ViewChild} from '@angular/core';


@Component({
    selector: 'my-signup',
    templateUrl: './app/auth/signup.component.html',
    directives: [FocusDirective]
})

export class SignupComponent implements OnInit {
   // @ViewChild('email') email;
    form: ControlGroup;

 
    constructor(private _fb: FormBuilder, private _authService: AuthService, private cs: ConstantsService, private  _errorService: ErrorService  )  {
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

       // var authAsyncValidators = new AuthAsyncValidators(this._http);
        //var errors = authAsyncValidators.alreadyExists(this.form.controls.email);
         
        //debugger;
       // console.log(this.email);
        //this._http.get("http://d2d-demo.herokuapp.com/users/email/" + this.email.value)
        //      .subscribe(
        //      res =>   res.json(),
        //      error => console.log(error)
        //      );
          
        const user = new User(this.form.value.email, this.form.value.password, this.form.value.firstName, this.form.value.lastName);
        console.log(user);

        this._authService.signup(user)
            .subscribe(
            data => console.log(data),
            error => this._errorService.handleError(error)
           )
        //this._router.navigate(["./Users"]);
        //window.location.href = this.cs.redirectAfterSignup;
    }

    ngOnInit() {
        
    }

}