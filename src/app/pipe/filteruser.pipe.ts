import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filter'
})

export class FilterUserPipe implements PipeTransform {
   
  transform(value: any, args?: any): any {
    if(args.FirstName){
       value = value.filter(user => (user.First_Name.toLowerCase().indexOf(args.FirstName.toLowerCase())!=-1)
       ||(user.Last_Name.toLowerCase().indexOf(args.FirstName.toLowerCase()) != -1));
    }    
    if (args.Employee_Id) {
      value = value.filter(manager => manager.Employee_Id == args.Employee_Id);
    }
    if(args.ProjectName){
       value = value.filter(user => (user.Project_Name.toLowerCase().indexOf(args.ProjectName.toLowerCase())!=-1)
       ||(user.Priority == args.ProjectName) );
    }   
    return value;

  }
}