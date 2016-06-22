// standard for all components
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ControlGroup, Validators } from '@angular/common';
import { CanDeactivate, Router, RouteParams } from '@angular/router-deprecated';
import { FocusDirective } from '../shared/directives/focus.directive';
import { ConstantsService } from   '../shared/helpers/constants.service';
import { ErrorService } from ".././errors/error.service";
import { SpinnerComponent } from '../shared/helpers/spinner.component';
import { CommonService } from   '../shared/helpers/common.service';


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
 
    user = new User("", "","", "", "", "", "", "", "");
 
	constructor(
        fb: FormBuilder,
        private _router: Router,
        private _routeParams: RouteParams,
        private _userService: UserService,
        private _errorService: ErrorService
    ) {
		this.form = fb.group({

            firstName: ['', Validators.compose([
                ClientValidators.isEmpty,
                ClientValidators.outOfRange50
            ])],
            lastName: ['', Validators.compose([
                ClientValidators.isEmpty,
                ClientValidators.outOfRange50
            ])],
            email: ['', Validators.compose([
                ClientValidators.isEmpty,
                ClientValidators.outOfRange50,
                ClientValidators.containsSpace,
                ClientValidators.invalidEmailAddress
            ])],
            phone: ['', Validators.compose([
                ClientValidators.outOfRange50
            ])],
			address: fb.group({
                addressLine1: ['', Validators.compose([
                    ClientValidators.outOfRange50
                ])],
                addressLine2: ['', Validators.compose([
                    ClientValidators.outOfRange50
                ])],
                addressLine3: ['', Validators.compose([
                    ClientValidators.outOfRange50
                ])],
                addressLine4: ['', Validators.compose([
                    ClientValidators.outOfRange50
                ])],
			})
		});
	}
    
    ngOnInit(){
        var id = this._routeParams.get("id");
        
        this.title = id ? "Edit User" : "New User";
        
        if (!id)
			return;

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
        console.log("handle error");
        this._errorService.handleError(error);
    }

    handleData(data: any) {
        console.log("handle data");
        console.log(data);
        this.user = data;
    }

    handleSuccess() {
        console.log("handle success");
    }


}