import {Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ApplicationService} from "../../service/application.service";
import {Task} from "../../model/Task";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort, Sort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {EditTaskDialogComponent} from "../../dialog/edit-task-dialog/edit-task-dialog.component";
import {ConfirmDialogComponent} from "../../dialog/confirm-dialog/confirm-dialog.component";
import {Category} from "../../model/Category";
import {Priority} from "../../model/Priority";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  // @ts-ignore

  dataSource: MatTableDataSource<Task>;
  /* тут был 'select' для некрасивых чекбоксов*/
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'category', 'date', 'operations'];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // @ts-ignore
  tasks: Task[];
  // @ts-ignore
  priorities: Priority[];

  /*  переменная для поиска задач*/
  searchTaskText = '';

  // переменная для фильтрации тайтлов
  @Output()
  private filterByTitle = new EventEmitter<string>();

  // переменная для фильтрации по статусу
  @Output()
  private filterByStatus = new EventEmitter<boolean>();

  @Output()
  private filterByPriority = new EventEmitter<Priority>();

  selectedStatusFilter!: Boolean;


  @Input('priorities')
  set setPriorities(priorities: Priority[]) {
    this.priorities = priorities;
  }

  @Input('tasks')
  set setTasks(tasks: Task[]) {
    this.tasks = tasks;
    this.refreshTable();
  }

  @Output()
  updateTask = new EventEmitter<Task>();

  @Output()
  deleteTask = new EventEmitter<Task>();


  @Output()
  selectCategory = new EventEmitter<Category>();
  //private matDialogRef: MatDialogRef<EditTaskDialogComponent>,
  //             @Inject(MAT_DIALOG_DATA) public data: [Task, string],


  constructor(
    private applicationService: ApplicationService,
    private matDialog: MatDialog) {
  }

  //
  // deleteTitle!: string;
  // deleteTask!: Task;

  ngOnInit(): void {
    //this.tasks = this.applicationService.getTasks();

    //DAO
    //this.applicationService.getAllTasks().subscribe(tasks => this.tasks = tasks);

    //this.applicationService.taskSubject.subscribe(tasks => this.tasks = tasks);

    //вариант1
    //this.dataSource = new MatTableDataSource<Task>(this.tasks);

    //вариант2 - оба рабочие
    this.dataSource = new MatTableDataSource();
    this.refreshTable();


    // this.deleteTitle = this.data[1];
    // this.deleteTask = this.data[0];


  }

  toggleTaskCompleted(task: Task) {
    task.completed = !task.completed;
    this.updateTask.emit(task);
  }

  private refreshTable() {
    if (this.dataSource) {
      this.dataSource.data = this.tasks;
    } else {
      return;
    }
  }

  getPriorityColor(task: Task): string {
    if (task.completed) {
      return ''
    }

    if (task.priority && task.priority.color) {
      return task.priority.color;
    }
    return '#fff'
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      // @ts-ignore
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      // @ts-ignore
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  //метод для редактирования задач
  selectedPriorityFilter!: Priority;

  openDialog(task: Task) {

    //this.updateTask.emit(task);

    let dialogRef = this.matDialog.open(EditTaskDialogComponent,
      {data: [task, "Редактирование задач",], autoFocus: false});


    dialogRef.afterClosed().subscribe(res => {

      if (res === 'activate') {
        task.completed = false;
        this.updateTask.emit(task);
        return;
      }

      if (res === 'deActivate') {
        task.completed = true;
        this.updateTask.emit(task);
      }

      if (res === 'delete') {
        this.deleteTask.emit(task);
        return;
      }

      if (res as Task) { //если нажали ок и есть результат
        this.updateTask.emit(task);
        return;
      }
    });

  }

  openDeleteDialog(task: Task) {
    let dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтверди удаление',
        message: `Ты точно хочешь удалить задачу: "${task.title}"?`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteTask.emit(task);
      }
    });
  }


  onSelectCategory(category: Category) {
    this.selectCategory.emit(category);
  }

  onFilterByTitle() {
    //console.log("Из таск компонента", this.searchTaskText);
    this.filterByTitle.emit(this.searchTaskText);
  }

  onFilterByStatus(status: boolean) {
    if (status !== this.selectedStatusFilter) {
      this.selectedStatusFilter = status;
      // @ts-ignore
      this.filterByStatus.emit(this.selectedStatusFilter);
    }
  }

  onFilterByPriority(priority: Priority) {
    if (priority !== this.selectedPriorityFilter) {
      this.selectedPriorityFilter = priority;
      this.filterByPriority.emit(this.selectedPriorityFilter);
    }
  }
}
