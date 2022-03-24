import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './component/log-in/log-in.component';
import { UserManagementComponent } from './component/user-management/user-management.component';
import { UserDashboardComponent } from './component/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  {path : '', component : LogInComponent},
  {path : 'login', component: LogInComponent },
  {path : 'usermanagement', component : UserManagementComponent},
  {path : 'user-dashboard', component : UserDashboardComponent},
  {path : 'admin-dashboard', component : AdminDashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
