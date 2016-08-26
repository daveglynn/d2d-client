// standard for all components
import { Component, OnInit } from "@angular/core";
import { ControlGroup, FormBuilder, Validators, Control } from "@angular/common";
import { ClientValidators } from '../../shared/validators/client.validators';
import { FocusDirective } from '../../shared/directives/focus.directive';
import { ConstantsService } from   '../../shared/helpers/constants.service';
import { ErrorService } from "../.././errors/error.service";
import { SpinnerComponent } from '../../shared/directives/spinner.component';
import { CommonService } from   '../../shared/helpers/common.service';

// required for this component
import { AuthService } from "./auth.service";
import { User, Login } from '../../security/users/user';
import { LocalData } from '../../shared/helpers/common';

@Component({
    selector: 'my-signin',
    templateUrl: './app/security/auth/signin.component.html',
    directives: [SpinnerComponent,FocusDirective]
})

export class SigninComponent implements OnInit {
    signingIn;
    form: ControlGroup;

    constructor(private _fb: FormBuilder, private _authService: AuthService, private _cs: ConstantsService, private _commonService: CommonService, private _errorService: ErrorService)  {

    this.form = _fb.group({
            email: ['', Validators.compose([
                Validators.required,
                ClientValidators.isEmpty,
                ClientValidators.containsSpace,
                ClientValidators.invalidEmailAddress,
                ClientValidators.outOfRange50
            ])],
            password: ['', Validators.compose([
                Validators.required,
                ClientValidators.isEmpty,
                ClientValidators.outOfRange50,
                ClientValidators.containsSpace, 
                ClientValidators.invalidPassword
            ])],
        });
    }


    ngOnInit() {

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
        console.log("handle error");
        this.signingIn = false;
        this._errorService.handleError(error);
    }

    handleData(data: any) {
        console.log("handle data");
        var localData = new LocalData(data.token, data.user.id, data.user.firstName, data.user.lastName, data.user.email);
        this._commonService.clearLocalStorage();
        this._commonService.setLocalStorage(localData);
    }

    handleSuccess() {
        console.log("handle success");
        this.signingIn = false;
        window.location.href = "/home";
    }

}