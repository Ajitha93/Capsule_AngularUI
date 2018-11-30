import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
// import {Date} from '@C:\Program Files\Microsoft VS Code\resources\app\extensions\node_modules\typescript\lib\'

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {
    // declare Function Date;
  transform(value: any, args?: any): any {
    if(args.ParentTask){
       value = value.filter(task => task.ParentTask.toLowerCase().indexOf(args.ParentTask.toLowerCase())!=-1);
    }
    if(args.Task){
       value = value.filter(task => task.Task.toLowerCase().indexOf(args.Task.toLowerCase()) != -1);
    }
    if(args.PriorityFrom){
       value = value.filter(task =>  task.Priority >= args.PriorityFrom );
    }
     if(args.PriorityTo){
       value = value.filter(task =>  task.Priority <= args.PriorityTo );
    }
    if(args.StartDate){
       value = value.filter((task) => 
       {
        let StartDate = task.StartDate.substring(0,10).split('-');
        let StartDatesearch = args.StartDate.substring(0,10).split('-');       
       return new Date(StartDate[0],StartDate[1]-1,StartDate[2]) >= new Date(StartDatesearch[0],StartDatesearch[1]-1,StartDatesearch[2]);
      }
    );
    }
    if(args.EndDate)
    {
       value = value.filter((task) => {
        let EndDate = task.EndDate.substring(0,10).split('-');
        let endDateSearch = args.EndDate.substring(0,10).split('-');
        return new Date(EndDate[0],EndDate[1]-1,EndDate[2]) <= new Date(endDateSearch[0],endDateSearch[1]-1,endDateSearch[2]);
      }
    );
    }
    return value;

  }
}

