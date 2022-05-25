import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from "@angular/common";

@Pipe({
  name: 'taskDate'
})
export class TaskDatePipe implements PipeTransform {

  transform(date: Date | string, format: string = 'mediumDate'): string {

    if (date == null) {
      console.log("date=", date);
      return "Без срока";
    }

    date = new Date(date);

    if (date.getDate() === new Date().getDate()) {
      return "Сегодня";
    }

    if (date.getDate() === new Date().getDate() - 1) {
      return "Вчера";
    }

    if (date.getDate() === new Date().getDate() + 1) {
      return "Завтра";
    }
    // @ts-ignore
    return new DatePipe('ru-RU').transform(date, format);
  }

}
