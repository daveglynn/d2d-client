"use strict";
// standard for all components
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import {CORE_DIRECTIVES} from '@angular/common'
import { ErrorService } from ".././errors/error.service";
import { SpinnerComponent} from '../shared/directives/spinner.component';
import { PaginationComponent } from '../shared/directives/pagination.component';
import { Location } from '@angular/common';
import { CommonService } from   '../shared/helpers/common.service';

// required for this component
import { RouterLink } from '@angular/router-deprecated';
import { Router, RouteParams } from '@angular/router-deprecated';
import { UserService } from './user.service';
import { ProfileService } from '../profiles/profile.service';
import { LanguageService } from '../languages/language.service';
import { TableSimpleComponent } from '../shared/components/tableSimple.component'

@Component({
    selector: 'users',
    templateUrl: 'app/users/users.component.html',
    providers: [UserService, ProfileService, LanguageService],
    directives: [RouterLink, SpinnerComponent, TableSimpleComponent, PaginationComponent, CORE_DIRECTIVES]
})
export class UsersComponent implements OnInit {

    // interface to other components
    @Input() InputMode: string;
    @Input() InputModal: string;
    @Output() OutputButtonCloseClick = new EventEmitter();

    // control template modal
    modalClass: string = "";
    modalDisplay: string = "";
    allDisplay: string = "";

    // this control
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
    sorting: {};

    constructor(
        private _router: Router,
        private _routeParams: RouteParams,
        private _userService: UserService,
        private _errorService: ErrorService,
        private _profileService: ProfileService,
        private _languageService: LanguageService,
        private _location: Location,
        private _commonService: CommonService) {
    }

    ngOnInit() {
        this.setupForm();
        this.loadProfiles();
        this.loadLanguages();
        this.loadUsers();
    }

    private setupForm() {

        //set modal
        this.modalProcessing()

        //set default table sort
        this.sorting = {
            column: 'firstName',
            descending: false
        };

        // setup columns - all modes
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

        //  setup columns - all modes except select
        if (this.mode != 'select') {
            this.columns.push({
                display: 'Address',
                variable: 'addressLine1',
                filter: 'text'
            });
        }

        //  setup left buttons - select mode
        if (this.mode === 'select') {
            this.preButtons.push({
                action: 'select',
                display: 'Select',
                router: "{ 'id' : object.id}"
            });
        }

        // setup right buttons - all modes
        this.buttons.push(
            {
                action: 'view',
                display: 'View',
                router: 'ViewUser'
            }
        );

        // setup right buttons - workwith mode
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

    private modalProcessing() {

        this.mode = this._commonService.setMode(this.InputMode, this._router.root.currentInstruction.component.params['mode'])

        this.modal = this._commonService.setModal(this.InputModal, this._router.root.currentInstruction.component.params['modal'])
        
        if (this.modal === "true") {
            this.modalClass = "modal"
            this.modalDisplay = 'block'
            this.allDisplay = 'block'
        } else {
            this.modalClass = ""
            this.modalDisplay = 'none'
            this.allDisplay = 'block'
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

    private reLoadPage(profile, language, q) {

        profile.value = "";
        language.value = "";
        q.value = "";
       this.loadUsers();
    }

    private reloadUsers(filter) {

        this.loadUsers(filter);
    }

    private selectandClose(selection) {

        this.OutputButtonCloseClick.next(selection);
    }

    private close() {

        if (_.contains(['true'], this.modal)) {
            this.OutputButtonCloseClick.next(null);
        } else {
            this._location.back();
        }
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