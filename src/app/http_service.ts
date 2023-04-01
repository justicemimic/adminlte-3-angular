import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
// import {environment} from '../environments/environment';
import {APIResult} from './APIModel';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    constructor(private http: HttpClient) {}
    private heroesUrl = 'http://35.201.178.250:8787/'; //設定要讀的api的位置
    /**
     * @param api API Action name
     * @returns return APIResult
     */
    options = {
        observe: 'response' as 'response',
        responseType: 'text'
    };

    // 檔案上傳
    UploadFile(api: string, data: any): Observable<APIResult> {
        const httpOptions = {
            headers: new HttpHeaders().set('enctype', 'multipart/form-data')
        };
        return this.http
            .post<APIResult>(this.heroesUrl + api, data, httpOptions)
            .pipe(
                catchError(this.handleError<APIResult>(`HttpPost [${api}] API`))
            );
    }

    // HttpGet
    Get(api: string): Observable<APIResult> {
        const httpOptions = {
            headers: new HttpHeaders({'Access-Control-Allow-Origin': '*'})
        };
        return this.http
            .get<APIResult>(this.heroesUrl + api, httpOptions)
            .pipe(
                catchError(this.handleError<APIResult>(`HttpGet [${api}] API`))
            );
    }

    // HttpPost
    Post(api: string, data: any): Observable<APIResult> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http
            .post<APIResult>(this.heroesUrl + api, data, httpOptions)
            .pipe(
                catchError(this.handleError<APIResult>(`HttpPost [${api}] API`))
            );
    }

    // HttpPut
    Put(api: string, data: any): Observable<APIResult> {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        };
        return this.http
            .put<APIResult>(this.heroesUrl + api, data, httpOptions)
            .pipe(
                catchError(this.handleError<APIResult>(`HttpPut [${api}] API`))
            );
    }

    // HttpDelete
    Delete(api: string, data?: any): Observable<APIResult> {
        let options = {};
        if (data == null) {
            options = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                })
            };
        } else {
            options = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                }),
                params: {DeleteData: data}
            };
        }

        return this.http
            .delete<APIResult>(this.heroesUrl + api, options)
            .pipe(
                catchError(
                    this.handleError<APIResult>(`HttpDelete [${api}] API`)
                )
            );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            console.log(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }
}
