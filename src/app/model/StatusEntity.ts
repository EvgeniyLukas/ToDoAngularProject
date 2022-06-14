export class StatusEntity {
  id: number;
  completedTotal: number;
  tnCompletedTotal: number;



  constructor(id: number, completedTotal: number, tnCompletedTotal: number) {
    this.id = id;
    this.completedTotal = completedTotal;
    this.tnCompletedTotal = tnCompletedTotal;
  }
}
