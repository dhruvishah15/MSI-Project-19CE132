import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-bulk-export',
  templateUrl: './bulk-export.component.html',
  styleUrls: ['./bulk-export.component.css']
})
export class BulkExportComponent implements OnInit {

  constructor(private projectService: ProjectService) { }
  message: any;
  showError: boolean = false;
  success: boolean = false;

  ngOnInit(): void {
  }

  export(){
    this.projectService.exportProject().subscribe(
      (res)=>{
        this.success = true;
        this.message = "Project Mapping Data Exported successfully";
        alert(this.message);
        console.log(res);
      },
      (err) => {
        this.showError = true;
        this.message = err.error.message;
        console.log(err.error);
      });
  }

  reloadCurrentPage() {
    window.location.reload();
  }

}
