import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AddUserService {

  constructor(private http: HttpClient) { }

 

  AddUser(FirstName:string,LastName:string,EmployeeId:number,UserId:number) {
      
      let _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };    

      
      let data = ({ First_Name: FirstName,Last_Name:LastName,Employee_Id:EmployeeId,User_Id:UserId});

      return this.http.post('http://localhost:1001/api/TaskManger/AddUser', data, _options);
  }
  // GetUserById(UserId:number)
  // {
  //   let _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }; 
    
  //   let data = ({ User_Id: UserId });

  //   return this.http.post('http://localhost:1001/api/TaskManger/GetUserById', data, _options);
  // }
  ViewUser() {

       let _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }; 
    
    //let data = ({ Task: Task,Priority:Priority,ParentTask:ParentTask,StartDate:StartDate,EndDate:EndDate });

    return this.http.post('http://localhost:1001/api/TaskManger/ViewUsers', null,_options);
}
DeleteUser(user)
{
  let _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    let data = ({ User_Id: user.User_Id});

    return this.http.post('http://localhost:1001/api/TaskManger/DeleteUser',data, _options);
}
}
