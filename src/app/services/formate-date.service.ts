import { Injectable } from '@angular/core';

@Injectable()
export class FormateDateService {

  constructor() { }
  formatDate(date) {
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    return year + '-' + (monthIndex + 1) + '-' + day;
  }
  formatDate1 (date) {
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    return [year, monthIndex , day + 1];
  }
}
