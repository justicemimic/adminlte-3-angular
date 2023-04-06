import {
    Component,
    OnInit,
    OnDestroy,
    Renderer2,
    HostBinding
} from '@angular/core';
import $ from 'jquery';
import {UntypedFormGroup, UntypedFormControl, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {AppService} from '@services/app.service';
import {LoadingBarService} from '@ngx-loading-bar/core';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    @HostBinding('class') class = 'login-box';
    public loginForm: UntypedFormGroup;
    public isAuthLoading = false;
    public isGoogleLoading = false;
    public isFacebookLoading = false;
    public data: any;

    constructor(
        private renderer: Renderer2,
        private toastr: ToastrService,
        private appService: AppService,
        private loadingBar: LoadingBarService
    ) {}

    ngOnInit() {
        this.renderer.addClass(
            document.querySelector('app-root'),
            'login-page'
        );
        this.loginForm = new UntypedFormGroup({
            username: new UntypedFormControl(null, Validators.required),
            password: new UntypedFormControl(null, Validators.required)
        });
    }
    get username() {
        return this.loginForm.get('username');
    }
    get password() {
        return this.loginForm.get('password');
    }
    async loginByAuth() {
        const username = this.loginForm.get('username').value;
        const password = this.loginForm.get('password').value;
        this.isAuthLoading = true;

        if (username && password) {
            try {
                this.data = await this.appService.loginByAuth(
                    this.loginForm.value
                );
                console.log(this.data.success);
                if (this.data.success) {
                    this.toastr.success('登入成功!');
                }
            } catch (error) {
                // console.error(error);
                // this.toastr.error('登入失敗!');
            } finally {
                this.isAuthLoading = false;
            }
        } else {
            this.toastr.error('請輸入帳號密碼!');
            this.isAuthLoading = false;
        }
    }

    async loginByGoogle() {
        this.isGoogleLoading = true;
        await this.appService.loginByGoogle();
        this.isGoogleLoading = false;
    }

    async loginByFacebook() {
        this.isFacebookLoading = true;
        await this.appService.loginByFacebook();
        this.isFacebookLoading = false;
    }

    ngOnDestroy() {
        this.renderer.removeClass(
            document.querySelector('app-root'),
            'login-page'
        );
    }
}
