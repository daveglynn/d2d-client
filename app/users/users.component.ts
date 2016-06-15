import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router-deprecated';

import {UserService} from './user.service';

@Component({
    templateUrl: 'app/users/users.component.html',
    providers: [UserService],
    directives: [RouterLink]
})
export class UsersComponent implements OnInit {
    users: any[];
    
    constructor(private _service: UserService){
	}

	ngOnInit(){
		this._service.getUsers()
            //.subscribe(users => this.users = users);
            .subscribe(
                    data => this.handleData(data),
                    error => this.handleError(error),
                    () => this.handleSuccess()
                )
        	} 
    
    deleteUser(user){
        if (confirm("Are you sure you want to delete " + user.firstName + user.lastName +"?")) {
			var index = this.users.indexOf(user)
			// Here, with the splice method, we remove 1 object
            // at the given index.
            this.users.splice(index, 1);

			this._service.deleteUser(user.id)
				.subscribe(null, 
					err => {
						alert("Could not delete the user.");
                        // Revert the view back to its original state
                        // by putting the user object at the index
                        // it used to be.
						this.users.splice(index, 0, user);
					});
		}
    }


    handleError(error: any) {
        console.log("handle error");
        //this._errorService.handleError(error);
    }

    handleData(data: any) {
        console.log("handle data");
        console.log(data);
        this.users = data;
 
    }

    handleSuccess() {
        console.log("handle success");
    }

}