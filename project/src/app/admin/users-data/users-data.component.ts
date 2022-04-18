import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-data',
  templateUrl: './users-data.component.html',
  styleUrls: ['./users-data.component.css']
})
export class UsersDataComponent implements OnInit {

  id: any;
  displayedColumns: string[] = ['id', 'name', 'email', 'privilege','action'];
  dataSource = new MatTableDataSource();
  constructor(private userService: UserService){}
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() :void {
    this.userService.viewUsers().subscribe(
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

  deleteUser(id: number) {
		this.userService.deleteUser(id).subscribe(res => {
			console.log('Project Deleted');
			//When an user is deleted, refresh all users.
			this.userService.viewUsers().subscribe((res) => {this.dataSource.data = res.object;});
		});
	}

}
