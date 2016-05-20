import { Component, OnInit } from "@angular/core";
import { FormBuilder, ControlGroup, Validators, Control } from "@angular/common";

import { User } from "../users/user";
import { AuthService } from "./auth.service";

@Component({
    selector: 'my-signup',
    templateUrl: './app/auth/signup.component.html'
})

export class SignupComponent implements OnInit {
    myForm: ControlGroup;

    constructor(private _fb: FormBuilder, private _authService: AuthService) { }

    onSubmit() {
        const user = new User(this.myForm.value.email, this.myForm.value.password, this.myForm.value.firstName, this.myForm.value.lastName);
        console.log(user);
        this._authService.signup(user)
            .subscribe(
            data => console.log(data),
            error => console.error(error)
            )
    }

    ngOnInit() {
        this.myForm = this._fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.compose([
                Validators.required,
                this.isEmail
            ])],
            password: ['', Validators.required]
        });
    }

    private isEmail(control: Control): { [s: string]: boolean } {
        if (!control.value.match("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")) {
            return { invalidMail: true };
        }
    }
}