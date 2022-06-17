import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Task} from "../../model/Task";
import {Category} from "../../model/Category";
import {Priority} from "../../model/Priority";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {TypeOperation} from "../type-operation";
import {PriorityDaoImplService} from "../../data/dao/json_impl/PriorityDaoImpl.service";
import {CategoryDaoImplService} from "../../data/dao/json_impl/CategoryDaoImpl.service";

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})
export class EditTaskDialogComponent implements OnInit {
  constructor(private matDialogRef: MatDialogRef<EditTaskDialogComponent>, //для работы с диалоговым окном
              @Inject(MAT_DIALOG_DATA) public data: [Task, string, TypeOperation],//данные которые передали в диалоговое окно
              private categoryService: CategoryDaoImplService, private priorityService: PriorityDaoImplService,
              private matDialog: MatDialog) {//для открытия нового диалогового окна из текущего
  }

  categories!: Category[]

  priorities!: Priority[]
  dialogTitle!: string

  dialogTask!: Task
  tempTitle!: string
  tempCategory!: Category
  oldCategory!: Category;
  temPriority!: Priority;
  tmpDate!: Date;
  private typeOperation!: TypeOperation;
  today = new Date();

  ngOnInit(): void {
    this.dialogTask = this.data[0];
    this.dialogTitle = this.data[1];
    this.typeOperation = this.data[2];

    this.tempTitle = this.dialogTask.title;
    // @ts-ignore
    this.tempCategory = this.dialogTask.category;

/*    if (this.dialogTask.category) {
      this.oldCategory = this.dialogTask.category;
    }*/
    // @ts-ignore
    this.temPriority = this.dialogTask.priority;
    // @ts-ignore
    this.tmpDate = new Date(this.dialogTask.date);

    //this.service.getAllCategories().subscribe(categories => this.categories = categories);
    //this.service.getAllPriorities().subscribe(priority => this.priorities = priority);
    this.categoryService.getAll().subscribe(cat => this.categories = cat);
    this.priorityService.getAll().subscribe(pr => this.priorities = pr);

    // console.log(this.dialogTitle);
    // console.log(this.dialogTask);
  }


  onAcceptClick() {
    this.dialogTask.title = this.tempTitle;
    this.dialogTask.category = this.tempCategory;
    this.dialogTask.priority = this.temPriority;
    this.dialogTask.date = this.tmpDate;


    this.matDialogRef.close(this.dialogTask);
  }

  onCancel() {
    this.matDialogRef.close(null);
  }

  delete() {
    let dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтверди удаление',
        message: `Ты точно хочешь удалить задачу: "${this.dialogTask.title}"?`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.matDialogRef.close("delete");
      }
    });
  }

  deActivate() {
    this.matDialogRef.close("deActivate");
  }

  activate() {
    this.matDialogRef.close("activate");
  }

  canDeleteMethod(): boolean {
    return this.typeOperation === TypeOperation.EDIT;
  }

  canActivateDeactivate(): boolean {
    return this.typeOperation === TypeOperation.EDIT;
  }

  addDays(num: number) {
    this.tmpDate = new Date();
    this.tmpDate.setDate(this.today.getDate() + num)
  }

  setToday() {
    this.tmpDate = this.today;
  }
}
