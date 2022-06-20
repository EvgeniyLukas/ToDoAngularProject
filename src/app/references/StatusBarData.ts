export class StatusBarData{
  completedTotal?: number;
  unCompletedTotal?: number;


  constructor(completedTotal?: number, unCompletedTotal?: number) {
    this.completedTotal = completedTotal;
    this.unCompletedTotal = unCompletedTotal;
  }
}
