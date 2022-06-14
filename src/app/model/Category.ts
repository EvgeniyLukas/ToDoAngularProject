export class Category {
  id: number;
  title: string;
  completedCount: number;
  unCompletedCount: number;


  constructor(id: number, title: string, completedCount?: number, unCompletedCount?: number) {
    this.id = id;
    this.title = title;
    // @ts-ignore
    this.completedCount = completedCount;
    // @ts-ignore
    this.unCompletedCount = unCompletedCount;
  }
}
