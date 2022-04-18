import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule} from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider'
import { CommonModule } from '@angular/common';
import { LogInComponent } from './login/log-in/log-in.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatChipsModule} from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { RouterModule } from '@angular/router';
import { UserRegistrationComponent } from './admin/user-registration/user-registration.component';
import { UsersDataComponent } from './admin/users-data/users-data.component';
import { ProjectMappingDataComponent } from './admin/project-mapping-data/project-mapping-data.component';
import { AddProjectMappingDataComponent } from './admin/add-project-mapping-data/add-project-mapping-data.component';
import { UpdateProjectMappingDataComponent } from './admin/update-project-mapping-data/update-project-mapping-data.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BulkImportComponent } from './admin/bulk-import/bulk-import.component';
import { BulkExportComponent } from './admin/bulk-export/bulk-export.component';
import { ViewProjectMappingDataComponent } from './user/view-project-mapping-data/view-project-mapping-data.component';


@NgModule({
  declarations: [
    AppComponent,
    LogInComponent, 
    UserDashboardComponent, 
    AdminDashboardComponent,
    UserRegistrationComponent,
    UsersDataComponent,
    ProjectMappingDataComponent,
    AddProjectMappingDataComponent,
    UpdateProjectMappingDataComponent,
    ViewProjectMappingDataComponent,
    BulkImportComponent,
    BulkExportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    HttpClientModule,
    CommonModule,
    MatToolbarModule,
    MatTooltipModule,
    MatMenuModule,
    MatSidenavModule,
    MatDividerModule,
    MatPaginatorModule,
    MatChipsModule,
    MatAutocompleteModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})

export class AppModule { }
