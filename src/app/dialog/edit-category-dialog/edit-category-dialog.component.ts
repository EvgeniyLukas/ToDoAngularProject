import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.css']
})
export class EditCategoryDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<EditCategoryDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: [string, string],
              private dialog: MatDialog) {

  }

  dialogTitle!: string;
  categoryTitle!: string;
  canDelete = true;


  ngOnInit(): void {
    this.categoryTitle = this.data[0];
    this.dialogTitle = this.data[1];

    if (!this.categoryTitle) {
      this.canDelete = false;
    }
  }

  onConfirm() {
    this.dialogRef.close(this.categoryTitle);
  }


  onCancel() {
    this.dialogRef.close(false);
  }

  delete() {
    let dialogRef1 = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "500px",
      data: {
        dialogTitle: "Подтвердите действие",
        message: `Вы точно хотите удалить категорию:"${this.categoryTitle}"?(Задача при этом не удаляется)`
      },
      autoFocus: false
    });

    dialogRef1.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close('delete');
      }
    });
  }
}
