"use strict";
// standard for all components
import { Component, OnInit } from '@angular/core';
import { ErrorService } from ".././errors/error.service";
import { SpinnerComponent} from '../shared/helpers/spinner.component';
import { PaginationComponent } from '../shared/helpers/pagination.component';

// required for this component
import { RouterLink } from '@angular/router-deprecated';
import { UserService } from './user.service';
import { ProfileService } from '../profiles/profile.service';

@Component({
    templateUrl: 'app/users/users.component.html',
    providers: [UserService, ProfileService],
    directives: [RouterLink, SpinnerComponent, PaginationComponent]
})
export class UsersComponent implements OnInit {

 
    users = [];
    pagedUsers = [];
    profiles = [];
    usersLoading;
    pageSize = 10;


    constructor(
        private _userService: UserService,
        private _errorService: ErrorService,
        private _profileService: ProfileService)
    { }

    ngOnInit() {
        this.loadProfiles();
        this.loadUsers();
    }

    private deleteUser(user) {
        if (confirm("Are you sure you want to delete " + user.firstName + user.lastName + "?")) {
            var index = this.users.indexOf(user)
            this.users.splice(index, 1);
            this._userService.deleteUser(user.id)
                .subscribe(
                data => this.handleData('deleteUser', data),
                error => this.handleError('deleteUser', error, index, user),
                () => this.handleSuccess('deleteUser')
                );
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

    private loadUsers(filter?) {
        this.usersLoading = true;
        this._userService.getUsers(filter)
            //.subscribe(users => this.users = users);
            .subscribe(
            data => this.handleData('getUsers', data),
            error => this.handleError('getUsers', error, 0, null),
            () => this.handleSuccess('getUsers')
        )

    }

    reloadUsers(filter) {
        this.loadUsers(filter);
    }

    onPageChanged(page) {
       var startIndex = (page - 1) * this.pageSize;
       this.pagedUsers = _.take(_.rest(this.users, startIndex), this.pageSize);
    }

    private handleError(process, error: any, index, user) {
        console.log("handle error");
        if (process == 'deleteUser') {
            this.users.splice(index, 0, user);
        }
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

    }

    private handleSuccess(process) {
        this.usersLoading = false
        console.log("handle success");
    }

}