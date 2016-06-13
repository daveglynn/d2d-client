import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router-deprecated';
import { AuthService } from "./auth/auth.service";

@Component({
    selector: 'navbar',
    templateUrl: 'app/navbar.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class NavBarComponent {
    constructor(private _router: Router,private _authService: AuthService){
    }
    
    isCurrentRoute(route){
        var instruction = this._router.generate(route);
        return this._router.isRouteActive(instruction);
    }
    
    isLoggedIn() {
       return this._authService.isLoggedIn();
    }
    
 }