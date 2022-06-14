import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CategoryDAO} from "../interfaces/CategoryDAO";
import {Category} from "../../../model/Category";
import {CategorySearchCriteria} from "../search/SearcCriteria";
import {BaseService} from "./Base.service";

export const CATEGORY_URL_TOKEN = new InjectionToken<string>('url')

@Injectable({
  providedIn: 'root'
})
export class CategoryDaoImplService extends BaseService<Category> implements CategoryDAO {


  constructor(httpClient: HttpClient, @Inject(CATEGORY_URL_TOKEN) url: string) {
    super(httpClient, url);
  }

  searchCategories(categorySearch: CategorySearchCriteria) {
    return this.httpClient.post<Category[]>(this.url + '/search', categorySearch);
  }

}
