import { Component, OnInit } from "@angular/core";
import { ControlGroup, FormBuilder, Validators, Control } from "@angular/common";
import {Router} from '@angular/router-deprecated';

import { User } from '../users/user';
import { AuthService } from "./auth.service";

@Component({
    selector: 'my-signin',
    templateUrl: './app/auth/signin.component.html'
})
export class SigninComponent implements OnInit {
    form: ControlGroup;

    constructor(private _fb: FormBuilder, private _authService: AuthService, private _router: Router) { }

    onSubmit() {
        const user = new User(this.form.value.email, this.form.value.password);
        this._authService.signin(user)
            .subscribe(
            data => {
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.userId);
                this._router.navigateByUrl('/');
            },
            error => console.error(error)
            );
    }

    ngOnInit() {
        this.form = this._fb.group({
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