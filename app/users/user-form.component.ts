
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

    // form variables
    form: ControlGroup;
    title: string;
    mode: string;
    userLoading;

    // disablers
    firstName_disabled: boolean = false;
    lastName_disabled: boolean = false;
    email_disabled: boolean = false;
    password_disabled: boolean = false;
    //profileId_disabled: boolean = false;
    phone_disabled: boolean = false;
    addressLine1_disabled: boolean = false;
    addressLine2_disabled: boolean = false;
    addressLine3_disabled: boolean = false;
    addressLine4_disabled: boolean = false;

    // controls
    firstName: Control;
    lastName: Control;
    email: Control;
    password: Control;
    phone: Control;
    //profileId: Control;
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
        if (_router.root.currentInstruction.component.routeName === "AddUser") {
            this.mode = "add";
        } else if (_router.root.currentInstruction.component.routeName === "ViewUser") {
            this.mode = "view";
        } else if (_router.root.currentInstruction.component.routeName === "EditUser") {
            this.mode = "edit";
        } else if (_router.root.currentInstruction.component.routeName === "DeleteUser") {
            this.mode = "delete";
        } else this.mode = "";

        // set up the field validators
        if (this.mode === "add") {

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
        if (this.mode === 'edit') {
            this.title = 'Edit User'
        } else if (this.mode === 'view') {
            this.title = 'View User'
        } else if (this.mode === 'add') {
            this.title = 'Add User'
        } else if (this.mode === 'delete') {
            this.title = 'Delete User'
        }

        // set disablers as required
        //this.firstName_disabled: boolean = false;
        //this.lastName_disabled: boolean = false;
        //this.email_disabled: boolean = false;
        //this.password_disabled: boolean = false;
        //this.phone_disabled: boolean = false;
        //this.addressLine1_disabled: boolean = false;
        //this.addressLine2_disabled: boolean = false;
        //this.addressLine3_disabled: boolean = false;
        //this. addressLine4_disabled: boolean = false;

        //get data if requested
        if (!id)
            return;
        this.userLoading = true;
        this._userService.getUser(id)
            .subscribe(
            data => this.handleData('getUser', data),
            error => this.handleError('getUser', error),
            () => this.handleSuccess('getUser')
        );
        
    }

    routerCanDeactivate() {

        if (this.form.dirty)
            return confirm('You have unsaved changes. Are you sure you want to navigate away?');
        return true;
    }

    save() {
  
        this.userLoading = true;

        if (this.user.id) {

            if (this.mode === 'edit') {
                this._userService.updateUser(this.user)
                    .subscribe(
                    data => this.handleData('updateUser', data),
                    error => this.handleError('updateUser', error),
                    () => this.handleSuccess('updateUser')
                    );
            }
            if (this.mode === 'delete') {
                this._userService.deleteUser(this.user.id)
                    .subscribe(
                    data => this.handleData('deleteUser', data),
                    error => this.handleError('deleteUser', error),
                    () => this.handleSuccess('deleteUser')
                    );
            }

        } else {
            this._userService.addUser(this.user)
                .subscribe(
                data => this.handleData('addUser', data),
                error => this.handleError('addUser', error),
                () => this.handleSuccess('addUser')
                );
        }

    }

    cancel() {
        this._router.navigate(['Users']);
    }

    handleError(process, error: any) {
        this.userLoading = false;
        // this is not an error , but delete request is throwing it. Angular bug
        // therefore treat it as a success
        if (error.message != "error.json is not a function") {
            this._errorService.handleError(error);
        } else {
            this.handleSuccess(process)
        }
        console.log("handle error");
        this._errorService.handleError(error);
    }

    handleData(process, data: any) {
        this.userLoading = false;
        console.log("handle data");
        console.log(data);
        this.user = data;
    }

    handleSuccess(process) {
        this.userLoading = false;
        console.log("handle success");
        // Ideally, here we'd want:
        // this.form.markAsPristine();
        if (process != 'getUser') {
            this._router.navigate(['Users']);
        }
    }

}