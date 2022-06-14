import {CommonDAO} from "./CommonDAO";
import {Category} from "../../../model/Category";
import {Observable} from "rxjs";
import {CategorySearchCriteria} from "../search/SearcCriteria";



export interface CategoryDAO extends CommonDAO<Category> {

  //search(title: string): Observable<Category[]>;
  searchCategories(categorySearch: CategorySearchCriteria): Observable<any>;
}
