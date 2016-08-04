"use strict";
// standard for all components
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import {CORE_DIRECTIVES} from '@angular/common'
import { ErrorService } from ".././errors/error.service";
import { SpinnerComponent} from '../shared/helpers/spinner.component';
import { PaginationComponent } from '../shared/helpers/pagination.component';
import { Location } from '@angular/common';

// required for this component
import { RouterLink } from '@angular/router-deprecated';
import { Router, RouteParams } from '@angular/router-deprecated';
import { UserService } from './user.service';
import { ProfileService } from '../profiles/profile.service';
import { LanguageService } from '../languages/language.service';
import { TableSimpleComponent } from '../shared/helpers/tableSimple.component'

@Component({
    selector: 'users',
    templateUrl: 'app/users/users.component.html',
    providers: [UserService, ProfileService, LanguageService],
    directives: [RouterLink, SpinnerComponent, TableSimpleComponent, PaginationComponent, CORE_DIRECTIVES]
})
export class UsersComponent implements OnInit {

    @Input() modeInput: string;
    @Input() modalInput: string;

    modalClass: string = "";
    modalDisplay: string = "";
    allDisplay: string = "";

    title: string;
    mode: string;
    modal: string;
    users = [];
    pagedUsers = [];
    profiles = [];
    languages = [];
    usersLoading;
    pageSize = 10;
    preButtons: any[] = [];
    columns: any[] = [];
    buttons: any[] = [];

    //variable: '<a  class=\"btn btn-primary\"' + 'href="/users/' + '{{object.id}} ' + '">' + ' <span class=\"glyphicon glyphicon-edit\"></span></a>',
    sorting: any = {
        column: 'firstName',
        descending: false
    };


    constructor(
        private _router: Router,
        private _routeParams: RouteParams,
        private _userService: UserService,
        private _errorService: ErrorService,
        private _profileService: ProfileService,
        private _languageService: LanguageService,
        private _location: Location) {


    }
    ngOnInit() {
        this.setupForm();
        this.loadProfiles();
        this.loadLanguages();
        this.loadUsers();
    }


    private setupForm() {

        // set up form

        //check mode not passed from calling component @input
        if (_.contains(['workwith', 'display', 'select'], this.modeInput)) {
            this.mode = this.modeInput;
        } else {
            this.mode = this._router.root.currentInstruction.component.params['mode'];
            if (!_.contains(['workwith', 'display', 'select'], this.mode)) {
                this.mode = 'display';
            }
        }

        //check modal not passed from calling component @input
        if (_.contains(['true', 'false'], this.modalInput)) {
            this.modal = this.modalInput
        } else {
            this.modal = this._router.root.currentInstruction.component.params['modal'];
        }
 
        if (this.modal === "true") {
            this.modalClass = "modal"
            this.modalDisplay = 'block'
            this.allDisplay = 'block'
        } else {
            this.modalClass = ""
            this.modalDisplay = 'none'
            this.allDisplay = 'block'
        }

        //set up table columns
        this.columns.push(
            {
                display: 'Name',
                variable: 'firstName',
                filter: 'text'
            },
            {
                display: 'Email',
                variable: 'email',
                filter: 'text'
            }
        );

        if (this.mode != 'select') {
            this.columns.push({
                display: 'Address',
                variable: 'addressLine1',
                filter: 'text'
            });
        }

        //set up table buttons
        this.buttons.push(
            {
                action: 'view',
                display: 'View',
                router: 'ViewUser'
            }
        );

        if (this.mode === 'select') {
            this.preButtons.push({
                action: 'select',
                display: 'Select',
                router: 'SelectUser'
            });
        }

        if (this.mode === 'workwith') {
            this.buttons.push({
                action: 'edit',
                display: 'Edit',
                router: 'EditUser'
            });
            this.buttons.push({
                action: 'delete',
                display: 'Delete',
                router: 'DeleteUser'
            }
            );
        }

        //set title
        if (this.mode === 'select') {
            this.title = "Select a User"
        }
        if (this.mode === 'display') {
            this.title = "Display Users"
        }
        if (this.mode === 'workwith') {
            this.title = "Work With Users"
        }

    }

    private loadProfiles() {
        this._profileService.getProfiles()
            .subscribe(
            data => this.handleData('loadProfiles', data),
            error => this.handleError('loadProfiles', error, 0, null),
            () => this.handleSuccess('loadProfiles')
            );
    }

    private loadLanguages() {
        this._languageService.getLanguages()
            .subscribe(
            data => this.handleData('loadLanguages', data),
            error => this.handleError('loadLanguages', error, 0, null),
            () => this.handleSuccess('loadLanguages')
            );
    }

    private loadUsers(filter?) {
        this.usersLoading = true;
        this._userService.getUsers(filter)
            .subscribe(
            data => this.handleData('getUsers', data),
            error => this.handleError('getUsers', error, 0, null),
            () => this.handleSuccess('getUsers')
            )

    }

    selectandClose(selection) {
 
        if (_.contains(['true'], this.modalInput)) {
            this.modalClass = ""
            //this.modal === ""
            this.modalDisplay = 'none';
        } else {
            this._location.back();
        }
        // this.modalDisplay = 'none';
        //this.mode = "";
    }

    close() {
        debugger;

        if (_.contains(['true'], this.modalInput)) {
            this.modal = "false"
            this.modalDisplay = 'none';
            this.allDisplay = 'none';
            this.modalClass = ""
        } else {
            this._location.back();
        }
       // if (_.contains(['true', 'false'], this.modalInput)) {
       //     this.modalClass = "container"
       //     this.modalDisplay = 'none';
       //     this.modal = "false"
       // } else {
       //     this._location.back();
       // }
   
    }
    private reLoadPage(profile, language, q) {

        profile.value = "";
        language.value = "";
        q.value = "";

        this.loadUsers();

    }

    private reloadUsers(filter) {
        this.loadUsers(filter);
    }

    private onPageChanged(page) {
        var startIndex = (page - 1) * this.pageSize;
        this.pagedUsers = _.take(_.rest(this.users, startIndex), this.pageSize);
    }

    private handleError(process, error: any, index, user) {
        console.log("handle error");
        this._errorService.handleError(error);
    }

    private handleData(process, data: any) {
        console.log("handle data");
        console.log(data);
        if (process === 'getUsers') {
            this.users = data;
            this.pagedUsers = _.take(this.users, this.pageSize);
        }
        if (process === 'loadProfiles') {
            this.profiles = data;
        }
        if (process === 'loadLanguages') {
            this.languages = data;
        }

    }

    private handleSuccess(process) {
        this.usersLoading = false
        console.log("handle success");
    }

}