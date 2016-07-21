 
// standard for all components
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ControlGroup, Validators } from '@angular/common';
import { CanDeactivate, Router, RouteParams } from '@angular/router-deprecated';
import { FocusDirective } from '../shared/directives/focus.directive';
import { ConstantsService } from   '../shared/helpers/constants.service';
import { ErrorService } from ".././errors/error.service";
import { SpinnerComponent } from '../shared/helpers/spinner.component';
import { CommonService } from   '../shared/helpers/common.service';

import { Control } from "@angular/common";


// required for this component
import { ClientValidators } from '../shared/validators/client.validators';
import { UserService } from './user.service';
import { User } from './user';

@Component({
    templateUrl: 'app/users/user-form.component.html',
    providers: [UserService],
    directives: [SpinnerComponent, FocusDirective]
})
export class UserFormComponent implements OnInit, CanDeactivate {
    form: ControlGroup;
    title: string;
    mode: string;

    // create the controls
    firstName: Control;
    lastName: Control;
    email: Control;
    password: Control;
    phone: Control;
    addressLine1: Control;
    addressLine2: Control;
    addressLine3: Control;
    addressLine4: Control;

    // create a new instance 
    user = new User(null, "", "", "", "", "", "", "", "", "");

    constructor(
        fb: FormBuilder,
        private _router: Router,
        private _routeParams: RouteParams,
        private _userService: UserService,
        private _errorService: ErrorService
    ) {

        // determine what mode the form is in
        if (_router.root.currentInstruction.component.urlPath === "users/new") {
            this.mode = "new";
        } else {
            this.mode = "edit";
        }

        // set up the field validators
        if (this.mode === "new") {

            this.firstName = new Control('',
                Validators.compose([
                    Validators.required,
                    ClientValidators.isEmpty,
                    ClientValidators.outOfRange50
                ])),
                this.lastName = new Control('',
                    Validators.compose([
                        Validators.required,
                        ClientValidators.isEmpty,
                        ClientValidators.outOfRange50
                    ])),
                this.email = new Control('',
                    Validators.compose([
                        Validators.required,
                        ClientValidators.isEmpty,
                        ClientValidators.containsSpace,
                        ClientValidators.invalidEmailAddress,
                        ClientValidators.outOfRange50
                    ])),
                this.password = new Control('',
                    Validators.compose([
                        Validators.required,
                        ClientValidators.isEmpty,
                        ClientValidators.outOfRange50,
                        ClientValidators.containsSpace,
                        ClientValidators.invalidPassword
                    ])),
                this.phone = new Control('',
                    Validators.compose([
                        ClientValidators.outOfRange50
                    ])),
                this.addressLine1 = new Control('',
                    Validators.compose([
                        ClientValidators.outOfRange50
                    ])),
                this.addressLine2 = new Control('',
                    Validators.compose([
                        ClientValidators.outOfRange50
                    ])),
                this.addressLine3 = new Control('',
                    Validators.compose([
                        ClientValidators.outOfRange50
                    ])),
                this.addressLine4 = new Control('',
                    Validators.compose([
                        ClientValidators.outOfRange50
                    ]))
        } else {

            this.password = new Control('');
            this.firstName = new Control('');
            this.lastName = new Control('');
            this.email = new Control('');
            this.password = new Control('');
            this.phone = new Control('');
            this.addressLine1 = new Control('');
            this.addressLine2 = new Control('');
            this.addressLine3 = new Control('');
            this.addressLine4 = new Control('');

        }

        // set up the form design
        this.form = fb.group({

            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
            phone: this.phone,
            addressLine1: this.addressLine1,
            addressLine2: this.addressLine2,
            addressLine3: this.addressLine3,
            addressLine4: this.addressLine4,
            address: fb.group({
                addressLine1: this.addressLine1,
                addressLine2: this.addressLine2,
                addressLine3: this.addressLine3,
                addressLine4: this.addressLine4
            })
        });
    }

    ngOnInit() {

        var id = this._routeParams.get("id");
        this.title = id ? "Edit User" : "New User";

        if (!id)
            return;

        this._userService.getUser(id)
            .subscribe(
            data => this.handleData(data),
            error => this.handleError(error),
            () => this.handleSuccess('getUser')
            );
    }

    routerCanDeactivate() {

        if (this.form.dirty)
            return confirm('You have unsaved changes. Are you sure you want to navigate away?');

        return true;
    }

    save() {

        if (this.user.id)
            this._userService.updateUser(this.user)
                .subscribe(
                data => this.handleData(data),
                error => this.handleError(error),
                () => this.handleSuccess('updateUser')
                );
        else
            this._userService.addUser(this.user)
                .subscribe(
                data => this.handleData(data),
                error => this.handleError(error),
                () => this.handleSuccess('addUser')
                );

    }


    handleError(error: any) {
        console.log("handle error");
        this._errorService.handleError(error);
    }

    handleData(data: any) {
        console.log("handle data");
        console.log(data);
        this.user = data;
    }

    handleSuccess(process) {
        console.log("handle success");
        // Ideally, here we'd want:
        // this.form.markAsPristine();
        if (process != 'getUser') {
            this._router.navigate(['Users']);
        }
    }
    
}