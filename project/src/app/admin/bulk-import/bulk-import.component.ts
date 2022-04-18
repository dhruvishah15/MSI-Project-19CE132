import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CSV_REGEX }  from '../../constants/fileTypePatterns';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-bulk-import',
  templateUrl: './bulk-import.component.html',
  styleUrls: ['./bulk-import.component.css']
})
export class BulkImportComponent implements OnInit {
  @Output() fileUpload = new EventEmitter();
  // SERVER_URL = "http://localhost:3000/upload";

  fileData: any;
  fileName: string;
  fileTypeValid: boolean = true;
  loading: boolean = false; // Flag variable
  uploadForm: FormGroup;  
  message: any;
  showError: boolean = false;
  success: boolean = false;


  constructor(private formBuilder: FormBuilder,private httpClient: HttpClient, private projectService: ProjectService) { }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      projectData: [''],
    });

  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fileName = file.name;
      this.uploadForm.get('projectData')?.setValue(file);
    }
  }

  uploadFormSubmit() {
    const formData = new FormData();
    formData.append('projectData', this.uploadForm.get('projectData')?.value);

    this.projectService.importProject(formData).subscribe(
      (res:any)=>{
        this.success = true;
        this.message = "Bulk Import Successful";
        console.log(res);  
      },
      (err:any) => {
        this.showError = true;
        this.message = "Bulk Import Failed";
        console.log(err.error);
      }
    );

    
  }

  reloadCurrentPage() {
    window.location.reload();
  }


}
