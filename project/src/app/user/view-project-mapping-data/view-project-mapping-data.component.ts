import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ProjectService } from 'src/app/services/project.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-view-project-mapping-data',
  templateUrl: './view-project-mapping-data.component.html',
  styleUrls: ['./view-project-mapping-data.component.css']
})

export class ViewProjectMappingDataComponent implements OnInit {
  displayedColumns: string[] = ['id', 'projectname', 'deptcode', 'users','product','status','cieareaid','financeproductid'];
  dataSource = new MatTableDataSource();
  constructor(private router: Router,private projectService: ProjectService){}
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() : void {
    this.projectService.viewProject().subscribe(
    (res)=>{
      console.log(res);
      this.dataSource.data = res.object;
      this.dataSource.paginator = this.paginator;
    },
    (err) => {
      console.log(err.error);
    }
    );
  }

}
