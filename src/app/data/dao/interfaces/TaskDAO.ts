import {CommonDAO} from "./CommonDAO";
import {Task} from "../../../model/Task";
import {Observable} from "rxjs";
import {TaskSearchCriteria} from "../search/SearcCriteria";


export interface TaskDAO extends CommonDAO<Task> {

  //search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]>
  searchAllTasks(taskSearch: TaskSearchCriteria): Observable<Task[]>


}
