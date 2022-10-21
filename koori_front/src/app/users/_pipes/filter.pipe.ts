import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, search:string, key?:string): any {
    if (value.length===0 || search.length===0){
      return value
    }

    return value.filter( (_:any)=>JSON.stringify(_).toLocaleLowerCase().includes(search.toLocaleLowerCase()))
  }

}
