import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent implements OnInit {

  @Input()
  completeTaskInCategory!: number;
  @Input()
  totalTasksInCategory!: number;
  @Input()
  unCompleteTaskInCategory!: number;

  constructor() {
  }

  ngOnInit(): void {
  }

}
