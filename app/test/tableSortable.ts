import {Component, Input} from '@angular/core'
import {OrderBy} from "./orderBy"
import {Format} from "./format"
import { RouterLink } from '@angular/router-deprecated';

@Component({
    selector: 'table-sortable',
    templateUrl: 'app/test/tableSortable.html',
    pipes: [OrderBy, Format],
    directives: [RouterLink]
})
export class TableSortable {
    @Input() columns: any[];
    @Input() buttons: any[];
    @Input() data: any[];
    @Input() sort: any;

//    selectedClass(columnName): string {
//        
//          return columnName == this.sort.column ? 'sort-' + this.sort.descending : false;
//    }

  //  selectedClass(column): string {
        //debugger;
        //if (!column.sortable) return '';

   //     return column == this.sort.column ? 'sort-' + (this.sort.descending ? 'desc' : 'asc') : '';
   // }

    selectedClass(columnName): string {
        debugger;
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
}