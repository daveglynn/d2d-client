import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';
import {ConstantsService} from   '../shared/constants.service';
import {CommonService} from   '../shared/common.service';
import { User, Login } from '../users/user';

import {URLSearchParams} from '@angular/http';

@Injectable()
export class AuthService {
    constructor(private _cs: ConstantsService, private commonService: CommonService,private _http: Http) { }
    private _url = this._cs.serverUrl;

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
        return this._http.post(this._url + '/users/login', body, { headers: headers })
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()));
    } 
       
    logout() {
        return this._http.delete(this._url + '/users/login', { search: this.commonService.getToken()} )
           .map(response => response.json())
           .catch(error => Observable.throw(error.json()))
    }

    isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }


}