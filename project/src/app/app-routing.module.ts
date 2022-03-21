import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './component/log-in/log-in.component';
import { UserManagementComponent } from './component/user-management/user-management.component';

const routes: Routes = [
  {path : '', component : LogInComponent},
  {path : 'login', component: LogInComponent },
  {path : 'usermanagement', component : UserManagementComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
