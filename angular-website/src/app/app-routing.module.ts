import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './accounts/accounts.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { LockControlComponent } from './lock-control/lock-control.component';
import { LockMonitorComponent } from './lock-monitor/lock-monitor.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/control-lock', pathMatch: 'full' },
  { path: 'control-lock', component: LockControlComponent, canActivate: [AuthGuard] },
  { path: 'monitor-lock', component: LockMonitorComponent, canActivate: [AuthGuard] },
  { path: 'authorized-accounts', component: AccountsComponent, canActivate: [AuthGuard] },
  { path: 'auth', component: AuthComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
