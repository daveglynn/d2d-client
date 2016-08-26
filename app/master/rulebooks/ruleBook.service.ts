                      
/******************************************************************************************************
 
 Copyright 2016 Olympus Consultancy Limited - All Rights Reserved 
 You may NOT use, copy, distribute or modify this code unless you have written 
 consent from the author which may be obtained from emailing dave@ocl.ie 

******************************************************************************************************/

/******************************************************************************************************
 service layer
******************************************************************************************************/
"use strict";
import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { ConstantsService } from   '../../shared/helpers/constants.service';
import { CommonService } from   '../../shared/helpers/common.service';

@Injectable()

export class RulebookService {

    private _url = this._cs.serverUrl;

    constructor(private _cs: ConstantsService, private _commonService: CommonService,private _http: Http){
	}

    getRulebooks(filter?) {
        var parms = {};
        if (filter && filter.q) {
            parms['q'] = filter.q;
        }
	  		if (filter && filter.active) {
             parms['active'] = filter.active;
		};
    
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this._http.get(this._url + "/ruleBook/all", { search: this._commonService.setParms(parms) })
            .map(res => res.json())
            .catch(error => Observable.throw(error.json()))
	}
    
    getRulebook(ruleBookId) {
        return this._http.get(this._url + "/ruleBook/" + ruleBookId, { search: this._commonService.getTokenAsParm() })
            .map(res => res.json())
            .catch(error => Observable.throw(error.json()))
	}

    addRulebook(ruleBook) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const body = JSON.stringify(ruleBook);
        return this._http.post(this._url + "/ruleBook/", body, { headers: headers, search: this._commonService.getTokenAsParm() })
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()))
	}
    
    updateRulebook(ruleBook) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const body = JSON.stringify(ruleBook);
        return this._http.put(this._url + "/ruleBook/" + ruleBook.id, body, { headers: headers, search: this._commonService.getTokenAsParm() })
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()))
	}
    
    deleteRulebook(ruleBookId) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this._http.delete(this._url + "/ruleBook/" + ruleBookId, { headers: headers, search: this._commonService.getTokenAsParm() })
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()))

    }

	
	
}