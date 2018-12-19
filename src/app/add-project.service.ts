import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AddProjectService {

  constructor(private http: HttpClient) { }

 

  AddProject(ProjectName:string,StartDate:any,EndDate:any,EmployeeId:number,Priority:number,ProjectId:number) {
      
      let _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };    

      
      let data = ({ Project_Name: ProjectName,Start_Date:StartDate,End_Date:EndDate,Employee_Id:EmployeeId,Priority:Priority,Project_Id:ProjectId});

      return this.http.post('http://localhost:1001/api/TaskManger/AddProject', data, _options);
  } 
  ViewProject() {

       let _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };    
    

    return this.http.post('http://localhost:1001/api/TaskManger/ViewProjects', null,_options);
}
DeleteProject(project)
{
  let _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    let data = ({ Project_Id: project.Project_Id});

    return this.http.post('http://localhost:1001/api/TaskManger/DeleteProject',data, _options);
}
}
