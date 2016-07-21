﻿import {Injectable} from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
 
import { ConstantsService } from   '../shared/helpers/constants.service';
import { CommonService } from   '../shared/helpers/common.service';

@Injectable()
export class ProfileService {

    private _url = this._cs.serverUrl;

    constructor(private _cs: ConstantsService, private _commonService: CommonService, private _http: Http) {
    }

    getProfiles() {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this._http.get(this._url + "/profiles/all", { search: this._commonService.getTokenAsParm() })
            .map(res => res.json())
            .catch(error => Observable.throw(error.json()))

    }

    getProfile(profileId) {
        // return this._http.get(this._url + "/" + profileId
        return this._http.get(this._url + "/profiles/" + profileId, { search: this._commonService.getTokenAsParm() })
            .map(res => res.json())
            .catch(error => Observable.throw(error.json()))
    }

    addProfile(profile) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const body = JSON.stringify(profile);
        return this._http.post(this._url + "/profiles/", body, { headers: headers, search: this._commonService.getTokenAsParm() })
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()))
    }

    updateProfile(profile) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const body = JSON.stringify(profile);
        return this._http.put(this._url + "/profiles/" + profile.id, body, { headers: headers, search: this._commonService.getTokenAsParm() })
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()))
    }

    deleteProfile(profileId) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this._http.delete(this._url + "/profiles/" + profileId, { headers: headers, search: this._commonService.getTokenAsParm() })
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()))

    }

}