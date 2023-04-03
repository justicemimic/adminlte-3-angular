import {Component} from '@angular/core';

@Component({
    selector: 'app-datatable',
    templateUrl: './datatable.component.html',
    styleUrls: ['./datatable.component.css']
})
export class DatatableComponent {
    rows = [
        {name: 'John', age: 25},
        {name: 'Jane', age: 24},
        {name: 'Jim', age: 26}
    ];

    columns = [{prop: 'name'}, {name: 'Age', prop: 'age'}];
}
