import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ApplicationService} from "../../service/application.service";
import {Task} from "../../model/Task";
import {Category} from "../../model/Category";
import {Priority} from "../../model/Priority";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {DatePipe} from "@angular/common";
import {Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})
export class EditTaskDialogComponent implements OnInit {

  constructor(private matDialogRef: MatDialogRef<EditTaskDialogComponent>, //для работы с диалоговым окном
              @Inject(MAT_DIALOG_DATA) public data: [Task, string],//данные которые передали в диалоговое окно
              private service: ApplicationService,//ссылка на наш сервис
              private matDialog: MatDialog) {//для открытия нового диалогового окна из текущего
  }

  categories!: Category[]
  priorities!: Priority[]

  dialogTitle!: string
  dialogTask!: Task
  tempTitle!: string
  tempCategory!: Category
  temPriority!: Priority;
  tmpDate!: Date;

  ngOnInit(): void {
    this.dialogTitle = this.data[1];
    this.dialogTask = this.data[0];
    this.tempTitle = this.dialogTask.title;
    // @ts-ignore
    this.tempCategory = this.dialogTask.category;
    // @ts-ignore
    this.temPriority = this.dialogTask.priority;
    // @ts-ignore
    this.tmpDate = this.dialogTask.date;

    this.service.getAllCategories().subscribe(categories => this.categories = categories);

    this.service.getAllPriorities().subscribe(priority => this.priorities = priority);
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
}
