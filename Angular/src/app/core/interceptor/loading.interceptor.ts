import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private httpRequest: HttpRequest<any>[] = [];

  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.httpRequest.push(request);
    console.log('HttpRequest Loading Amount : ' + this.httpRequest.length);

    // Loading service next True

    return new Observable(observer => {
      const subscription = next.handle(request).subscribe(value => {
        if (value instanceof HttpResponse) {
          this.removeRequest(request);
          observer.next(value);
        }
      }, error => {
        alert('Error');
        this.removeRequest(request);
        observer.error(error);
      }, () => {
        this.removeRequest(request);
        observer.complete();
      });

      return () => {
        this.removeRequest(request);
        subscription.unsubscribe();
      };
    });

    // return next.handle(request);
  }

  removeRequest(request: HttpRequest<any>) {
    const i = this.httpRequest.indexOf(request);

    if (i >= 0) {
      this.httpRequest.splice(i, 1);
    }

    // Loading service next httpRequest length > 0
  }

}
