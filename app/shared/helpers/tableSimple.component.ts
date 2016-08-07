import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core'
import {OrderBy} from ".././pipes/orderBy.pipe"
import {Format} from ".././pipes/format.pipe"
import { RouterLink } from '@angular/router-deprecated';
import { Router, RouteParams } from '@angular/router-deprecated';

@Component({
    selector: 'table-simple',
    templateUrl: 'app/shared/helpers/tableSimple.component.html',
    pipes: [OrderBy, Format],
    directives: [RouterLink]
})
export class TableSimpleComponent implements OnInit {
    @Input() InputModal: string;
    @Input() preButtons: any[];
    @Input() columns: any[];
    @Input() buttons: any[];
    @Input() data: any[];
    @Input() sort: any;

    modal: string
    @Output() OutputButtonSelectClick = new EventEmitter();

    constructor(
        private _router: Router,
        private _routeParams: RouteParams
    ) {
    
    }

    ngOnInit() {
          this.modal = this.InputModal;
    }

    selectedClass(columnName): string {

        return columnName == this.sort.column ? 'sort-' + this.sort.descending : "false";
    }

    changeSorting(columnName): void {
        var sort = this.sort;
        if (sort.column == columnName) {
            sort.descending = !sort.descending;
        } else {
            sort.column = columnName;
            sort.descending = false;
        }
    }

    convertSorting(): string {
        return this.sort.descending ? '-' + this.sort.column : this.sort.column;
    }

    selectAndClose(selection) {
        this.OutputButtonSelectClick.next(selection);
    }

}