import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthenticationService} from '../auth/authentication.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = localStorage.getItem('token');

  if (authToken) {
    // Clone the request and add the Authorization header
    const clonedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`)
    });
    return next(clonedReq);
  }

  // If no token, send the original request
  return next(req);
};
