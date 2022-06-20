import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CategoriesComponent} from './views/categories/categories.component';
import {TasksComponent} from './views/tasks/tasks.component';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {EditTaskDialogComponent} from './dialog/edit-task-dialog/edit-task-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {ConfirmDialogComponent} from './dialog/confirm-dialog/confirm-dialog.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {TaskDatePipe} from './pipe/task-date.pipe';

import {registerLocaleData} from "@angular/common";
import localeRu from "@angular/common/locales/ru";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {EditCategoryDialogComponent} from './dialog/edit-category-dialog/edit-category-dialog.component';
import {FooterComponent} from './views/footer/footer.component';
import {HeaderComponent} from './views/header/header.component';
import {StatComponent} from './views/stat/stat.component';
import {StatCardComponent} from './views/stat/stat-card/stat-card.component';
import {HttpClientModule} from "@angular/common/http";
import {CATEGORY_URL_TOKEN} from "./data/dao/json_impl/CategoryDaoImpl.service";
import {PRIORITY_URL_TOKEN} from "./data/dao/json_impl/PriorityDaoImpl.service";
import {TASK_URL_TOKEN} from "./data/dao/json_impl/TaskDaoImpl.service";
import {STATUS_URL_TOKEN} from "./data/dao/json_impl/StatusDaoImpl.service";

registerLocaleData(localeRu);

// @ts-ignore
// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    TasksComponent,
    EditTaskDialogComponent,
    ConfirmDialogComponent,
    TaskDatePipe,
    EditCategoryDialogComponent,
    FooterComponent,
    HeaderComponent,
    StatComponent,
    StatCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: TASK_URL_TOKEN,
      useValue: "http://localhost:8080/task"
    },
    {
      provide: CATEGORY_URL_TOKEN,
      useValue: "http://localhost:8080/category"
    },
    {
      provide: PRIORITY_URL_TOKEN,
      useValue: "http://localhost:8080/priority"
    },
    {
      provide: STATUS_URL_TOKEN,
      useValue: "http://localhost:8080/status/status"
    }
  ],
  entryComponents: [
    EditTaskDialogComponent,
    ConfirmDialogComponent,
    EditCategoryDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
