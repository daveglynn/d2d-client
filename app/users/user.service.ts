import {Injectable} from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

import { ConstantsService } from   '../shared/helpers/constants.service';
import { CommonService } from   '../shared/helpers/common.service';

@Injectable()
export class UserService {

    private _url = this._cs.serverUrl;

    constructor(private _cs: ConstantsService, private _commonService: CommonService,private _http: Http){
	}

    getUsers() {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this._http.get(this._url + "/users/all", { search: this._commonService.getToken() })
            .map(res => res.json())
            .catch(error => Observable.throw(error.json()))

	}
    
    getUser(userId) {
        //return this._http.get(this._url + "/" + userId
        return this._http.get(this._url + "/users/" + userId, { search: this._commonService.getToken() })
            .map(res => res.json());
	}

    addUser(user) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const body = JSON.stringify(user);
        return this._http.post(this._url + "/users/", body, { headers: headers, search: this._commonService.getToken() })
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()))
	}
    
    updateUser(user) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const body = JSON.stringify(user);
        return this._http.put(this._url + "/users/" + user.id, body, { headers: headers, search: this._commonService.getToken() })
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()))
	}
    
    deleteUser(userId) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this._http.delete(this._url + "/users/" + userId, { headers: headers, search: this._commonService.getToken() })
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()))

    }

    getUserEmail(email) {
        return this._http.get("/users/email/" + email)
           .map(res => res.json())
           .catch(error => Observable.throw(error.json()))
    }
   
}