// required for this component
import { Component, OnInit } from "@angular/core";

// required for this component
import { ROUTER_DIRECTIVES, Router } from '@angular/router-deprecated';
import { AuthService } from "../../security/auth/auth.service";

@Component({
    selector: 'navbar',
    templateUrl: 'app/shared/components/navbar.component.html',
    directives: [ROUTER_DIRECTIVES]
})

export class NavBarComponent implements OnInit{

    constructor(private _router: Router, private _authService: AuthService) {}

    ngOnInit() {

    }

    isCurrentRoute(route){
        var instruction = this._router.generate(route);
        return this._router.isRouteActive(instruction);
    }
    
    isLoggedIn() {
       return this._authService.isLoggedIn();
    }
    

 }