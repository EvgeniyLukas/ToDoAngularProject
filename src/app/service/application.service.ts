import {Injectable} from '@angular/core';
import {Category} from "../model/Category";
import {TestData} from "../data/TestData";
import {Task} from "../model/Task";
import {BehaviorSubject, Observable, of, Subject} from "rxjs";
import {TaskDAOImpl} from "../data/dao/impl/TaskDAOImpl";
import {CategoryDAOImpl} from "../data/dao/impl/CategoryDAOImpl";
import {Priority} from "../model/Priority";
import {PriorityDAOImpl} from "../data/dao/impl/PriorityDAOImpl";

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor() {
  }

  taskSubject = new BehaviorSubject<Task[]>(TestData.tasks);
  categorySubject = new BehaviorSubject<Category[]>(TestData.categories);

  //DAO
  taskDaoImpl = new TaskDAOImpl();
  categoryDAOImpl = new CategoryDAOImpl();
  priorityDAOImpl = new PriorityDAOImpl();

  // getCategories(): Category[] {
  //   return TestData.categories;
  // }

  fillTasks() {
    this.taskSubject.next(TestData.tasks);
  }


  fillTaskByCategory(category: Category) {
    const tasks = TestData.tasks.filter(task => task.category === category);
    console.log(tasks);
    this.taskSubject.next(tasks);
  }

  getTasks(): Task[] {
    return TestData.tasks;
  }

  getTaskByCategory(category: Category): Category[] {
    const tasks = TestData.tasks.filter(task => task.category === category);
    console.log(tasks);
    return tasks;

  }

  //DAO
  getAllTasks(): Observable<Task[]> {
    return this.taskDaoImpl.getAll();
  }

  getAllCategories(): Observable<Category[]> {
    return this.categoryDAOImpl.getAll();
  }

  getAllPriorities(): Observable<Priority[]> {
    return this.priorityDAOImpl.getAll();
  }


  searchTasks(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return this.taskDaoImpl.search(category, searchText, status, priority)
  }

  onUpdateTask(task: Task): Observable<Task> {
    return this.taskDaoImpl.update(task);
  }

  onDeleteTask(id: number): Observable<Task> {
    return this.taskDaoImpl.delete(id);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.categoryDAOImpl.update(category);
  }

  deleteCategory(id: number): Observable<Category> {
    return this.categoryDAOImpl.delete(id);
  }
}
