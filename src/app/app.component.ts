import {Component, Input, OnInit} from '@angular/core';
import {ApplicationService} from "./service/application.service";
import {Task} from "./model/Task";
import {Category} from "./model/Category";
import {Priority} from "./model/Priority";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'FirstAngularProject';
  tasks!: Task[];
  categories!: Category[];
  priorities!: Priority[];


  selectedCategory!: Category;
  searchTaskText = '';
  statusFilter!: boolean;
  priorityFilter!: Priority;


  constructor(private service: ApplicationService) {
  }

  ngOnInit(): void {
    this.service.getAllTasks().subscribe(tasks => this.tasks = tasks);
    this.service.getAllCategories().subscribe(cat => this.categories = cat);
    // @ts-ignore
    this.onSelectCategory(null);
    //Получаем все приоритеты
    this.service.getAllPriorities().subscribe(p => this.priorities = p);
  }

  onSelectCategory(category: Category) {
    this.selectedCategory = category;

    //метод ниже заменили на updateTasks()
    // // @ts-ignore
    // this.service.searchTasks(this.selectedCategory, null, null,
    //   null).subscribe(tasks => {
    //   this.tasks = tasks
    // });

    this.updateTasks()

  }

  onUpdateTask(task: Task) {
    this.service.onUpdateTask(task).subscribe(() => {
      // @ts-ignore
      this.service.searchTasks(this.selectedCategory, null,
        null,
        null).subscribe(tasks => {
        this.tasks = tasks
      })
    });
    //console.log(task);
  }

  onDeleteTask(task: Task) {
    this.service.onDeleteTask(task.id).subscribe(() => {
      // @ts-ignore
      this.service.searchTasks(this.selectedCategory, null,
        null,
        null).subscribe(tasks => {
        this.tasks = tasks
      })
    });
  }

  onUpdateCategory(category: Category) {
    this.service.updateCategory(category).subscribe(() => {
      this.onSelectCategory(category);
    });
  }


  onDeleteCategory(category: Category) {
    this.service.deleteCategory(category.id).subscribe(() => {
      this.selectedCategory = null!; //Выбирается категория "Все категории"
      this.onSelectCategory(this.selectedCategory);
    })
  }

  onSearchTask(searchString: string) {
    this.searchTaskText = searchString;
    //console.log("Из app компонента", this.searchTaskText);
    this.updateTasks();
  }

  private updateTasks() {
    this.service.searchTasks(
      // @ts-ignore
      this.selectedCategory, this.searchTaskText, this.statusFilter, this.priorityFilter)
      .subscribe(tasks => {
        this.tasks = tasks;
      });
  }

  onFilterByStatus(status: boolean) {
    this.statusFilter = status;
    this.updateTasks();
  }

  onFilterByPriority(priority: Priority) {
    this.priorityFilter = priority;
    this.updateTasks();

  }

  onAddTask(task: Task) {
    this.service.addTask(task).subscribe(result => {
      this.updateTasks();
    })
  }

  onAddCategories(categoryTitle: string) {
    this.service.addCategory(categoryTitle).subscribe(() => this.updateCategories());
  }

  private updateCategories() {
    this.categories.forEach(cat => {
      this.service.getAllCategories().subscribe(cat => this.categories = cat);
    });
  }
}
