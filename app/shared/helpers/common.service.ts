"use strict";

import {Injectable} from "@angular/core";
import {URLSearchParams} from '@angular/http';
import { LocalData } from './common';


@Injectable()

export class CommonService {

    getTokenAsParm() {
        let params: URLSearchParams = new URLSearchParams();
        params.set('Auth', localStorage.getItem('token'));
        return params;
    }

    setParms(urlParms) {

        let params: URLSearchParams = new URLSearchParams();
        params.set('Auth', localStorage.getItem('token'));
        _.each(urlParms, function (element, index, list) {
            params.append(String(index), String(element));
        });

        // for (var key in urlParms) {
        //     if (urlParms.hasOwnProperty(key)) {
        //         var obj = urlParms[key];
        //         for (var prop in obj) {
        //             if (obj.hasOwnProperty(prop)) {
        //                 console.log(key + " = " + obj[prop]);
        //                  //params.append(prop, obj[prop]);
        //             }
        //          }
        //     }
        //  }


        return params;
    }

    getToken() {
        return localStorage.getItem('token');
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


    setMode(componentMode: string, urlMode: string) {
        var runMode = 'display';
        if (_.contains(['workwith', 'display', 'select'], componentMode)) {
            runMode = componentMode;
        } else {
            runMode = urlMode;
            if (!_.contains(['workwith', 'display', 'select'], runMode)) {
                runMode = 'display';
            }
        }
        return runMode;
    }

    setModal(componentModal: string, urlModal: string) {
        var runModal = 'false';
        if (_.contains(['true', 'false'], componentModal)) {
            runModal = componentModal;
        } else {
            runModal = urlModal;
            if (!_.contains(['true', 'false'], runModal)) {
                runModal = 'false';
            }
        }
        return runModal;
    }



}
