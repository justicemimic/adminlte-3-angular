import {AppState} from '@/store/state';
import {UiState} from '@/store/ui/state';
import {Component, HostBinding, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppService} from '@services/app.service';
import {Observable} from 'rxjs';
import $ from 'jquery';

const BASE_CLASSES = 'main-sidebar elevation-4';
@Component({
    selector: 'app-menu-sidebar',
    templateUrl: './menu-sidebar.component.html',
    styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit {
    @HostBinding('class') classes: string = BASE_CLASSES;
    public ui: Observable<UiState>;
    public user;
    public menu = MENU;

    constructor(
        public appService: AppService,
        private store: Store<AppState>
    ) {}

    ngOnInit(): void {
        this.ui = this.store.select('ui');
        this.ui.subscribe((state: UiState) => {
            this.classes = `${BASE_CLASSES} ${state.sidebarSkin}`;
        });
        this.user = this.appService.user;
        $('#loginByAuth').click(() => {
            alert('登出');
        });
    }

    async loginByAuth() {
        await this.appService.logout();
    }
}

export const MENU = [
    {
        name: 'Dashboard',
        iconClasses: 'fas fa-tachometer-alt',
        path: ['/']
    },
    {
        name: 'Blank',
        iconClasses: 'fas fa-file',
        path: ['/blank']
    },
    {
        name: 'Main Menu',
        iconClasses: 'fas fa-folder',
        children: [
            {
                name: 'Sub Menu',
                iconClasses: 'far fa-address-book',
                path: ['/sub-menu-1']
            },
            {
                name: 'Blank',
                iconClasses: 'fas fa-file',
                path: ['/sub-menu-2']
            }
        ]
    }
];
