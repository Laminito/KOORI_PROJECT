import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'summarize'
})
export class SummarizePipe implements PipeTransform {

  transform(value: string | undefined, limit:number): string {
    if(value){
      if (value.length >limit){
        return value.substr(0,limit) +' ...';
      }
    }
    return <string>value;
  }

}
