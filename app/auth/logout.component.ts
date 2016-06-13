import { Component } from "@angular/core";
import { ErrorService } from ".././errors/error.service";
import { SpinnerComponent } from '../shared/spinner.component';

import { AuthService } from "./auth.service";

@Component({
    selector: 'my-logout',
    templateUrl: './app/auth/logout.component.html',
    directives: [SpinnerComponent]
})
export class LogoutComponent {
    loggingOut;

    constructor(private _authService: AuthService, private _errorService: ErrorService) { }

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
        localStorage.clear();
        this.loggingOut = false;
        this._errorService.handleError(error);
    }

    handleSuccess() {
        console.log("handle success");
        this.loggingOut = false;
        localStorage.clear();
        window.location.href = "/home";
    }
}