import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment'

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  public month: string;
  public monthDate: any;

  @Output('monthChanged') monthChanged = new EventEmitter();

  constructor() {
    this.monthDate = moment().startOf('month');
    this.month = this.monthDate.format('MMMM YYYY');
  }

  ngOnInit() {
    this.monthChanged.emit(this.monthDate);
  }

  public prevMonth () {
    this.changeMonth(1, 'subtract');
  }

  public nextMonth () {
    this.changeMonth(1, 'add');
  }

  private changeMonth (count: number, method: string) {
    this.monthDate = this.monthDate[method](1, 'month');
    this.month = this.monthDate.format('MMMM YYYY');
    this.monthChanged.emit(this.monthDate);
  }

}
