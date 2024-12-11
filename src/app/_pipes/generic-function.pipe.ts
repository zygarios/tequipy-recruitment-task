import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genericFunction',
})
export class GenericFunctionPipe implements PipeTransform {
  transform<T, U, R>(
    value: U,
    genericFunc: (value: U, ...args: R[]) => T,
    ...args: R[]
  ): T {
    if (typeof genericFunc !== 'function') {
      throw new Error('Provided argument is not a function');
    }

    return genericFunc(value, ...args);
  }
}
