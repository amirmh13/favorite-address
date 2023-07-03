import { Routes } from "@angular/router";

export const userRoutes: Routes = [
    {
        path: 'profile',
        loadComponent: () => import('../user/profile/profile.component').then(c => c.ProfileComponent)
    },
    {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
    }
]