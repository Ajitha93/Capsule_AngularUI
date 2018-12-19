import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AddTaskService {

  constructor(private http: HttpClient) { }

 

  AddTask(Task: string,Priority:number,ParentTaskId:number,StartDate:any,EndDate:any,TaskId:number,IsParent:any,ProjectId:number,EmployeeId:number) {
      
      let _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };     

      // let data = JSON.stringify({ Task: Task });
      let data = ({ Task: Task,Priority:Priority,ParentTaskId:ParentTaskId,StartDate:StartDate,EndDate:EndDate,TaskId:TaskId, IsParent:IsParent,ProjectId:ProjectId,EmployeeId:EmployeeId});

      return this.http.post('http://localhost:1001/api/TaskManger/AddTask', data, _options);
  }
  GetTaskById(TaskId:number)
  {
    let _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }; 
    
    let data = ({ TaskId: TaskId });

    return this.http.post('http://localhost:1001/api/TaskManger/GetTaskById', data, _options);
  }
  GetParentTask(){    
    let _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };     
    return this.http.get('http://localhost:1001/api/TaskManger/GetParentTaskDetails', _options);
  }
  

}
