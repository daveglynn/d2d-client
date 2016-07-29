"use strict";
// standard for all components
import { Component, OnInit } from '@angular/core';
 
 import {CORE_DIRECTIVES} from '@angular/common'
import { ErrorService } from ".././errors/error.service";
import { SpinnerComponent} from '../shared/helpers/spinner.component';
import { PaginationComponent } from '../shared/helpers/pagination.component';

// required for this component
import { RouterLink } from '@angular/router-deprecated';
import { UserService } from './user.service';
import { ProfileService } from '../profiles/profile.service';
//import { AgGridNg2 } from 'ag-grid-ng2/main';
//import { GridOptions } from 'ag-grid/main';
import {TableSimpleComponent} from '../shared/helpers/tableSimple.component'
 

@Component({
    templateUrl: 'app/users/users.component.html',
    providers: [UserService, ProfileService],
    directives: [RouterLink, SpinnerComponent, TableSimpleComponent, PaginationComponent, CORE_DIRECTIVES]
})
export class UsersComponent implements OnInit {


    users = [];
    pagedUsers = [];
    profiles = [];
    usersLoading;
    pageSize = 10;

  
    columns: any[] = [
        {
            display: 'Name', //The text to display
            variable: 'firstName', //The name of the key that's apart of the data array
            filter: 'text' //The type data type of the column (number, text, date, etc.)
        },
        {
            display: 'Email', //The text to display
            variable: 'email', //The name of the key that's apart of the data array
            filter: 'text' //The type data type of the column (number, text, date, etc.)
        },
        {
            display: 'Address', //The text to display
            variable: 'addressLine1', //The name of the key that's apart of the data array
            filter: 'text' //The type data type of the column (number, text, date, etc.)
        }
    ];
    buttons: any[] = [
        {
            display: 'View',
            router: 'ViewUser'
        },
        {
            display: 'Edit', 
            router: 'EditUser'
        },
        {
            display: 'Delete',
            router: 'DeleteUser'
        }  
    ];
    //variable: '<a  class=\"btn btn-primary\"' + 'href="/users/' + '{{object.id}} ' + '">' + ' <span class=\"glyphicon glyphicon-edit\"></span></a>', 
    sorting: any = {
        column: 'firstName', //to match the variable of one of the columns
        descending: false
    };
 

// columnDefs = [
//     { headerName: "Name", field: "firstName", sort: 'asc' },
//     { headerName: "Email", field: "email" },
//     { headerName: "Address", field: "addressLine1" },
//     {
//         headerName: "Actions",
//         suppressMenu: true,
//         suppressSorting: true,
//         template:
//         `<button type="button" data-action-type="view" class="btn btn-default">
//            View
//          </button>
//
//           <button type="button" data-action-type="remove" class="btn btn-default">
//             Remove
//          </button>`
//      }
//  ];
//
//
//   gridOptions: GridOptions = {
//        columnDefs: this.columnDefs,
//        enableColResize: true,
//        enableSorting: true,
//        enableFilter: true,
//        rowData: null,
//        rowHeight: 40
//    };

    constructor(
        private _userService: UserService,
        private _errorService: ErrorService,
        private _profileService: ProfileService)
    { }

    ngOnInit() {
        this.loadProfiles();
        this.loadUsers();
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

    private reLoadPage(q, p) {

        q.value = "";
        p.value = "";
        this.loadUsers();

    }

    private reloadUsers(filter) {
        this.loadUsers(filter);
    }

    private onPageChanged(page) {
        var startIndex = (page - 1) * this.pageSize;
        this.pagedUsers = _.take(_.rest(this.users, startIndex), this.pageSize);
    }

//    public onRowClicked(e) {
//        if (e.event.target !== undefined) {
//            let data = e.data;
//            let actionType = e.event.target.getAttribute("data-action-type");
//
//            switch (actionType) {
//                case "view":
//                    return this.onActionViewClick(data);
//                case "remove":
//                    return this.onActionRemoveClick(data);
//            }
//        }
//    }

//    public onActionViewClick(data: any) {
//        console.log("View action clicked", data);
//    }

//    public onActionRemoveClick(data: any) {
//        console.log("Remove action clicked", data);
//    }

    private handleError(process, error: any, index, user) {
        console.log("handle error");
        //if (process == 'deleteUser') {
       //     this.users.splice(index, 0, user);
        //}
        this._errorService.handleError(error);
    }

    private handleData(process, data: any) {
        console.log("handle data");
        console.log(data);
        debugger;
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