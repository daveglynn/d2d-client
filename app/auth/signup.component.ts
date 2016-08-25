// standard for all components
import { Component, OnInit } from "@angular/core";
import { ControlGroup, FormBuilder, Validators, Control } from "@angular/common";
import { ClientValidators } from '../shared/validators/client.validators';
import { FocusDirective } from '../shared/directives/focus.directive';
import { ConstantsService } from   '../shared/helpers/constants.service';
import { ErrorService } from ".././errors/error.service";
import { SpinnerComponent } from '../shared/directives/spinner.component';
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
            firstName: ['', Validators.compose([
                Validators.required,
                ClientValidators.isEmpty,
                ClientValidators.outOfRange50
            ])],
            lastName: ['', Validators.compose([
                Validators.required,
                ClientValidators.isEmpty,
                ClientValidators.outOfRange50
            ])],
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
        this.signingUp = true; 
        const user = new User(null,this.form.value.email, this.form.value.password, this.form.value.firstName, this.form.value.lastName);
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