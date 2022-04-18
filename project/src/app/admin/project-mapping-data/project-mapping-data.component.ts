import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProjectService } from 'src/app/services/project.service';
import { CanActivate, Router } from '@angular/router';

@Component({
  selector: 'app-project-mapping-data',
  templateUrl: './project-mapping-data.component.html',
  styleUrls: ['./project-mapping-data.component.css']
})

export class ProjectMappingDataComponent implements OnInit {
  displayedColumns: string[] = ['id', 'projectname', 'deptcode', 'users','product','status','cieareaid','financeproductid','action'];
  dataSource = new MatTableDataSource();
  constructor(private router: Router,private projectService: ProjectService){}
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() :void {
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

  
  deleteProject(id:number) {
		this.projectService.deleteProject(id).subscribe(res => {
			console.log('Project Deleted');
			//When an user is deleted, refresh all users.
			this.projectService.viewProject().subscribe((res) => {this.dataSource.data = res.object;});
		});
	}

  
  

}




 