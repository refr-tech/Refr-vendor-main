import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface UserData {
  name: string;
  email: string;
  phone: string;
  exist: boolean;
}

// /** Constants used to fill up our data base. */
// const FRUITS: string[] = [
//   'blueberry',
//   'lychee',
//   'kiwi',
//   'mango',
//   'peach',
//   'lime',
//   'pomegranate',
//   'pineapple',
// ];
// const NAMES: string[] = [
//   'Maia',
//   'Asher',
// ];

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) 
  sort!: MatSort;
  
  displayedColumns: string[] = [ 'check', 'name', "action"];
  dataSource!: MatTableDataSource<UserData>;

  showData = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    
    setTimeout(() => {
      this.execute();
    }, 3000);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  execute(){
    // Create 100 users
    const users: any[] = [
       {name:"Name1", email:"email1@example.com", phone:"+919876543210", exist: true},
       {name:"Name2", email:"email2@example.com", phone:"+919876543211", exist: false}
    ];
    
    this.dataSource = new MatTableDataSource(users);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.showData = true;
  }

}
