import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatError } from '@angular/material/form-field';
import { MatCommonModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { ProjectMappingDataComponent } from './project-mapping-data/project-mapping-data.component';
import { AddProjectMappingDataComponent } from './add-project-mapping-data/add-project-mapping-data.component';

@NgModule({
  declarations: [
  
  
    //AddProjectMappingDataComponent
  ],
  imports: [
    CommonModule,
    MatCommonModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatError,
    MatToolbarModule,
    MatPaginatorModule,
    MatAutocompleteModule
  ],
  exports: [
    MatPaginatorModule,
   
  ]
})
export class AdminModule { }
