import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertToTime'
})
export class DurationPipe implements PipeTransform {

  transform(value: number): string {
    if (value === 0) {
      return 'In progress...';
    }
    const ms = value % 1000;
    value = (value - ms) / 1000;
    const secs = value % 60;
    value = (value - secs) / 60;
    const mins = value % 60;

  return mins + 'm ' + secs + 's';
  }

}
