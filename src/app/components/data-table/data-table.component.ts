import {Component, OnInit} from '@angular/core';

declare var $: any;
import {User} from '../../@models/user.model';
@Component({
    selector: 'app-datatable',
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.css']
})
export class DatatableComponent implements OnInit {
    constructor() {}
    users: User[] = [];
    searchValue = '';
    sortColumn = '';
    ngOnInit(): void {
        (this.users = [
            {
                id: 1,
                name: 'John Doe',
                email: 'john.doe@example.com',
                phone: '123-456-7890'
            },
            {
                id: 2,
                name: 'Jane Smith',
                email: 'jane.smith@example.com',
                phone: '234-567-8901'
            },
            {
                id: 3,
                name: 'Bob Johnson',
                email: 'bob.johnson@example.com',
                phone: '345-678-9012'
            },
            {
                id: 4,
                name: 'Mary Brown',
                email: 'mary.brown@example.com',
                phone: '456-789-0123'
            },
            {
                id: 5,
                name: 'David Lee',
                email: 'david.lee@example.com',
                phone: '567-890-1234'
            }
        ]),
            $(document).ready(function () {
                $('#example').DataTable();
            });
    }
}
