import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApplicationService} from "../../service/application.service";
import {Category} from "../../model/Category";
import {MatDialog} from "@angular/material/dialog";
import {EditCategoryDialogComponent} from "../../dialog/edit-category-dialog/edit-category-dialog.component";
import {TypeOperation} from "../../dialog/type-operation";
import {CategorySearchCriteria} from "../../data/dao/search/SearcCriteria";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  // @ts-ignore
  categories: Category[];

  // @ts-ignore
  categorySearchCriteria: CategorySearchCriteria = {title: null}


  @Input("categories")
  set setCategories(value: Category[]) {
    this.categories = value;
  }

  @Input()
  selectedCategory!: Category;

  indexMouseMove!: number;

  @Output()
  deleteCategory = new EventEmitter<Category>();

  @Output()
  updateCategory = new EventEmitter<Category>();

  @Output()
  private addCategory = new EventEmitter<string>();

  @Output()
  private searchCategory = new EventEmitter<string>();

  // ========== для работы с БД =========
  @Output()
  private searchCategoryNew = new EventEmitter<CategorySearchCriteria>();

  @Output()
  updateCategoryNew = new EventEmitter<Category>();
  @Output()
  deleteCategoryNew = new EventEmitter<Category>();

  @Output()
  addCategoryNew = new EventEmitter<string>();

  @Output()
  selectCategoryNew = new EventEmitter<Category>();


  //Переменная для поиска категорий
  searchCategoryTitle!: string;


  constructor(private applicationService: ApplicationService,
              private matDialog: MatDialog) {
  }


  ngOnInit(): void {
    /*this.categories = this.applicationService.getCategories();
    console.log(this.categories);*/
    //this.applicationService.categorySubject.subscribe(categories =>this.categories = categories);

    //DAO
    //this.applicationService.getAllCategories().subscribe(cat => this.categories = cat);

    this.showTasksByCategory(null!);
  }


  showTasksByCategory(category: Category) {
    /*this.applicationService.getTaskByCategory(category);*/


    //this.applicationService.fillTaskByCategory(category);

    console.log("showTaskByCategory = ", category)

    if (this.selectedCategory && this.selectedCategory === category) {
      return;
    }
    this.selectedCategory = category;

    this.selectCategoryNew.emit(this.selectedCategory);
  }

  showEditIcon(index: number) {
    this.indexMouseMove = index;
  }

  openEditDialog(category: Category) {
    console.log(category.title);
    let dialogRef = this.matDialog.open(EditCategoryDialogComponent,
      {
        data: [category.title,
          "Редактирование категории", TypeOperation.EDIT],
        width: '400px',
        autoFocus: true
      });

    dialogRef.afterClosed().subscribe(res => {
      if (res === 'delete') {
        this.deleteCategoryNew.emit(category);//внешний обработчик
        return;
      }

      if (res as string) { //если нажали ок и есть результат
        category.title = res as string;
        this.updateCategoryNew.emit(category);//внешний обработчик
        return;
      }
    });
  }

  openAddCategoryDialog() {
    let dialogRef = this.matDialog.open(EditCategoryDialogComponent,
      {
        data: ['', "Добавление категории", TypeOperation.ADD],
        width: "400px",
        autoFocus: true
      });

    dialogRef.afterClosed().subscribe(res => {
      if (res) { //если нажали ок и есть результат
        console.log(res)
        console.log(typeof res)
        // @ts-ignore
        this.addCategoryNew.emit(res);//внешний обработчик
        return;
      }
    });
  }

  //метод для поиска категории
  search() {
    console.log(this.searchCategoryTitle);
    if (this.searchCategoryTitle == null) {
      return
    }
    this.categorySearchCriteria.title = this.searchCategoryTitle;

    this.searchCategoryNew.emit(this.categorySearchCriteria);
  }
}
