import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoadingBarService} from '@ngx-loading-bar/core'; // <--- 引入 LoadingBarService
@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(
        private http: HttpClient,
        private loadingBar: LoadingBarService
    ) {}
}
