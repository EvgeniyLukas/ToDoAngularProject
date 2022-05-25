import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApplicationService} from "../../service/application.service";
import {Category} from "../../model/Category";
import {MatDialog} from "@angular/material/dialog";
import {EditCategoryDialogComponent} from "../../dialog/edit-category-dialog/edit-category-dialog.component";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  @Input()
  categories!: Category[];

  @Input()
  selectedCategory!: Category;

  @Output()
  selectCategory = new EventEmitter<Category>();

  indexMouseMove!: number;

  @Output()
  deleteCategory = new EventEmitter<Category>();

  @Output()
  updateCategory = new EventEmitter<Category>();


  constructor(private applicationService: ApplicationService,
              private matDialog: MatDialog) {
  }

  ngOnInit(): void {
    /*this.categories = this.applicationService.getCategories();
    console.log(this.categories);*/
    //this.applicationService.categorySubject.subscribe(categories =>this.categories = categories);

    //DAO
    //this.applicationService.getAllCategories().subscribe(cat => this.categories = cat);

  }

  showTasksByCategory(category: Category) {
    /*this.applicationService.getTaskByCategory(category);*/
    // if (this.selectedCategory === category) {
    //   return;
    // }

    //this.applicationService.fillTaskByCategory(category);

    console.log(category)

    this.selectedCategory = category;

    this.selectCategory.emit(this.selectedCategory);
  }

  showEditIcon(index: number) {
    this.indexMouseMove = index;
  }

  openEditDialog(category: Category) {
    console.log(category.title);
    let dialogRef = this.matDialog.open(EditCategoryDialogComponent,
      {data: [category.title, "Редактирование категории",], autoFocus: false});

    dialogRef.afterClosed().subscribe(res => {

      if (res === 'delete') {
        this.deleteCategory.emit(category);//внешний обработчик
        return;
      }

      if (res as string) { //если нажали ок и есть результат
        category.title = res as string;
        this.updateCategory.emit(category);//внешний обработчик
        return;
      }
    });
  }
}
