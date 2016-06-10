import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';
import {ConstantsService} from   '../shared/constants.service';
import { User, Login } from '../users/user';
 
@Injectable()
export class AuthService {
    constructor(private cs: ConstantsService,private _http: Http) { }
    private _url = this.cs.serverUrl;

    signup(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({ 'Content-Type': 'application/json' });
         return this._http.post(this._url + '/users', body, { headers: headers })
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()));
    }

    signin(login: Login) {
        const body = JSON.stringify(login);
        const headers = new Headers({ 'Content-Type': 'application/json' });
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()));
    }

    logout() {
        const token = localStorage.getItem('token');
        const headers = new Headers({ 'Content-Type': 'application/json' });
        this._http.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        headers.append('Auth', token);
        return this._http.delete(this._url + '/users/login',  { headers: headers } )
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()))
    }

    isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }


}