import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './component/log-in/log-in.component';

const routes: Routes = [
  {path: 'login', component: LogInComponent },
  {path : '', component : LogInComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
