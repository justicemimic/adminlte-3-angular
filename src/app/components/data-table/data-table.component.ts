import {Component, OnInit} from '@angular/core';
import {User} from '../../@models/user.model';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
@Component({
    selector: 'app-datatable',
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.css']
})
export class DatatableComponent implements OnInit {
    rows: User[] = [];
    searchValue = '';
    sortColumn = '';

    ngOnInit(): void {
        this.rows = [
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
        ];
    }

    updateFilter(event: any) {
        const val = event.target.value.toLowerCase();

        // filter our data
        const temp = this.rows.filter((d: any) => {
            return (
                d.name.toLowerCase().indexOf(val) !== -1 ||
                d.email.toLowerCase().indexOf(val) !== -1 ||
                d.phone.toLowerCase().indexOf(val) !== -1 ||
                !val
            );
        });

        // update the rows
        this.rows = temp;
    }

    updateSort(column: string) {
        this.sortColumn = column;
    }
}
