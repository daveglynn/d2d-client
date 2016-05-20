import { Component } from "@angular/core";
import {Router} from '@angular/router-deprecated';

import { AuthService } from "./auth.service";

@Component({
    selector: 'my-logout',
    templateUrl: './app/auth/logout.component.html'
})
export class LogoutComponent {
    constructor(private _authService: AuthService, private _router: Router) { }

    onLogout() {
        this._authService.logout();
        this._router.navigate(['/auth/signin']);
    }
}