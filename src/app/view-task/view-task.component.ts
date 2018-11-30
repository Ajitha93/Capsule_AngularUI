import { Component,Input, OnInit,Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule, Router } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
// import { Http, Response } from '@angular/http';
import { ViewTaskServiceService } from 'src/view-task-service.service';
//import {AddTaskComponent} from 'src/app/add-task/add-task.component';
import { FilterPipe } from 'src/app/pipe/filter.pipe';

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
  formGrp: FormGroup;
  formControlName="name";
  route: Router;
  response: any=null;
  errormsg:string="Required";
  PriorityFrom:number;
  PriorityTo:number;
  //@Input() EditTaskId:number;
//   @Input() EditId:number;
//@Output() EditId = new EventEmitter();
//   EditTaskId:number;
 

  constructor(private formBuilder: FormBuilder, route: Router, private viewTaskSvc: ViewTaskServiceService,private http: HttpClient) { this.route = route;  
}

  ViewTasks(post) 
  {
    // if (this.formGrp.valid) {
        // this.Task = post.Task;
        // this.Priority=post.Priority;
        // this.ParentTask=post.ParentTask;
        // this.StartDate=post.StartDate;
        // this.EndDate=post.EndDate;
        
        
        this.viewTaskSvc.ViewTask(this.Task,this.Priority,this.ParentTask,this.StartDate,this.EndDate).subscribe((res:Response) => {            
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
            this.viewTaskSvc.ViewTask(this.Task,this.Priority,this.ParentTask,this.StartDate,this.EndDate).subscribe((res:Response) => {            
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
// SetEditId(Id) { // You can give any function name
    
//     this.EditId.emit(Id);
// }
  ngOnInit() {

    this.formGrp = this.formBuilder.group({
      Task: [null, [Validators.pattern('[a-zA-Z0-9]*')]], 
      Priority:[null],
      ParentTask: [null],
      StartDate: [null],
      EndDate:[null]
  });
  this.viewTaskSvc.ViewTask(this.Task,this.Priority,this.ParentTask,this.StartDate,this.EndDate).subscribe((res:Response) => {            
    if (res != null) {             
              this.response = res;                    
          }
  }, error => {
      console.log("Error Occured");
  });

  }

}
