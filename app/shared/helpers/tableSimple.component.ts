import {Component, Input} from '@angular/core'
import {OrderBy} from ".././pipes/orderBy.pipe"
import {Format} from ".././pipes/format.pipe"
import { RouterLink } from '@angular/router-deprecated';

@Component({
    selector: 'table-simple',
    templateUrl: 'app/shared/helpers/tableSimple.component.html',
    pipes: [OrderBy, Format],
    directives: [RouterLink]
})
export class TableSimpleComponent {
    @Input() preButtons: any[];
    @Input() columns: any[];
    @Input() buttons: any[];
    @Input() data: any[];
    @Input() sort: any;

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
}