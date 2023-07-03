import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { publicAddressRoutes } from './modules/public-address/public-address-routing';
import { MainComponent } from './layout/main/main.component';
import { BareComponent } from './layout/bare/bare.component';
import { authRoutes } from './modules/auth/auth-routing';
import { userRoutes } from './modules/user/user-routing';
import { authGuard } from './guards/auth/auth.guard';
import { favoriteAddressRoutes } from './modules/favorite-address/favorite-address-routing';

const routes: Routes = [
  { path: 'public-address', children: publicAddressRoutes, component: MainComponent },
  { path: 'user', children: userRoutes, component: MainComponent, canActivate: [authGuard] },
  { path: 'favorite-address', children: favoriteAddressRoutes, component: MainComponent, canActivate: [authGuard] },
  { path: 'auth', children: authRoutes, component: BareComponent },
  { path: '**', redirectTo: 'public-address' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
