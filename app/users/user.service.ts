import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { ConstantsService } from   '../shared/constants.service';
import { CommonService } from   '../shared/common.service';

@Injectable()
export class UserService {

    private _url = this._cs.serverUrl;
  
    constructor(private _cs: ConstantsService, private _commonService: CommonService,private _http: Http){
	}

	getUsers(){
        return this._http.get(this._url + "/users/all")
			.map(res => res.json());
	}
    
    getUser(userId) {
        debugger;
        //return this._http.get(this._url + "/" + userId
        return this._http.get(this._url + "/users/" + userId, { search: this._commonService.getToken() })
			.map(res => res.json());
	}

    addUser(user){
		return this._http.post(this._url, JSON.stringify(user))
			.map(res => res.json());
	}
    
    updateUser(user){
        return this._http.put(this._url + "/" + user.id, JSON.stringify(user))
			.map(res => res.json());
	}
    
    deleteUser(userId){
        return this._http.delete(this._url + "/" + userId)
			.map(res => res.json());
	}

     getUserEmail(email) {
        return this._http.get("/users/email/" + email)
            .map(res => res.json());
    }
   
}