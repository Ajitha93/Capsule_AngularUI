import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class ViewTaskServiceService {

  //editTaskId = Observable;

  constructor(private http: HttpClient) { }
 

  ViewTask(Task: string,Priority:number,ParentTask:string,StartDate:any,EndDate:any) {

      //let headers = new Headers();


      //headers.append('Content-Type', 'application/json');

      let _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

     

      //let data = JSON.stringify({ Task: Task });
      let data = ({ Task: Task,Priority:Priority,ParentTask:ParentTask,StartDate:StartDate,EndDate:EndDate });

      return this.http.post('http://localhost:61296/api/TaskManger/ViewTasks', data, _options);



  }

  DeleteTask(user)
  {
    let _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    let data = ({ taskId: user.TaskId});

    return this.http.post('http://localhost:61296/api/TaskManger/DeleteTask',data, _options);

  }

  // SetEditId(EditId)
  // {
  //   this.editTaskId=EditId;
  // }
  // GetEditId()
  // {
  //   return this.editTaskId;
  // }

}
