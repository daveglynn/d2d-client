﻿import { Component, OnInit } from "@angular/core";
import { FormBuilder, ControlGroup, Validators, Control } from "@angular/common";

import { User } from "../users/user";
import { AuthService } from "./auth.service";
import {AuthValidators} from './auth.validators';


@Component({
    selector: 'my-signup',
    templateUrl: './app/auth/signup.component.html'
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
            ]), AuthValidators.shouldBeUnique],
            password: ['', Validators.required]
        });
    }

    onSubmit() {
        const user = new User(this.form.value.email, this.form.value.password, this.form.value.firstName, this.form.value.lastName);
        console.log(user);
        this._authService.signup(user)
            .subscribe(
            data => console.log(data),
            error => console.error(error)
            )
    }

    ngOnInit() {
        
    }

}