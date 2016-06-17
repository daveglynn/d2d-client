// standard for all components
import { Component, OnInit } from "@angular/core";
import { ControlGroup, FormBuilder, Validators, Control } from "@angular/common";
import { ClientValidators } from '../shared/validators/client.validators';
import { FocusDirective } from '../shared/directives/focus.directive';
import { ConstantsService } from   '../shared/helpers/constants.service';
import { ErrorService } from ".././errors/error.service";
import { SpinnerComponent } from '../shared/helpers/spinner.component';
import { CommonService } from   '../shared/helpers/common.service'; 

// required for this component
import { AuthService } from "./auth.service";
import { User } from "../users/user";

@Component({
    selector: 'my-signup',
    templateUrl: './app/auth/signup.component.html',
    directives: [SpinnerComponent,FocusDirective]
})

export class SignupComponent implements OnInit {

    signingUp;
    form: ControlGroup;
 
    constructor(private _fb: FormBuilder, private _authService: AuthService, private _cs: ConstantsService, private _commonService: CommonService,private _errorService: ErrorService )  {

        this.form = _fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.compose([
                        Validators.required,
                        ClientValidators.containsSpace,
                        ClientValidators.invalidEmailAddress
            ])],
            password: ['',  Validators.compose([
                            Validators.required,
                            ClientValidators.invalidPassword
                            ])],
        });
    } 

    ngOnInit() {

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
         this._commonService.clearLocalStorage();
        window.location.href = "/auth/signin";
   }

}