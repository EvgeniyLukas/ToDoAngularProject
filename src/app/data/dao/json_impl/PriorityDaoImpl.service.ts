import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PrioritySearchCriteria} from "../search/SearcCriteria";
import {BaseService} from "./Base.service";
import {PriorityDAO} from "../interfaces/PriorityDAO";
import {Priority} from "../../../model/Priority";

export const PRIORITY_URL_TOKEN = new InjectionToken<string>('url')

@Injectable({
  providedIn: 'root'
})
export class PriorityDaoImplService extends BaseService<Priority> implements PriorityDAO {


  constructor(httpClient: HttpClient, @Inject(PRIORITY_URL_TOKEN) url: string) {
    super(httpClient, url);
  }

  searchPriorities(prioritySearch: PrioritySearchCriteria) {
    return this.httpClient.post<Priority[]>(this.url + '/search', prioritySearch);
  }
}
