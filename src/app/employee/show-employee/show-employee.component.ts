import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeApiService
 } from 'src/app/employee-api.service';
@Component({
  selector: 'app-show-employee',
  templateUrl: './show-employee.component.html',
  styleUrls: ['./show-employee.component.css']
})
export class ShowEmployeeComponent implements OnInit {

  employeeList$!:Observable<any[]>;
  taskList$!:Observable<any[]>;

  // Map to display data associate with foreign key
  employeeMap:Map<number, string> = new Map();

  constructor(private service:EmployeeApiService) { }

  ngOnInit(): void {
    this.employeeList$ = this.service.getEmployeeList();
  }

}
