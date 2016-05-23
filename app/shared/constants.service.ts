'use strict'
import {Injectable} from "@angular/core";

@Injectable()

export class ConstantsService {

     defaultInputBackColor: string = 'white';
     onFocusInputBackColor: string = '#E4FFE0';

     redirectAfterSignup: string = "/auth/signin";

}