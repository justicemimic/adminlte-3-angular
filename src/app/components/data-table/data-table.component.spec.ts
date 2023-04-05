import {Component, OnInit} from '@angular/core';
declare var $: any;

@Component({
    selector: 'app-datatable',
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.css']
})
export class DatatableComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {
        $(document).ready(function () {
            $('#example').DataTable();
        });
    }
}
