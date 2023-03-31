import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Gatekeeper} from 'gatekeeper-client-sdk';
import $ from 'jquery';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    public user: any = null;

    constructor(private router: Router, private toastr: ToastrService) {}

    async loginByAuth(fromeval) {
        try {
            // const token = await Gatekeeper.loginByAuth(email, password);
            // await this.getProfile();
            // console.log('test', fromeval);
            var settings = {
                url: 'http://35.201.178.250:8787/Login',
                method: 'POST',
                timeout: 0,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({
                    AD_account: fromeval.username,
                    Password: fromeval.password
                })
            };

            $.ajax(settings).done(function (response) {
                console.log(response);
                if (response.success) {
                    this.user = {
                        picture: response.Permission_module_name,
                        email: response.token
                    };
                    localStorage.setItem('token', response.token);
                    // console.log('token' + response.token);
                    // this.toastr.success('Login success');
                    alert('登入成功!');
                    this.router.navigate(['/']);
                    // this.router.navigateByUrl('/');
                } else {
                    alert('帳號密碼錯誤，請重新輸入!');
                }
                this.isAuthLoading = false;
            });
        } catch (error) {
            this.toastr.error(error.message);
        }
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
        try {
            this.user = await Gatekeeper.getProfile();
        } catch (error) {
            this.logout();
            throw error;
        }
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('gatekeeper_token');
        this.user = null;
        this.router.navigate(['/login']);
    }
}
