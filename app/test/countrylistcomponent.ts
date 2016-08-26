import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core'
import { DataService } from './dataservice';
import { Country } from './country';
import { State } from './state';

@Component({
    selector: 'my-country-list',
    templateUrl: 'app/test/countrylistcomponent.html',
    providers: [DataService]
})
export class CountryListComponent implements OnInit{
    @Input() InputDependant: number;
    selectedCountry: Country = new Country(0, 'India');
    countries: Country[];
    states: State[];

    dependant: number;

    constructor(private _dataService: DataService) {
        this.countries = this._dataService.getCountries();
    }

    ngOnInit() {

        this.dependant = this.InputDependant;
    }
    onSelect(countryid) {
        this.states = this._dataService.getStates().filter((item) => item.countryid == countryid);
    }


}
