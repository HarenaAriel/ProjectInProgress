import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeApiService } from '../../employee-api.service';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.css']
})
export class AddEditEmployeeComponent implements OnInit {

  constructor(private service:EmployeeApiService) { }

  /*

    only attribute inside the class can be used with the view
    use the same name as designed in the class to the [(ngModel)] and name field

   */

  @Input() employee:any;
  id: string = "";
  name: string = "";

  ngOnInit(): void {
    this.id = this.employee.id;
    this.name = this.employee.name;
  }

  addEmployee(){
    var employee= {
      name: this.name
    }

    this.service.addEmployee(employee).subscribe(res => {
      var closeModelBtn = document.getElementById('add-edit-modal-close');
      if(closeModelBtn){
        closeModelBtn.click();
      }

      var showAddSuccess = document.getElementById('add-success-alert');
      if(showAddSuccess){
        showAddSuccess.style.display = "block";
      }
      setTimeout(function(){
        if(showAddSuccess){
          showAddSuccess.style.display = "none";
        }
      }, 4000);

    });
  }

  editEmployee(){
    var employee= {
      id: this.id,
      name: this.name
    }

    var id:string = this.id;

    console.log(id);
    console.log(employee);

    this.service.updateEmployee(id, employee).subscribe(res => {
      var closeModelBtn = document.getElementById('add-edit-modal-close');
      if(closeModelBtn){
        closeModelBtn.click();
      }

      var showUpdateSuccess = document.getElementById('add-update-alert');
      if(showUpdateSuccess){
        showUpdateSuccess.style.display = "block";
      }
      setTimeout(function(){
        if(showUpdateSuccess){
          showUpdateSuccess.style.display = "none";
        }
      }, 4000);

    });
  }

}
