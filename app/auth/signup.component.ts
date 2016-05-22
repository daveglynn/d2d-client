import { Component, OnInit } from "@angular/core";
import { FormBuilder, ControlGroup, Validators, Control } from "@angular/common";

import { User } from "../users/user";
import { AuthService } from "./auth.service";
import {AuthValidators} from './auth.validators';

import {FocusDirective} from '../shared/directives/focus.directive';

@Component({
    selector: 'my-signup',
    templateUrl: './app/auth/signup.component.html',
    directives: [FocusDirective]
})

export class SignupComponent implements OnInit {
    form: ControlGroup;

    constructor(private _fb: FormBuilder, private _authService: AuthService) {
        this.form = _fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.compose([
                        Validators.required,
                        AuthValidators.containsSpace,
                        AuthValidators.invalidEmailAddress
            ]),
            AuthValidators.shouldBeUnique],
            password: ['',  Validators.compose([
                            Validators.required,
                            AuthValidators.invalidPassword
                            ])],
        });
    }

    onSubmit() {
        debugger;
        const user = new User(this.form.value.email, this.form.value.password, this.form.value.firstName, this.form.value.lastName);
        console.log(user);
        this._authService.signup(user)
            .subscribe(
            data => console.log(data),
            error => console.error(error),
             )
        //this._Router.navigate(['Posts']);
    }

    ngOnInit() {
        
    }

}