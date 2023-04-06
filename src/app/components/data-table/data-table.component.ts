import {Component, OnInit} from '@angular/core';
import {User} from '../../@models/user.model';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';

@Component({
    selector: 'app-datatable',
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.css']
})
export class DatatableComponent implements OnInit {
    originalRows: User[] = [];
    rows: User[] = [];
    searchValue = '';
    sortColumn = '';

    ngOnInit(): void {
        this.originalRows = [
            {
                id: 1,
                name: '王大明',
                email: 'john.doe@example.com',
                phone: '082-333-214'
            },
            {
                id: 2,
                name: '陳大名',
                email: 'jane.smith@example.com',
                phone: '02-567-891'
            },
            {
                id: 3,
                name: '李小美',
                email: 'bob.johnson@example.com',
                phone: '01-313-345'
            },
            {
                id: 4,
                name: '辰字號',
                email: 'mary.brown@example.com',
                phone: '03-789-123'
            },
            {
                id: 5,
                name: '金城武',
                email: 'david.lee@example.com',
                phone: '04-890-345'
            }
        ];
        this.rows = this.originalRows;
    }

    updateFilter(event: any) {
        const val = event.target.value.toLowerCase();

        // filter our data
        const temp = this.originalRows.filter((d: any) => {
            return (
                d.name.toLowerCase().indexOf(val) !== -1 ||
                d.email.toLowerCase().indexOf(val) !== -1 ||
                d.phone.toLowerCase().indexOf(val) !== -1 ||
                !val
            );
        });

        this.rows = temp;
    }

    updateSort(column: string) {
        this.sortColumn = column;
    }
}
