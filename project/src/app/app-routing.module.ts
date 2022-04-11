import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './login/log-in/log-in.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { UserRegistrationComponent } from './admin/user-registration/user-registration.component';
import { ProjectMappingDataComponent } from './admin/project-mapping-data/project-mapping-data.component';
import { AddProjectMappingDataComponent } from './admin/add-project-mapping-data/add-project-mapping-data.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path : '', component : LogInComponent},
  {path : 'login', component: LogInComponent },
  {path : 'user-dashboard', component : UserDashboardComponent, canActivate: [AuthGuard]},
  {path : 'admin-dashboard', component : AdminDashboardComponent, canActivate: [AuthGuard], children:[
    { path: 'user-registration', component: UserRegistrationComponent },
    { path: 'project-mapping', component: ProjectMappingDataComponent },
    { path: 'add-project-mapping', component: AddProjectMappingDataComponent },
  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
