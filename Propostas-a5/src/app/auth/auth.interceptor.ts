import { HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
export class AuthInjector implements HttpInterceptor {

    constructor(private router: Router) { }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        if (req.headers.get('no-auth') === 'true') {
            return next.handle(req.clone());
        }

        if (localStorage.getItem('BearerTokenKey') != null) {
            const clonedreq = req.clone({
                headers: req.headers.append('Authorization', 'Bearer ' + localStorage.getItem('BearerTokenKey'))
            });

            return next.handle(clonedreq)
                .do(
                    succ => {},
                    err => {
                        if (err.status == 401) {
                            localStorage.removeItem('BearerTokenKey');
                            localStorage.removeItem('CurrentUser');
                            this.router.navigate(['login']);
                        }
                    }
                )
        }
    }
}