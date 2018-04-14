import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myfilter',
  pure: false
})
export class MyFilterPipe implements PipeTransform {
  transform(items: any[], filter: any[]): any {
    if (!items || !filter) {
      return items;
    }
    return items.filter(item => { return filter.some((ite) => { return item.id === ite.id }); });
  }
}
