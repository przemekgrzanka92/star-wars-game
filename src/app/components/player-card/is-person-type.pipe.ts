import { Pipe, PipeTransform } from '@angular/core';
import { Person } from '../../api-flow/models/person.interface';

@Pipe({
  name: `isPersonType`,
  standalone: true,
})
export class IsPersonTypePipe implements PipeTransform {
  transform(value: any): value is Person {
    return 'mass' in value;
  }
}
