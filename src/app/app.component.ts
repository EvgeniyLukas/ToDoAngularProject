import {Component, OnInit} from '@angular/core';
import {Task} from "./model/Task";
import {Category} from "./model/Category";
import {Priority} from "./model/Priority";
import {CategoryDaoImplService} from "./data/dao/json_impl/CategoryDaoImpl.service";
import {CategorySearchCriteria, TaskSearchCriteria} from "./data/dao/search/SearcCriteria";
import {TaskDaoImplService} from "./data/dao/json_impl/TaskDaoImpl.service";
import {PageEvent} from "@angular/material/paginator";
import {PriorityDaoImplService} from "./data/dao/json_impl/PriorityDaoImpl.service";
import {StatusDaoImplService} from "./data/dao/json_impl/StatusDaoImpl.service";
import {StatusEntity} from "./model/StatusEntity";
import {StatusBarData} from "./references/StatusBarData";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'FirstAngularProject';
  tasks!: Task[];
  categories!: Category[];
  priorities!: Priority[];
  // @ts-ignore
  //categorySearchCriteria: CategorySearchCriteria = {title: null};
  categorySearchCriteria = new CategorySearchCriteria();
  // @ts-ignore
  //taskSearchCriteria: TaskSearchCriteria = {title: null, categoryId: null};
  taskSearchCriteria = new TaskSearchCriteria();
  totalTaskFounded!: number;


  selectedCategory!: Category;
  searchTaskText = '';
  statusFilter!: boolean;
  priorityFilter!: Priority;
  private searchCategoryText!: string;


  //статистика
  status!: StatusEntity;
  statusBar: StatusBarData = new StatusBarData();
  totalTaskInCategory!: number;
  completeTaskInCategory!: number;
  unCompletedCountCategoryAll!: number;


  unCompleteCountCategory!: number;


  //unCompleteTaskInCategory!: number;
  // constructor(private service: ApplicationService) {
  // }


  constructor(private categoryService: CategoryDaoImplService,
              private taskService: TaskDaoImplService,
              private priorityService: PriorityDaoImplService,
              private statusService: StatusDaoImplService
  ) {

    this.statusService.getStatus().subscribe(res => {

      this.status = res;
      this.unCompletedCountCategoryAll = this.status.unCompletedTotal;

      this.fillAllCategories();
    });
  }


  ngOnInit(): void {
    /*this.service.getAllTasks().subscribe(tasks => this.tasks = tasks);
    this.service.getAllCategories().subscribe(cat => this.categories = cat);
    // @ts-ignore
    this.onSelectCategory(null);
    //Получаем все приоритеты
    this.service.getAllPriorities().subscribe(p => this.priorities = p);*/
    //this.fillAllCategories();

    this.fillAllPriorities();
  }

  onSelectCategory(category: Category) {
    this.selectedCategory = category;

    //метод ниже заменили на updateTasks() а потом на updateTaskAndStatistic()
    // // @ts-ignore
    // this.service.searchTasks(this.selectedCategory, null, null,
    //   null).subscribe(tasks => {
    //   this.tasks = tasks
    // });
    /*this.updateTaskAndStatistic();*/
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
    console.log("update task = ", task);
    /*    //добавили статистику
        this.service.onUpdateTask(task).subscribe(() => {
          this.updateTaskAndStatistic();
        });*/
    // @ts-ignore
    this.taskService.update(task).subscribe(() => {

      if (task.oldCategory) {
        this.updateCategoryCounter(task.oldCategory);
      }
      if (task.category) {
        this.updateCategoryCounter(task.category);
      }
      this.searchTasks(this.taskSearchCriteria);
      this.updateStatisticCounter()
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

    /*    //со статистикой
        this.service.onDeleteTask(task.id).subscribe(() => {
          this.updateTaskAndStatistic();
        });*/

    this.taskService.delete(task.id).subscribe(() => {
      this.searchTasks(this.taskSearchCriteria);
      this.updateStatisticCounter();
    })

  }

  // onSearchTask(searchString: string) {
  //   this.searchTaskText = searchString;
  //   //console.log("Из app компонента", this.searchTaskText);
  //   this.updateTasks();
  // }

  // private updateTasks() {
  //   /*    this.service.searchTasks(
  //         // @ts-ignore
  //         this.selectedCategory, this.searchTaskText, this.statusFilter, this.priorityFilter)
  //         .subscribe(tasks => {
  //           this.tasks = tasks;
  //         });*/
  // }


  // onFilterByStatus(status: boolean) {
  //   this.statusFilter = status;
  //   this.updateTasks();
  // }
  //
  // onFilterByPriority(priority: Priority) {
  //   this.priorityFilter = priority;
  //   this.updateTasks();
  //
  // }

  onAddTask(task: Task) {
    /*    this.service.addTask(task).subscribe(result => {
          this.updateTaskAndStatistic();
        });*/
    console.log("onAddTask = ", task)
    // @ts-ignore
    this.taskService.add(task).subscribe(() => {

      if (task.category) {
        this.updateCategoryCounter(task.category);
      }

      this.searchTasks(this.taskSearchCriteria);
      this.updateStatisticCounter();
    });
  }

 /* onAddCategories(categoryTitle: string) {
    /!* this.service.addCategory(categoryTitle).subscribe(() => this.updateCategories());*!/
  }*/

  /*onSearchCategory(title: string) {
    /!*    this.searchCategoryText = title;
        this.service.searchCategories(title).subscribe(cat => {
          this.categories = cat
        });*!/
  }*/

  /*onDeleteCategory(category: Category) {
    /!*    this.service.deleteCategory(category.id).subscribe(() => {
          this.selectedCategory = null!; //Выбирается категория "Все категории"
          //this.onSelectCategory(this.selectedCategory);//работает но с багом(СОЗДАЕТ ЗАДАЧУ С НАЗВАНИЕМ КАТЕГОРИИ)
          this.onSearchCategory(this.searchCategoryText);
        })*!/
  }*/

/*  onUpdateCategory(category: Category) {
    /!*    this.service.updateCategory(category).subscribe(() => {
          //this.onSelectCategory(this.selectedCategory); //работает но с багом(СОЗДАЕТ ЗАДАЧУ С НАЗВАНИЕМ КАТЕГОРИИ)
          this.onSearchCategory(this.searchCategoryText);
        });*!/
  }*/


  private updateCategories() {
    /*    this.categories.forEach(cat => {
          this.service.getAllCategories().subscribe(cat => this.categories = cat);
        });*/
  }

  // updateTaskAndStatistic() {
  //   this.updateTasks();//обновить список задач
  //
  //   //Обновить переменные для статистики
  //   this.updateStatistic();
  // }

  private updateStatisticCounter() {
    /*    zip(
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
        );*/
    this.statusService.getStatus().subscribe(res => {
      this.status = res;
      this.unCompletedCountCategoryAll = this.status.unCompletedTotal;

      if (!this.selectedCategory) {//если выбрана категория "все категории"
        this.fillStatusbarData(this.status.completedTotal, this.status.unCompletedTotal);
      }
    });
  }


//========= методы для работы с Category через БД ==========
  //Метод нужен, чтоб обновить статистику кода выбираем категорию

  fillStatusbarData(completedCount: number, unCompletedCount: number) {
    this.statusBar.completedTotal = completedCount;
    this.statusBar.unCompletedTotal = unCompletedCount;
  }


  updateStatusCounter() {
  }

  addCategory(title: string) {
    let category: Category = new Category(null!, title);
    this.categoryService.add(category).subscribe(() => {
      this.searchCategory(this.categorySearchCriteria);
      this.updateStatisticCounter();
    });
  }

  deleteCategory(category: Category) {
    console.log("id app", category.id);
    this.categoryService.delete(category.id).subscribe(() => {
      this.searchCategory(this.categorySearchCriteria);
      this.updateStatisticCounter();
    });
  }

  updateCategory(category: Category) {
    this.categoryService.update(category).subscribe(() => {
      this.searchCategory(this.categorySearchCriteria);
    });
  }

  searchCategory(categorySearchCriteria: CategorySearchCriteria) {
    this.categoryService.searchCategories(categorySearchCriteria)
      .subscribe(result => {
        this.categories = result;
      });
  }

  fillAllCategories() {
    this.categoryService.getAll().subscribe(result => {
      this.categories = result;
      this.selectCategory(this.selectedCategory);
      console.log(result);
    });
  }

  selectCategory(category: Category) {

    if (category) { // если это не категория "все категории", то заполняем
      // @ts-ignore
      this.fillStatusbarData(category.completedCount, category.unCompletedCount)
    } else {
      this.fillStatusbarData(this.status.completedTotal, this.status.unCompletedTotal);
    }

    //сброс на первую страницу
    this.taskSearchCriteria.pageNumber = 0

    this.selectedCategory = category;

    // @ts-ignore
    this.taskSearchCriteria.categoryId = category ? category.id : null;

    this.searchTasks(this.taskSearchCriteria);

  }

  searchTasks(taskSearchCriteria: TaskSearchCriteria) {

    this.taskSearchCriteria = taskSearchCriteria;

    this.taskService.searchAllTasks(this.taskSearchCriteria).subscribe(result => {

      // @ts-ignore
      if (result.totalPages > 0 && this.taskSearchCriteria.pageNumber >= result.totalPages) {
        this.taskSearchCriteria.pageNumber = 0;
        this.searchTasks(this.taskSearchCriteria);
      }

      // @ts-ignore
      this.totalTaskFounded = result.totalElements;
      // @ts-ignore
      this.tasks = result.content;

    });

  }

  paging(pageEvent: PageEvent) {
    //
    if (this.taskSearchCriteria.pageSize !== pageEvent.pageSize) {
      this.taskSearchCriteria.pageNumber = 0;
    } else {
      this.taskSearchCriteria.pageNumber = pageEvent.pageIndex;
    }

    this.taskSearchCriteria.pageSize = pageEvent.pageSize;
    this.taskSearchCriteria.pageNumber = pageEvent.pageIndex;
    this.searchTasks(this.taskSearchCriteria);
  }

  private fillAllPriorities() {
    this.priorityService.getAll().subscribe(res => {
      this.priorities = res;
    });
  }

  private updateCategoryCounter(category: Category) {
    console.log("updateCategoryCounter", category.id);
    this.categoryService.get(category.id).subscribe(res => {
      this.categories[this.getCategoryIndex(category)] = res;
      this.showSelectCategoryStatus(res);
    });
  }

  showSelectCategoryStatus(category: Category) {
    if (this.selectedCategory && this.selectedCategory.id === category.id) {
      // @ts-ignore
      this.fillStatusbarData(category.completedCount, category.unCompletedCount);
    }
  }

  private getCategoryIndex(category: Category) {
    const tmpCategory = this.categories.find(cat => cat.id === category.id);
    // @ts-ignore
    return this.categories.indexOf(tmpCategory);
  }
}
