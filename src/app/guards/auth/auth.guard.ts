import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);

    if (authService.getToken && !authService.TokenIsExpired()) return true;

    else {
        router.navigate(['/']);
        return false;
    }
};