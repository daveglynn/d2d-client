import {Injectable} from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

import { ConstantsService } from   '../shared/helpers/constants.service';
import { CommonService } from   '../shared/helpers/common.service';

@Injectable()
export class LanguageService {

    private _url = this._cs.serverUrl;

    constructor(private _cs: ConstantsService, private _commonService: CommonService, private _http: Http) {
    }

    getLanguages() {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this._http.get(this._url + "/languages/all", { search: this._commonService.getTokenAsParm() })
            .map(res => res.json())
            .catch(error => Observable.throw(error.json()))

    }

    getLanguage(languageId) {
        // return this._http.get(this._url + "/" + languageId
        return this._http.get(this._url + "/languages/" + languageId, { search: this._commonService.getTokenAsParm() })
            .map(res => res.json())
            .catch(error => Observable.throw(error.json()))
    }

    addLanguage(language) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const body = JSON.stringify(language);
        return this._http.post(this._url + "/languages/", body, { headers: headers, search: this._commonService.getTokenAsParm() })
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()))
    }

    updateLanguage(language) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const body = JSON.stringify(language);
        return this._http.put(this._url + "/languages/" + language.id, body, { headers: headers, search: this._commonService.getTokenAsParm() })
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()))
    }

    deleteLanguage(languageId) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this._http.delete(this._url + "/languages/" + languageId, { headers: headers, search: this._commonService.getTokenAsParm() })
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()))

    }

}