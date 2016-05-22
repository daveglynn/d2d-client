import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';

import { User } from '../users/user';

@Injectable()
export class AuthService {
    constructor(private _http: Http) { }

    signup(user: User) {
        debugger;
        const body = JSON.stringify(user);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this._http.post('http://d2d-demo.herokuapp.com/users', body, { headers: headers })
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()));
    }

    signin(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this._http.post('http://d2d-demo.herokuapp.com/users/login', body, { headers: headers })
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()));
    }

    logout() {
        localStorage.clear();
    }

    isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }
}