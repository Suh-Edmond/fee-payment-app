import { HttpInterceptorFn } from '@angular/common/http';
import { environments } from '../../environments/environments';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const apiReq = req.clone({
    url: `${environments.apiUrl}${req.url}`,
    setHeaders: {
      'Content-Type': 'application/json',
    },
  });

  return next(apiReq);
};
