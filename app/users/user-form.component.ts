// standard for all components
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ControlGroup, Validators } from '@angular/common';
import { CanDeactivate, Router, RouteParams } from '@angular/router-deprecated';
import { ErrorService } from ".././errors/error.service";

// required for this component
import { ClientValidators } from '../shared/validators/client.validators';
import { UserService } from './user.service';
import { User } from './user';

@Component({
    templateUrl: 'app/users/user-form.component.html',
    providers: [UserService]
})
export class UserFormComponent implements OnInit, CanDeactivate {
	form: ControlGroup;
    title: string;
 
    user = new User("", "", "", "", "", "", "", "");
 
	constructor(
        fb: FormBuilder,
        private _router: Router,
        private _routeParams: RouteParams,
        private _userService: UserService,
        private _errorService: ErrorService
    ) {
		this.form = fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.compose([
                Validators.required,
                ClientValidators.containsSpace,
                ClientValidators.invalidEmailAddress
            ])],
			phone: [],
			address: fb.group({
				addressLine1: [],
                addressLine2: [],
                addressLine3: [],
                addressLine4: []
			})
		});
	}
    
    ngOnInit(){
        var id = this._routeParams.get("id");
        
        this.title = id ? "Edit User" : "New User";
        
        if (!id)
			return;
        debugger;
        this._userService.getUser(id)
            .subscribe(
                data => this.handleData(data),
                error => this.handleError(error),
                () => this.handleSuccess()
            );
    }
    
    routerCanDeactivate(){
		if (this.form.dirty)
			return confirm('You have unsaved changes. Are you sure you want to navigate away?');

		return true; 
	}
    
    save(){
        var result;
        
         //if (this.user.id) 
            result = this._userService.updateUser(this.user);
       //  else
       //     result = this._userService.addUser(this.user)
            
		result.subscribe(x => {
            // Ideally, here we'd want:
            // this.form.markAsPristine();
            this._router.navigate(['Users']);
        });
    } 


    handleError(error: any) {
        debugger;
        console.log("handle error");
        this._errorService.handleError(error);
    }

    handleData(data: any) {
        debugger;
        console.log("handle data");
        console.log(data);
        this.user = data;

    }

    handleSuccess() {
        debugger;
        console.log("handle success");
    }


}