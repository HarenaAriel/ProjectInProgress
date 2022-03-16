import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeApiService {

  // Url listening for action 
  readonly employeeAPIUrl = "https://localhost:44300/api";
  readonly taskAPIUrl = "https://localhost:44300/api";

  private controllerNameEmployee = "employees";
  private controllerNameTask = "task";

  constructor(private http:HttpClient) { }
  
  // Employee CRUD with CORE REST API .Net

  getEmployeeList():Observable<any[]>{
    return this.http.get<any>(this.employeeAPIUrl + '/' + this.controllerNameEmployee);
  }

  addEmployee(data:any){
    return this.http.post(this.employeeAPIUrl + '/' + this.controllerNameEmployee + '/add', data);
  }

  updateEmployee(id:number|string, data:any){
    return this.http.put(this.employeeAPIUrl + '/' + this.controllerNameEmployee + '/edit/' + id, data);
  }

  deleteEmployee(id:number|string){
    return this.http.delete(this.employeeAPIUrl + '/' + this.controllerNameEmployee + '/delete/' + id);
  }

  // Task CRUD with CORE REST API .Net

  getTaskList():Observable<any[]>{
    return this.http.get<any>(this.taskAPIUrl + '/' + this.controllerNameTask);
  }

  addTask(data:any){
    return this.http.post(this.taskAPIUrl + '/' + this.controllerNameTask + '/add', data);
  }

  updateTask(id:number|string, data:any){
    return this.http.put(this.taskAPIUrl + '/' + this.controllerNameTask + '/edit/' + id, data);
  }

  deleteTask(id:number|string){
    return this.http.delete(this.taskAPIUrl + '/' + this.controllerNameTask + '/delete/' + id);
  }

}
