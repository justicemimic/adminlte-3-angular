import {ComponentFixture, TestBed} from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';
import {DatatableComponent} from './datatable.component';

import {UserService} from './user.service';

describe('DatableComponent', () => {
    let component: DatatableComponent;
    let fixture: ComponentFixture<DatatableComponent>;
    let httpMock: HttpTestingController;
    let userService: UserService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [DatatableComponent],
            providers: [UserService]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DatatableComponent);
        component = fixture.componentInstance;
        userService = TestBed.inject(UserService);
        httpMock = TestBed.inject(HttpTestingController);
        fixture.detectChanges();
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should fetch users on init', () => {
        const users = [
            {id: 1, name: 'John'},
            {id: 2, name: 'Alice'}
        ];
        const req = httpMock.expectOne('https://my.api.com/users');
        expect(req.request.method).toBe('GET');
        req.flush(users);
        expect(component.users).toEqual(users);
    });

    it('should delete user', () => {
        const users = [
            {id: 1, name: 'John'},
            {id: 2, name: 'Alice'}
        ];
        component.users = users;
        const userToDelete = users[0];
        const spy = spyOn(userService, 'deleteUser').and.returnValue(
            Promise.resolve()
        );
        component.deleteUser(userToDelete);
        expect(spy).toHaveBeenCalledWith(userToDelete.id);
        expect(component.users.length).toBe(1);
        expect(component.users).not.toContain(userToDelete);
    });
});
