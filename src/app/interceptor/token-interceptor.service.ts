import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//     constructor() {
//      }
//      intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         let newRequest = req;
//         let token = localStorage.getItem("token");
//         if (token != null) {
//                       newRequest = newRequest.clone({
//                 headers: req.headers.set('Content-Type', 'application/json')
//                     .set('Authorization', 'Bearer ' + localStorage.getItem("token"))
//                     .set('Access-Control-Allow-Origin', '*')
//                     .set('Access-Control-Allow-Credentials', 'true')
//             });

//         }
//         return next.handle(newRequest)
//     }

// }


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    
    if (token) {
      const authReq = req.clone({
        setHeaders: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token"),
        // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkZW1vIiwiYXVkIjoiMSIsInNjb3BlcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9BRE1JTiJ9XSwiaXNzIjoic3lzdGVtIiwiaWF0IjoxNzA0NjM2MDExLCJleHAiOjE3MDQ2NTQwMTF9.eBw6S55eaAIF1QFYaGPOGn4oQpZOTeBX2bumXUxc0ws'
        }
      });
      return next.handle(authReq);
    }
    
    return next.handle(req);
  }
}
