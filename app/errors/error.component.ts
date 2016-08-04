// standard for all components
import {Component, OnInit} from "@angular/core";
import {ErrorService} from "./error.service";

// required for this component
import {Error} from "./error";

@Component({
    selector: 'my-error',
    templateUrl: 'app/errors/error.component.html'
})

export class ErrorComponent implements OnInit {

    errorDisplay = 'none';
    errorData: Error;

    constructor(private _errorService: ErrorService) { }

    ngOnInit() {
        this._errorService.errorOccurred.subscribe(
            errorData => {
                this.errorData = errorData;
                this.errorDisplay = 'block';
            }
        );
    }

    onErrorHandled() {
        this.errorDisplay = 'none';
    }

}