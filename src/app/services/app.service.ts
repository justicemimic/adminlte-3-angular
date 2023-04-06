import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Gatekeeper} from 'gatekeeper-client-sdk';
import $ from 'jquery';

import {HttpService} from '../http_service';
export default HttpService;
import {LoadingBarService} from '@ngx-loading-bar/core';
@Injectable({
    providedIn: 'root'
})
export class AppService {
    public user: any = null;

    constructor(
        private router: Router,
        private toastr: ToastrService,
        private http: HttpService,
        private loadingBar: LoadingBarService
    ) {}

    async loginByAuth(fromeval) {
        try {
            const data = {
                AD_account: fromeval.username,
                Password: fromeval.password
            };
            this.http.Post('Login', data).subscribe((res) => {
                if (res.success) {
                    this.user = {
                        picture: res.Permission_module_name,
                        email: res.token
                    };
                    this.toastr.success('登入成功!');
                    localStorage.setItem('token', res.token);
                    this.router.navigateByUrl('/');
                } else {
                    this.toastr.error('登入失敗!');
                }
            });

            this.router.navigate(['/']);
        } catch (error) {
            this.toastr.error(error.message);
        }
        // this.isAuthLoading = false;
    }

    async registerByAuth({email, password}) {
        try {
            const token = await Gatekeeper.registerByAuth(email, password);
            localStorage.setItem('token', token);
            await this.getProfile();
            this.router.navigate(['/']);
            this.toastr.success('Register success');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async loginByGoogle() {
        try {
            const token = await Gatekeeper.loginByGoogle();
            localStorage.setItem('token', token);
            await this.getProfile();
            this.router.navigate(['/']);
            this.toastr.success('Login success');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async registerByGoogle() {
        try {
            const token = await Gatekeeper.registerByGoogle();
            localStorage.setItem('token', token);
            await this.getProfile();
            this.router.navigate(['/']);
            this.toastr.success('Register success');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async loginByFacebook() {
        try {
            const token = await Gatekeeper.loginByFacebook();
            localStorage.setItem('token', token);
            await this.getProfile();
            this.router.navigate(['/']);
            this.toastr.success('Login success');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async registerByFacebook() {
        try {
            const token = await Gatekeeper.registerByFacebook();
            localStorage.setItem('token', token);
            await this.getProfile();
            this.router.navigate(['/']);
            this.toastr.success('Register success');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async getProfile() {
        const token = localStorage.getItem('token');
        if (token) {
            this.user = {
                picture: token,
                email: token
            };
        } else {
            this.logout();
        }
        // try {
        //     this.user = await Gatekeeper.getProfile();
        // } catch (error) {
        //     this.logout();
        //     throw error;
        // }
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('gatekeeper_token');
        this.user = null;
        this.router.navigate(['/login']);
    }
}
