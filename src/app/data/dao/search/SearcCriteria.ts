export class CategorySearchCriteria {
  title: string = '';
}

export class PrioritySearchCriteria {
  title!: string;
}

export class TaskSearchCriteria {
  // @ts-ignore
  title: string = null;
  // @ts-ignore
  completed: number = null;
  // @ts-ignore
  priorityId: number = null;
  // @ts-ignore
  categoryId: number = null;
  pageNumber: number = 0;
  pageSize: number = 5;

  sortColumn: string = "title";
  sortDirection: string = "asc";
}
