import { Component,Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule, Router ,ActivatedRoute } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AddTaskService } from 'src/add-task.service';
import {ViewTaskComponent} from 'src/app/view-task/view-task.component';
import { ViewTaskServiceService } from 'src/view-task-service.service';
//import {EditTaskId} from 'src/app/view-task/view-task.component';
import { AddUserService } from 'src/app/add-user.service';
import { AddProjectService } from 'src/app/add-project.service';

declare var $: any;

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
  ProjectId:number;
  EmployeeId:number;
  CreatedBy:string;
  CreatedDate:any;
  parentTaskList:any;  
  formGrp: FormGroup;
  formControlName="name";
  TaskLabel="Add";
  managerDetails:any;
  parentTasks:any;
  projectDetails:any;
  isDisabled = true;
  editdata:any;
  isParent:any;
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
    private http: HttpClient,snapshot:ActivatedRoute,private addUserSvc: AddUserService,private addProjSvc: AddProjectService) { this.route = route;this.snapshot=snapshot;}

    handleChange(value: boolean): void {
      const startdateinpt = this.formGrp.get('StartDate');
      const enddateinpt = this.formGrp.get('EndDate');
      const parentinpt = this.formGrp.get('ParentTaskId');
      const userinpt = this.formGrp.get('EmployeeId');
    
      if (value) {

        startdateinpt.disable();
        enddateinpt.disable();   
        parentinpt.disable();
        userinpt.disable();
        this.isParent=true;
        
      } else {
        startdateinpt.enable();
        enddateinpt.enable();  
        parentinpt.enable();  
        userinpt.enable(); 
        this.isParent=false;
      }
    }

  AddTask(post) {
    if (this.formGrp.valid) {
        this.Task = post.Task;
        this.Priority=post.Priority;
        this.ParentTaskId=post.ParentTaskId;
        this.StartDate=post.StartDate;        
        this.EndDate=post.EndDate;
        this.TaskId=post.TaskId;
        // this.CreatedBy=post.CreatedBy;
        // this.CreatedDate=post.CreatedDate;
        this.ProjectId=post.ProjectId;
        this.EmployeeId=post.EmployeeId;

        this.addTaskSvc.AddTask(this.Task,this.Priority,this.ParentTaskId,this.StartDate,this.EndDate,this.TaskId,this.isParent,this.ProjectId,this.EmployeeId).subscribe(res => { 
      
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

  SearchUser()
  {
   this.addUserSvc.ViewUser().subscribe((res:Response) => {            
     if (res != null) { 
               //this.EmployeeId = this.formGrp.get('EmployeeId').value;            
               this.managerDetails = res;    
               $("#managerModal").modal();              
           }
   }, error => {
       console.log("Error Occured");
   });
  }
  SelectedManger(user)
  {
   this.formGrp = this.formBuilder.group({       
     EmployeeId: [user.User_Id],    
     Task: this.formGrp.get('Task').value,
     ParentTaskId:this.formGrp.get('ParentTaskId').value,
     StartDate: this.formGrp.get('StartDate').value,
     EndDate:this.formGrp.get('EndDate').value,        
     ProjectId :this.formGrp.get('ProjectId').value,
     Priority: this.formGrp.get('Priority').value,      
     TaskId:this.formGrp.get('TaskId').value,     
 });      
   $("#managerModal").modal('hide');   
  }

  SearchParentTask()
  {
    this.addTaskSvc.GetParentTask().subscribe((res:Response) => {            
      if (res != null) { 
                //this.EmployeeId = this.formGrp.get('EmployeeId').value;            
                this.parentTasks= res;    
                $("#parentModal").modal();              
            }
    }, error => {
        console.log("Error Occured");
    });
  }
  SelectedParent(user)
  {
   this.formGrp = this.formBuilder.group({       
     EmployeeId: this.formGrp.get('EmployeeId').value,    
     Task: this.formGrp.get('Task').value,
     ParentTaskId:[user.ParentTaskId],
     StartDate: this.formGrp.get('StartDate').value,
     EndDate:this.formGrp.get('EndDate').value,        
     ProjectId :this.formGrp.get('ProjectId').value,
     Priority: this.formGrp.get('Priority').value, 
     TaskId:this.formGrp.get('TaskId').value,        
 });      
   $("#parentModal").modal('hide');   
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
     EmployeeId: this.formGrp.get('EmployeeId').value,    
     Task: this.formGrp.get('Task').value,
     ParentTaskId:this.formGrp.get('ParentTaskId').value,
     StartDate: this.formGrp.get('StartDate').value,
     EndDate:this.formGrp.get('EndDate').value,        
     ProjectId :[user.Project_Id],
     Priority: this.formGrp.get('Priority').value,     
     TaskId:this.formGrp.get('TaskId').value,       
 });  
 $("#projectModal").modal('hide');
}   

  ngOnInit() {
    this.formGrp = this.formBuilder.group({
      Task: [null, [Validators.required]],// Validators.pattern('[a-zA-Z0-9]*')]], 
      Priority: [15, Validators.required],
      ParentTaskId: [{value:null, disabled:!this.isDisabled}],
      StartDate: [{value:null, disabled:!this.isDisabled}],
      EndDate:[{value:null, disabled:!this.isDisabled}],
      TaskId:[null]  ,
      ProjectId:[null],
      EmployeeId:[null],    
      // CreatedBy:[null],
      // CreatedDate:[null]  
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
