import {Observable} from "rxjs";
import {StatusEntity} from "../../../model/StatusEntity";


export interface StatusDAO {

  getStatus():Observable<StatusEntity>;

}
