import {Injectable, Input} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";


export class BaseService<T> {

  readonly url: string;

  constructor(protected httpClient: HttpClient, url: string) {
    this.url = url;
  }

  add(t: T): Observable<T> {
    return this.httpClient.post<T>(this.url + '/add', t);
  }

  delete(id: number): Observable<T> {
    console.log("id=", id);
    // @ts-ignore
    return this.httpClient.delete<T>(this.url + '/delete/', id);
  }

  get(id: number): Observable<T> {
    // @ts-ignore
    return this.httpClient.get<T>(this.url + '/id/', id);
  }

  getAll(): Observable<T[]> {
    return this.httpClient.get<T[]>(this.url + '/all');
  }

  update(t: T): Observable<T> {
    return this.httpClient.put<T>(this.url + '/update', t);
  }
}
