import {Component, Input, OnInit} from '@angular/core';
import {ApplicationService} from "./service/application.service";
import {Task} from "./model/Task";
import {Category} from "./model/Category";
import {Priority} from "./model/Priority";
import {zip} from "rxjs";

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
  private searchCategoryText!: string;


  //статистика
  totalTaskInCategory!: number;
  completeTaskInCategory!: number;
  unCompleteCountCategory!: number;
  unCompleteTaskInCategory!: number;


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

    //метод ниже заменили на updateTasks() а потом на updateTaskAndStatistic()
    // // @ts-ignore
    // this.service.searchTasks(this.selectedCategory, null, null,
    //   null).subscribe(tasks => {
    //   this.tasks = tasks
    // });
    this.updateTaskAndStatistic();

  }

  onUpdateTask(task: Task) {
    //до статистики
    // this.service.onUpdateTask(task).subscribe(() => {
    //   // @ts-ignore
    //   this.service.searchTasks(this.selectedCategory, null,
    //     null,
    //     null).subscribe(tasks => {
    //     this.tasks = tasks
    //   })
    // });

    //добавили статистику
    this.service.onUpdateTask(task).subscribe(() => {
      this.updateTaskAndStatistic();
    });

  }

  //удаление задачи
  onDeleteTask(task: Task) {
    //до статистики
    // this.service.onDeleteTask(task.id).subscribe(() => {
    //   // @ts-ignore
    //   this.service.searchTasks(this.selectedCategory, null,
    //     null,
    //     null).subscribe(tasks => {
    //     this.tasks = tasks
    //   })
    // });

    //со статистикой
    this.service.onDeleteTask(task.id).subscribe(() => {
      this.updateTaskAndStatistic();
    });

  }

  onUpdateCategory(category: Category) {
    this.service.updateCategory(category).subscribe(() => {
      //this.onSelectCategory(this.selectedCategory); //работает но с багом(СОЗДАЕТ ЗАДАЧУ С НАЗВАНИЕМ КАТЕГОРИИ)
      this.onSearchCategory(this.searchCategoryText);
    });
  }


  onDeleteCategory(category: Category) {
    this.service.deleteCategory(category.id).subscribe(() => {
      this.selectedCategory = null!; //Выбирается категория "Все категории"
      //this.onSelectCategory(this.selectedCategory);//работает но с багом(СОЗДАЕТ ЗАДАЧУ С НАЗВАНИЕМ КАТЕГОРИИ)
      this.onSearchCategory(this.searchCategoryText);
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
      this.updateTaskAndStatistic();
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

  onSearchCategory(title: string) {
    this.searchCategoryText = title;
    this.service.searchCategories(title).subscribe(cat => {
      this.categories = cat
    });
  }

  updateTaskAndStatistic() {
    this.updateTasks();//обновить список задач

    //Обновить переменные для статистики
    this.updateStatistic();
  }

  private updateStatistic() {
    zip(
      this.service.getTotalCountCategory(this.selectedCategory),
      this.service.getCompletedCountInCategory(this.selectedCategory),
      this.service.getUnCompletedCountInCategory(this.selectedCategory),
      this.service.getTotalCount()).subscribe(
      array => {
        // @ts-ignore
        this.totalTaskInCategory = array[0];
        // @ts-ignore
        this.completeTaskInCategory = array[1];
        // @ts-ignore
        this.unCompleteCountCategory = array[2];
        // @ts-ignore
        this.unCompleteTaskInCategory = array[3];
      }
    );
  }
}
