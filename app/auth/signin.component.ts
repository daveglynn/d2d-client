import { Component, OnInit } from "@angular/core";
import { ControlGroup, FormBuilder, Validators, Control } from "@angular/common";
import { User } from '../users/user';
import { Login } from '../users/user';
import { AuthService } from "./auth.service";
import { AuthValidators} from './auth.validators';
import { FocusDirective } from '../shared/directives/focus.directive';
import { ConstantsService } from   '../shared/constants.service';
import { ErrorService } from ".././errors/error.service";
import { SpinnerComponent } from '../shared/spinner.component';

@Component({
    selector: 'my-signin',
    templateUrl: './app/auth/signin.component.html',
    directives: [SpinnerComponent,FocusDirective]
})
export class SigninComponent implements OnInit {
    signingIn;
    form: ControlGroup;

    constructor(private _fb: FormBuilder, private _authService: AuthService, private cs: ConstantsService, private _errorService: ErrorService ) {

        this.form = _fb.group({
            email: ['', Validators.compose([
                Validators.required,
                AuthValidators.containsSpace,
                AuthValidators.invalidEmailAddress
            ])],
            password: ['', Validators.compose([
                Validators.required,
                AuthValidators.invalidPassword
            ])]
        });
    }

    onSubmit() {
        this.signingIn = true;
        const login = new Login(this.form.value.email, this.form.value.password);
        this._authService.signin(login)
            .subscribe(
                data => this.handleData(data),
                error => this.handleError(error),
                () => this.handleSuccess()
            ) 
       // window.location.href = this.cs.redirectAfterSignin;
    }

    handleError(error: any) {
        debugger;
        console.log("handle error");
        this.signingIn = false;
        this._errorService.handleError(error);
    }

    handleData(data: any) {
        debugger;
        console.log("handle data");
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.user.userId);
        localStorage.setItem('firstName', data.user.firstName);
        localStorage.setItem('lastName', data.user.lastName);
        localStorage.setItem('email', data.user.email);
        this.signingIn = false;
    }

    handleSuccess() {
        debugger;
        console.log("handle success");
        this.signingIn = false;
        window.location.href = "/home";
    }

    ngOnInit() {
      
    }


}