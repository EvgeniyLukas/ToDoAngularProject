import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "./Base.service";
import {Observable} from "rxjs";
import {StatusEntity} from "../../../model/StatusEntity";
import {StatusDAO} from "../interfaces/StatusDAO";

export const STATUS_URL_TOKEN = new InjectionToken<string>('url')

@Injectable({
  providedIn: 'root'
})
export class StatusDaoImplService extends BaseService<StatusEntity> implements StatusDAO {


  constructor(httpClient: HttpClient, @Inject(STATUS_URL_TOKEN) url: string) {
    super(httpClient, url);
  }

  getStatus(): Observable<StatusEntity> {
    return this.httpClient.get<StatusEntity>(this.url);
  }
}
