import {Component, Input, OnInit} from '@angular/core';
import {StatusBarData} from "../../references/StatusBarData";

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

  @Input()
  statusBar!: StatusBarData

  constructor() {
  }

  ngOnInit(): void {
  }

  getTotal() {
    if (this.statusBar) {
      // @ts-ignore
      return this.statusBar.completedTotal + this.statusBar.unCompletedTotal;
    }
    return 0;
  }


  getCompletedCount() {
    if (this.statusBar) {
      return this.statusBar.completedTotal;
    } else
      return 0;
  }

  getUnCompletedCount() {
    if (this.statusBar) {
      return this.statusBar.unCompletedTotal;
    } else
      return 0;
  }


  getCompletedPercent() {
    //completeTaskInCategory?(completeTaskInCategory/totalTasksInCategory | percent):'0%'
    if (this.statusBar) {
      // @ts-ignore
      return this.statusBar.completedTotal ? (this.statusBar.completedTotal / this.getTotal()) : 0
    }
    return 0;
  }

  getUnCompletedPercent() {
    //completeTaskInCategory?(completeTaskInCategory/totalTasksInCategory | percent):'0%'
    if (this.statusBar) {
      // @ts-ignore
      return this.statusBar.unCompletedTotal ? (this.statusBar.unCompletedTotal / this.getTotal()) : 0
    }
    return 0;
  }
}
