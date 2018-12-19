import { Component,Input, OnInit,Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule, Router } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
// import { Http, Response } from '@angular/http';
import { ViewTaskServiceService } from 'src/view-task-service.service';
//import {AddTaskComponent} from 'src/app/add-task/add-task.component';
import { FilterPipe } from 'src/app/pipe/filter.pipe';
import { AddProjectService } from 'src/app/add-project.service';

declare var $: any;
@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: [],
  providers:[ViewTaskServiceService],
 // template:`<app-add-task [EditId]="EditTaskId"> </app-add-task>`
//  template: `
//  <app-add-task [EditId]="EditTaskId"></app-add-task>
// `
})
export class ViewTaskComponent implements OnInit {
  Task:string;
  Priority:number
  ParentTask:string;
  StartDate:any;
  EndDate:any;  
  ProjectId:number;
  formGrp: FormGroup;
  formControlName="name";
  route: Router;
  response: any=null;
  errormsg:string="Required";
  PriorityFrom:number;
  PriorityTo:number;
  projectDetails:any=null;
  //@Input() EditTaskId:number;
//   @Input() EditId:number;
//@Output() EditId = new EventEmitter();
//   EditTaskId:number;
 

  constructor(private formBuilder: FormBuilder, route: Router, private viewTaskSvc: ViewTaskServiceService,private http: HttpClient,
    private addProjSvc: AddProjectService) { this.route = route;  
}

  ViewTasks(ProjectId) 
  {
    // if (this.formGrp.valid) {
        // this.Task = post.Task;
        // this.Priority=post.Priority;
        // this.ParentTask=post.ParentTask;
        // this.StartDate=post.StartDate;
        // this.EndDate=post.EndDate;
        this.ProjectId=ProjectId;
        
        
        this.viewTaskSvc.ViewTask(this.ProjectId).subscribe((res:Response) => {            
          if (res != null) {
                    // this.response = res.json();
                    this.response = res;                    
                }
        }, error => {
            console.log("Error Occured");
        });
       
   
}

DeleteTask(user)
{   
        this.viewTaskSvc.DeleteTask(user).subscribe((res) => {  
            this.viewTaskSvc.ViewTask(this.ProjectId).subscribe((res:Response) => {            
                if (res != null) {             
                          this.response = res;                    
                      }
              }, error => {
                  console.log("Error Occured");
              });
                 
           // alert("Deleted "+ user.Task+" successfully !!");
          }, error => {
              console.log("Error Occured");
          });

}
EditTask(user)
{      
    this.route.navigate(['EditTask',user.TaskId]); 
}
SearchProject()
  {
    this.addProjSvc.ViewProject().subscribe((res:Response) => {            
      if (res != null) {             
                this.projectDetails = res;   
                $("#projectModal").modal();                 
            }
    }, error => {
        console.log("Error Occured");
    });
  }
  SelectedProject(user)
  {
   this.formGrp = this.formBuilder.group({       
    //  EmployeeId: this.formGrp.get('EmployeeId').value,    
    //  Task: this.formGrp.get('Task').value,
    //  ParentTaskId:this.formGrp.get('ParentTaskId').value,
    //  StartDate: this.formGrp.get('StartDate').value,
    //  EndDate:this.formGrp.get('EndDate').value,        
     ProjectId :[user.Project_Id],
    //  Priority: this.formGrp.get('Priority').value,     
    //  TaskId:this.formGrp.get('TaskId').value,
      Task: [null], 
      Priority:[null],
      ParentTask: [null],
      StartDate: [null],
      EndDate:[null],
      
 });  
 this.viewTaskSvc.ViewTask(user.Project_Id).subscribe((res:Response) => {            
    if (res != null) {             
              this.response = res;                    
          }
  }, error => {
      console.log("Error Occured");
  });     
 $("#projectid").val(user.Project_Id);
 $("#projectModal").modal('hide');
 
}  
// SetEditId(Id) { // You can give any function name
    
//     this.EditId.emit(Id);
// }
  ngOnInit() {

    this.formGrp = this.formBuilder.group({
      Task: [null, [Validators.pattern('[a-zA-Z0-9]*')]], 
      Priority:[null],
      ParentTask: [null],
      StartDate: [null],
      EndDate:[null],
      ProjectId:[null]
  });
//   this.viewTaskSvc.ViewTask(this.ProjectId).subscribe((res:Response) => {            
//     if (res != null) {             
//               this.response = res;                    
//           }
//   }, error => {
//       console.log("Error Occured");
//   });

  }

}
