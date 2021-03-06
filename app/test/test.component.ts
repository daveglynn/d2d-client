﻿//our root app component
import {Component} from '@angular/core'
import {Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CountryListComponent } from './countrylistcomponent';

import {CORE_DIRECTIVES} from '@angular/common'
import {TableSortable} from './tableSortable'
import { UsersComponent } from '../security/users/users.component'


@Component({
    selector: 'my-app',
    templateUrl: 'app/test/test.html',
    directives: [CORE_DIRECTIVES, TableSortable, UsersComponent, CountryListComponent]
})

export class TestComponent implements OnInit{
    constructor(
    ) { }

    componentToOpen: string = "";
    componentSelectedValue: string = "";
    componentOpenUsers: boolean = false;
    componentOpenTests: boolean = false;

    selectedUserId: string = "";
    selectedUserName: string = "";
    selectedTestId: string = "";
    selectedTestName: string = "";

    rows: any[] = [
        {
            Name: 'Data 1',
            Amount: 100.23,
            Date: 1433588216000
        },
        {
            Name: 'Data 2',
            Amount: 0.875623,
            Date: 1432387616000
        },
        {
            Name: 'Data 3',
            Amount: .010123,
            Date: 1461820116000
        },
        {
            Name: 'Data 4',
            Amount: 1873.02301,
            Date: 1423128616000
        },
        {
            Name: 'Data 5',
            Amount: -93,
            Date: 1439220116000
        }
    ];
    columns: any[] = [
        {
            display: 'Column 1', //The text to display
            variable: 'Name', //The name of the key that's apart of the data array
            filter: 'text' //The type data type of the column (number, text, date, etc.)
        },
        {
            display: 'Column 2', //The text to display
            variable: 'Amount', //The name of the key that's apart of the data array
            filter: 'decimal : 1.0-2' //The type data type of the column (number, text, date, etc.)
        },
        {
            display: 'Column 3', //The text to display
            variable: 'Date', //The name of the key that's apart of the data array
            filter: 'dateTime' //The type data type of the column (number, text, date, etc.)
        }
    ];
    sorting: any = {
        column: 'Name', //to match the variable of one of the columns
        descending: false
    };

    
    ngOnInit() {
     }

    openComponent(componentName) {

        if (componentName === "users") {
            this.componentOpenUsers = true;
        }
        if (componentName === "tests") {
            this.componentOpenTests = true;
        }
    }

 
    closeComponent(selection, componentName) {

        if (componentName === "users") {
            this.componentOpenUsers = false;
            if (selection != null) {
                this.selectedUserId = selection.id
                this.selectedUserName = selection.firstName + " " + selection.lastName
            }
        }
        if (componentName === "tests") {
            this.componentOpenTests = false;
            if (selection != null) {
                this.selectedTestId = selection.id
                this.selectedTestName = selection.firstName + " " + selection.lastName
            }
        }

    }
 

}


