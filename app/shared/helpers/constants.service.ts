'use strict'
import {Injectable} from "@angular/core";

@Injectable()

export class ConstantsService {

     transferProtocol: string = "http://"

     serverUrl: string = this.transferProtocol + "d2d-demo.herokuapp.com";

     defaultInputBackColor: string = 'white';
     onFocusInputBackColor: string = '#E4FFE0';

     redirectAfterSignup: string = "/auth/signin";
     redirectAfterSignin: string = "/"

}