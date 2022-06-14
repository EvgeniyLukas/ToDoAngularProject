import {TaskDAO} from "../interfaces/TaskDAO";
import {Observable, of} from "rxjs";
import {Task} from "../../../model/Task";
import {Category} from "../../../model/Category";
import {Priority} from "../../../model/Priority";
import {TestData} from "../../TestData";

export class TaskDAOImpl  {

  add(task: Task): Observable<Task> {

    if (task.id === null || task.id === 0) {
      task.id = this.getLastIdTask();
    }
    TestData.tasks.push(task);
    return of(task);
  }

  private getLastIdTask(): number {
    return Math.max.apply(Math, TestData.tasks.map(task => task.id)) + 1;
  }


  delete(id: number): Observable<Task> {
    let taskDelete = TestData.tasks.find(t => t.id === id);
    // @ts-ignore
    TestData.tasks.splice(TestData.tasks.indexOf(taskDelete), 1); //удаляем
    // @ts-ignore
    return of(taskDelete);
  }

  get(id: number): Observable<Task> {
    // @ts-ignore
    return of(TestData.tasks.filter(task => task.id === id));
  }

  getAll(): Observable<Task[]> {
    return of(TestData.tasks);
  }

  search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    // @ts-ignore
    return of(this.searchTasks(category, searchText, status, priority));
  }

  private searchTasks(category: Category, searchText: string, status: boolean, priority: Priority): Task[] {

    let allTasks = TestData.tasks;

    if (category != null) {
      allTasks = allTasks.filter(task => task.category === category);
    }

    if (status != null) {
      allTasks = allTasks.filter(task => task.completed === status);
    }

    if (priority != null) {
      allTasks = allTasks.filter(task => task.priority === priority);
    }

    if (searchText != null) {
      allTasks = allTasks.filter(task => task.title.toUpperCase().includes(searchText.toUpperCase()));//учитываем текст поиска
    }
    return allTasks;
  }


  update(task: Task): Observable<Task> {
    const taskTmp = TestData.tasks.find(t => t.id === task.id);//находим по id

    console.log("task title", task.title);
    console.log("taskTmp title", taskTmp!.title);

    if (taskTmp === task) {
      // @ts-ignore
      TestData.tasks.splice(TestData.tasks.indexOf(taskTmp), 1, task); //удаляем и заменяем на новый
    }
    return of(task);
  }

  getTotalCountCategory(category: Category) {
    // @ts-ignore
    return of(this.searchTasks(category, null, null, null).length);
  }

  getCompletedCountInCategory(category: Category) {
    // @ts-ignore
    return of(this.searchTasks(category, null, true, null).length);
  }

  getUnCompletedCountInCategory(category: Category) {
    // @ts-ignore
    return of(this.searchTasks(category, null, false, null).length);
  }

  getTotalCount() {
    return of(TestData.tasks.length);
  }
}
