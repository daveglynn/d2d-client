import { Component } from "@angular/core";
import { ErrorService } from ".././errors/error.service";
import { SpinnerComponent } from '../shared/spinner.component';
import { AuthService } from "./auth.service";
import { CommonService } from   '../shared/common.service'; 

@Component({
    selector: 'my-logout',
    templateUrl: './app/auth/logout.component.html',
    directives: [SpinnerComponent]
})
export class LogoutComponent {
    loggingOut;

    constructor(private _authService: AuthService, private _commonService: CommonService, private _errorService: ErrorService) { }

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