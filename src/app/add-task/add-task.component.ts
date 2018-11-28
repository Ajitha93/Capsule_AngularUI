import { Component,Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule, Router ,ActivatedRoute } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AddTaskService } from 'src/add-task.service';
import {ViewTaskComponent} from 'src/app/view-task/view-task.component';
import { ViewTaskServiceService } from 'src/view-task-service.service';
//import {EditTaskId} from 'src/app/view-task/view-task.component';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: [],
  //template: `<div>(EditId)='GetEditId($event)'</div>`
  // template: `
  //   <div>
  //     {{ EditId }}
  //   </div>
  // `
})
export class AddTaskComponent implements OnInit {
  Task:string;
  Priority:number
  ParentTaskId:number;
  StartDate:any;
  EndDate:any;
  TaskId:number;
  CreatedBy:string;
  CreatedDate:any;
  parentTaskList:any;  
  formGrp: FormGroup;
  formControlName="name";
  TaskLabel="Add";
  route: Router;
  snapshot:ActivatedRoute;
  response: any=null;
  errormsg:string="Required";
  errorAlertTask: string = "Please add Task";
  errorAlertParentTask: string="Please add Parent Task";
  errorAlertPriority: string="Please add Priority";
  errorAlertStartDate: string="Please add Start Date";
  errorAlertEndDate: string="Please add End Date";
  //@Input() EditId:number;

  constructor(private formBuilder: FormBuilder, route: Router, private addTaskSvc: AddTaskService,private viewTaskSvc: ViewTaskServiceService,
    private http: HttpClient,snapshot:ActivatedRoute) { this.route = route;this.snapshot=snapshot;}

  AddTask(post) {
    if (this.formGrp.valid) {
        this.Task = post.Task;
        this.Priority=post.Priority;
        this.ParentTaskId=post.ParentTaskId;
        this.StartDate=post.StartDate;
        this.EndDate=post.EndDate;
        this.TaskId=post.TaskId;
        this.CreatedBy=post.CreatedBy;
        this.CreatedDate=post.CreatedDate;

        this.addTaskSvc.AddTask(this.Task,this.Priority,this.ParentTaskId,this.StartDate,this.EndDate,this.TaskId,this.CreatedBy,this.CreatedDate).subscribe(res => {          
     
        localStorage.removeItem('editTaskId');  
        this.route.navigate(['ViewTask']); 
        }, error => {
            console.log("Error Occured");
        });
        console.log(this.Task);   

    }
    else {        
        for (let i in this.formGrp.controls) {
            if (!this.formGrp.controls[i].valid)
            {
                this.formGrp.controls[i].markAsTouched();

            }
        }
    }
  }
  ResetTask(){
  this.formGrp.reset();
  }  
  ngOnInit() {
    this.formGrp = this.formBuilder.group({
      Task: [null, [Validators.required]],// Validators.pattern('[a-zA-Z0-9]*')]], 
      Priority: [15, Validators.required],
      ParentTaskId: [null, Validators.required],
      StartDate: [null, [Validators.required]],
      EndDate:[null, [Validators.required]],
      TaskId:[null]  ,
      CreatedBy:[null],
      CreatedDate:[null]  
  });

  this.addTaskSvc.GetParentTask().subscribe(data => {    
  this.parentTaskList = data;
});
let taskid= +this.snapshot.snapshot.paramMap.get('id');
  if (+taskid > 0) {  
    this.addTaskSvc.GetTaskById(+taskid).subscribe(data => {  
      this.formGrp.patchValue(data);      
    })     
    this.TaskLabel = 'Edit';    
  }
}
// GetEditId(Id)
// {
//   this.TaskId=Id;
// }
}
