import {CategoryDAO} from "../interfaces/CategoryDAO";
import {Category} from "../../../model/Category";
import {Observable, of} from "rxjs";
import {TestData} from "../../TestData";

export class CategoryDAOImpl implements CategoryDAO {

  add(category: Category): Observable<Category> {
    if (category.id === null || category.id === 0) {
      category.id = this.getLastIdCategory()
    }
    TestData.categories.push(category);
    return of(category);
  }

  private getLastIdCategory(): number {
    return Math.max.apply(Math, TestData.categories.map(cat => cat.id)) + 1;
  }


  get(id: number): Observable<Category> {
    // @ts-ignore
    return of(TestData.categories.filter(cat => cat.id === category.id));
  }

  getAll(): Observable<Category[]> {
    return of(TestData.categories);
  }

  search(title: string): Observable<Category[]> {
    return of(TestData.categories.filter(
      cat => cat.title.toUpperCase().includes(title.toUpperCase()))
      .sort((c1, c2) =>
        c1.title.localeCompare(c2.title)));
  }

  update(category: Category): Observable<Category> {
    const tmpCategory = TestData.tasks.find(t => t === category);//находим по id
    // @ts-ignore
    TestData.tasks.splice(TestData.tasks.indexOf(tmpCategory.id), 1, category); //удаляем и заменяем на новый
    // @ts-ignore
    return of(tmpCategory);
  }

  delete(id: number): Observable<Category> {
    TestData.tasks.forEach(task => {
      if (task.category && task.category.id === id) {
        task.category = null!;
      }
    });
    let tmpCategory = TestData.categories.find(t => t.id === id);
    // @ts-ignore
    TestData.categories.splice(TestData.categories.indexOf(tmpCategory), 1);

    // @ts-ignore
    return of(tmpCategory);

  }


}
