export class Category {
  id: number;
  title: string;
  completedCount?: number;
  unCompletedCount?: number;


  constructor(id: number, title: string, completedCount?: number, unCompletedCount?: number) {
    this.id = id;
    this.title = title;
    this.completedCount = completedCount;
    this.unCompletedCount = unCompletedCount;
  }
}
