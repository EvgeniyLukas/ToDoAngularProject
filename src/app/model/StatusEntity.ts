export class StatusEntity {
  id: number;
  completedTotal: number;
  unCompletedTotal: number;


  constructor(id: number, completedTotal: number, unCompletedTotal: number) {
    this.id = id;
    this.completedTotal = completedTotal;
    this.unCompletedTotal = unCompletedTotal;
  }
}
