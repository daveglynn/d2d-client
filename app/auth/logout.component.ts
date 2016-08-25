// standard for all components
import { Component, OnInit } from "@angular/core";
import { ErrorService } from ".././errors/error.service";
import { SpinnerComponent } from '../shared/directives/spinner.component';
import { CommonService } from   '../shared/helpers/common.service'; 

// required for this component
import { AuthService } from "./auth.service";

@Component({
    selector: 'my-logout',
    templateUrl: './app/auth/logout.component.html',
    directives: [SpinnerComponent]
})
export class LogoutComponent implements OnInit{

    loggingOut;

    constructor(private _authService: AuthService, private _commonService: CommonService, private _errorService: ErrorService) { }

    ngOnInit() {

    }

    onLogout() {
        this.loggingOut = true;
        this._authService.logout()
            .subscribe(
            error => this.handleError(error),
            () => this.handleSuccess()
            )
    }

    handleError(error: any) {
        console.log("handle error");
        this._commonService.clearLocalStorage();
        this.loggingOut = false;
        this._errorService.handleError(error);
    }

    handleSuccess() {
        console.log("handle success");
        this.loggingOut = false;
        this._commonService.clearLocalStorage();
        window.location.href = "/home";
    }
}