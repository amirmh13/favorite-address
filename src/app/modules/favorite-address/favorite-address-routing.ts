import { Routes } from "@angular/router";

export const favoriteAddressRoutes: Routes = [
    {
        path: 'list',
        loadComponent: () => import('./list/list.component').then(c => c.ListComponent)
    },
    {
        path: 'new',
        loadComponent: () => import('./new/new.component').then(c => c.NewComponent)
    },
    {
        path: ':id',
        loadComponent: () => import('./new/new.component').then(c => c.NewComponent)
    },
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
    }

];