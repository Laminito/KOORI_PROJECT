import { Pipe, PipeTransform } from '@angular/core';
import { Demande } from '../_models/demande';

@Pipe({
  name: 'projectFilter'
})
export class ProjectFilterPipe implements PipeTransform {

  transform(value: Demande[], serviceId: number): Demande[] {
    return value.filter(demande => demande.ServiceId == serviceId);
  }

}
