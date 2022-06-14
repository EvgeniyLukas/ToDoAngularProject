import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TaskSearchCriteria} from "../search/SearcCriteria";
import {BaseService} from "./Base.service";
import {TaskDAO} from "../interfaces/TaskDAO";
import {Observable} from "rxjs";

export const TASK_URL_TOKEN = new InjectionToken<string>('url')

@Injectable({
  providedIn: 'root'
})
export class TaskDaoImplService extends BaseService<Task> implements TaskDAO {


  constructor(httpClient: HttpClient, @Inject(TASK_URL_TOKEN) url: string) {
    super(httpClient, url);
  }

  // @ts-ignore
  searchAllTasks(taskSearch: TaskSearchCriteria): Observable<Task[]> {
    return this.httpClient.post<Task[]>(this.url + '/search', taskSearch);
  }
}
