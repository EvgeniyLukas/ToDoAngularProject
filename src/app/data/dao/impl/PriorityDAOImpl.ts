import {PriorityDAO} from "../interfaces/PriorityDAO";
import {Priority} from "../../../model/Priority";
import {Observable, of} from "rxjs";
import {TestData} from "../../TestData";

export class PriorityDAOImpl implements PriorityDAO {
  add(t: Priority): Observable<Priority> {
    // @ts-ignore
    return undefined;
  }

  delete(id: number): Observable<Priority> {
    // @ts-ignore
    return undefined;
  }

  get(id: number): Observable<Priority> {
    // @ts-ignore
    return undefined;
  }

  getAll(): Observable<Priority[]> {
    // @ts-ignore
    return of(TestData.priorities);
  }

  update(priority: Priority): Observable<Priority> {
    // @ts-ignore
    return undefined;
  }

}
