import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class ViewTaskServiceService {

  //editTaskId = Observable;

  constructor(private http: HttpClient) { }
 

  ViewTask(ProjectId:number) {

      //let headers = new Headers();


      //headers.append('Content-Type', 'application/json');

      let _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

     

      //let data = JSON.stringify({ Task: Task });
      let data = ({ ProjectId:ProjectId });

      return this.http.post('http://localhost:1001/api/TaskManger/ViewTasks', data, _options);



  }

  DeleteTask(user)
  {
    let _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    let data = ({ taskId: user.TaskId});

    return this.http.post('http://localhost:1001/api/TaskManger/DeleteTask',data, _options);

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
