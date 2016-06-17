// required for this component
import { bootstrap }    from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { HTTP_PROVIDERS } from '@angular/http';
import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';
import { ConstantsService } from   './shared/helpers/constants.service';
import { CommonService } from   './shared/helpers/common.service';
import { ErrorService } from "./errors/error.service";

bootstrap(AppComponent, [ROUTER_PROVIDERS, HTTP_PROVIDERS, AuthService, ErrorService, ConstantsService, CommonService]);