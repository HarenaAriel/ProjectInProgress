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
  employeeList:any=[];

  taskList$!:Observable<any[]>;

  // Map to display data associate with foreign key
  employeeMap:Map<number, string> = new Map();

  // Attributes
  ModalTitle:string = "";
  IsAdd:boolean = false;
  employee:any;

  constructor(private service:EmployeeApiService) { }

  ngOnInit(): void {
    this.employeeList$ = this.service.getEmployeeList();
    this.taskList$ = this.service.getTaskList();
  }

  refreshEmployeeMap(){
    this.service.getEmployeeList().subscribe(data => {
      this.employeeList = data;
      for(let i = 0; i < this.employeeList.length; i++){
        this.employeeMap.set(this.employeeList[i].id, this.employeeList[i].name);
      }
    });
  }

  modalAdd(){
    this.IsAdd = true
    this.ModalTitle = "New Employee";

    this.employee = {
      id: null,
      name: null
    }
  }

  modalEdit(item:any){
    console.log(item);
    this.employee = item;
    this.ModalTitle = "Update the employee " + item.id.substring(0, 8);
    this.IsAdd = true;
  }

  deleteEmployee(id: string){

    if(confirm('Are you sure you want to delete employee ${id} ?')){
      this.service.deleteEmployee(id).subscribe(res=>{
        var showDeleteSuccess = document.getElementById('add-delete-alert');
        if(showDeleteSuccess){
          showDeleteSuccess.style.display = "block";
        }
        setTimeout(function(){
          if(showDeleteSuccess){
            showDeleteSuccess.style.display = "none";
          }
        }, 4000);
        this.employeeList$ = this.service.getEmployeeList();
      });
    }
  }

  modalClose(){
    this.IsAdd = false;
    this.employeeList$ = this.service.getEmployeeList();
  }

}
