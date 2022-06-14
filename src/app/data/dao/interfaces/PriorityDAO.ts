import {CommonDAO} from "./CommonDAO";
import {Priority} from "../../../model/Priority";
import {CategorySearchCriteria} from "../search/SearcCriteria";
import {Observable} from "rxjs";

export interface PriorityDAO extends CommonDAO<Priority> {

  searchPriorities(categorySearch: CategorySearchCriteria): Observable<any>;

}
