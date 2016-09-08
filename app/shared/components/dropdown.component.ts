import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core'
import { ItemService } from "../../master/items/item.service";
import { DropDownParent } from "../../master/items/item";
import { DropDownChild } from "../../master/items/item";
import { ErrorService } from "../.././errors/error.service";

@Component({
    selector: 'dropdown',
    templateUrl: 'app/shared/components/dropdown.component.html',
    providers: [ItemService]
})
export class DropDownComponent implements OnInit {
    @Input() InputObject: string;
    @Input() InputDependant: number;
    @Input() InputList: number;
    @Input() InputParent: number;
    @Input() InputParentName: string;
    @Input() InputChild: number;
    @Input() InputChildName: string;
    
    selectedParent: DropDownParent = new DropDownParent(0, '');
    selectedChild: DropDownChild = new DropDownChild(0, 0, '');

    parents: DropDownParent[];
    children: DropDownChild[];

    object: string;
    dependant: number;
    list: number;

    parentsLoaded: boolean = false;
    childrenLoaded: boolean = false;

    dropDownLoading;

    constructor(private _itemService: ItemService, private _errorService: ErrorService) {
        this.dropDownLoading = true;
    }

    ngOnInit() {
        debugger;
        this.dependant = this.InputDependant;
        this.list = this.InputList;
        this.object = this.InputObject;

        if (this.list != 0) {

            if (this.InputParent != 0) {
                this.selectedParent.parentId = this.InputParent;
                this.selectedParent.name = this.InputParentName;
                this.parents = [];
                this.parents.push(new DropDownParent(this.selectedParent.parentId, this.selectedParent.name));

                this.selectedParent.name = this.InputParentName;
                if (this.InputChild != 0) {
                    this.selectedChild.parentId = this.InputParent;
                    this.selectedChild.childId = this.InputChild;
                    this.selectedChild.name= this.InputChildName;
                    this.children = [];
                    this.children.push(new DropDownChild(this.selectedChild.childId, this.selectedChild.parentId, this.selectedChild.name));
                }
            }
        }
    }

    loadParent(list) {

        this.getParent(list)

    }

    getParent(list) {
        debugger;
        if (this.object == 'item') {
            if (this.parentsLoaded == false) {
                this.parentsLoaded == true
                this._itemService.getItemsByListId(list)
                    .subscribe(
                    data => this.handleData('getItemsByListId', data, null),
                    error => this.handleError('getItemsByListId', error),
                    () => this.handleSuccess('getItemsByListId')
                    );
            }
        } else {
            if (this.parentsLoaded == false) {
                this.parentsLoaded == true
                this._itemService.getItemsByObjectId(this.object,list)
                    .subscribe(
                    data => this.handleData('getItemsByListId', data, null),
                    error => this.handleError('getItemsByListId', error),
                    () => this.handleSuccess('getItemsByListId')
                    );
            }
        }

    }

    onSelect(parentId) {

        this.getChildren(parentId);
    }

    getChildren(parentId) {

        if (this.childrenLoaded == false) {
            this.childrenLoaded == true
            this._itemService.getItemsByParentListId(parentId)
                .subscribe(
                data => this.handleData('getItemsByParentListId', data, parentId),
                error => this.handleError('getItemsByParentListId', error),
                () => this.handleSuccess('getItemsByParentListId')
                );
        }
    }

    handleError(process, error: any) {

        this.dropDownLoading = false;
        if (error.message != "error.json is not a function") {
            this._errorService.handleError(error);
        }
        console.log("handle error");
        this._errorService.handleError(error);
    }

    handleData(process, data: any, parentId) {
        debugger;
        this.dropDownLoading = false;
        console.log("handle data");
        console.log(data);
        if (process === 'getItemsByListId') {
            this.parents = [];
            for (let i in data) {
                console.log(data[i].name);
                this.parents.push(new DropDownParent(data[i].id, data[i].name));
            }
        }
        if (process === 'getItemsByParentListId') {
            this.children = [];
            for (let i in data) {
                console.log(data[i].name);
                this.children.push(new DropDownChild(data[i].id, parentId, data[i].name));
            }
        }
    }

    handleSuccess(process) {
        this.dropDownLoading = false;
        console.log("handle success");
    }

}
