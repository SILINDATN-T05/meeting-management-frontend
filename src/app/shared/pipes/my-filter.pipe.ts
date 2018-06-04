import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'myfilter',
    pure: false,
})
export class MyFilterPipe implements PipeTransform {
    transform(items: any[], filter: string): any {
        if (!items || !filter) {
            return items;
        }
        return items.filter((item) => item.MBR_NAME.indexOf(filter.toUpperCase()) !== -1);
    }
}
