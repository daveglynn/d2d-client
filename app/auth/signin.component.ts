import { Component, OnInit } from "@angular/core";
import { ControlGroup, FormBuilder, Validators, Control } from "@angular/common";
import { User } from '../users/user';
import { AuthService } from "./auth.service";
import { AuthValidators} from './auth.validators';
import { FocusDirective } from '../shared/directives/focus.directive';
import { ConstantsService } from   '../shared/constants.service';

@Component({
    selector: 'my-signin',
    templateUrl: './app/auth/signin.component.html',
    directives: [FocusDirective]
})
export class SigninComponent implements OnInit {
    form: ControlGroup;

    constructor(private _fb: FormBuilder, private _authService: AuthService, private cs: ConstantsService) {

        this.form = _fb.group({
            email: ['', Validators.compose([
                Validators.required,
                AuthValidators.containsSpace,
                AuthValidators.invalidEmailAddress
            ])],
            password: ['', Validators.compose([
                Validators.required,
                AuthValidators.invalidPassword
            ]),
                AuthValidators.invalidCombination]
        });
    }

    onSubmit() {
        const user = new User(this.form.value.email, this.form.value.password);
        this._authService.signin(user)
            .subscribe(
            data => {
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.userId);
            },
            error => console.error(error)
            );
        window.location.href = this.cs.redirectAfterSignin;
    }

    ngOnInit() {
      
    }


}