// standard for all components
import { Component, OnInit } from '@angular/core';
import { ErrorService } from ".././errors/error.service";

// required for this component
import { RouterLink } from '@angular/router-deprecated';
import { UserService } from './user.service';

@Component({
    templateUrl: 'app/users/users.component.html',
    providers: [UserService],
    directives: [RouterLink]
})
export class UsersComponent implements OnInit {

    users: any[];
    
    constructor(
        private _userService: UserService,
        private _errorService: ErrorService)
        {}

	ngOnInit(){
		this._userService.getUsers()
            //.subscribe(users => this.users = users);
            .subscribe(
                    data => this.handleData('getUsers',data),
                    error => this.handleError('getUsers',error,0,null),
                    () => this.handleSuccess('getUsers')
                )
        	} 
    
    deleteUser(user){
        if (confirm("Are you sure you want to delete " + user.firstName + user.lastName + "?")) {
            var index = this.users.indexOf(user)
            this.users.splice(index, 1);
            this._userService.deleteUser(user.id)
                .subscribe(
                data => this.handleData('deleteUser',data),
                error => this.handleError('deleteUser',error, index, user),
                () => this.handleSuccess('deleteUser')
            );
        }
    }

    handleError(process,error: any, index, user) {
        console.log("handle error");
        if (process == 'deleteUser') {
            this.users.splice(index, 0, user);
        }
        this._errorService.handleError(error);
    }

    handleData(process,data: any) {
        console.log("handle data");
        console.log(data);
        this.users = data;
 
    }

    handleSuccess(process) {
        console.log("handle success");
    }

}