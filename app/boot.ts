import {bootstrap}    from '@angular/platform-browser-dynamic';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {HTTP_PROVIDERS} from '@angular/http';

import {AppComponent} from './app.component';
import {AuthService} from './auth/auth.service';
import {ConstantsService} from   './shared/constants.service';

bootstrap(AppComponent, [ROUTER_PROVIDERS, HTTP_PROVIDERS, AuthService, ConstantsService]);