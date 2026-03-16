import { HttpInterceptorFn } from '@angular/common/http';
import { environments } from '../../environments/environments';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const apiReq = req.clone({
    url: `${environments.apiUrl}${req.url}`,
    withCredentials: true,
    setHeaders: {
      'Content-Type': 'application/json',
      'Accept':'application/json'
    },
  });

  return next(apiReq);
};
