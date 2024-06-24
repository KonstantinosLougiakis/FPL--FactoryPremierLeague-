import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const jwtToken = getJwtToken();
  if (jwtToken) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${jwtToken}`
      }
    });
    return next(cloned);
  }
  return next(req);
};

function storeJwtToken(jwt: string) {
  localStorage.setItem('JWT_TOKEN', jwt);
}

function getJwtToken(): string | null {
  return localStorage.getItem('JWT_TOKEN');
}
