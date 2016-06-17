'use strict'
import {Injectable} from "@angular/core";
import {URLSearchParams} from '@angular/http';
import { LocalData } from '../shared/common';

@Injectable()

export class CommonService {

    getToken( ) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('Auth', localStorage.getItem('token'));
        return params;
    }

    clearLocalStorage() {
        localStorage.clear();
    }

    setLocalStorage(localData: LocalData) {
        localStorage.setItem('token', localData.token);
        localStorage.setItem('userId', localData.userId);
        localStorage.setItem('firstName', localData.firstName);
        localStorage.setItem('lastName', localData.lastName);
        localStorage.setItem('email', localData.email);
    }
    
}