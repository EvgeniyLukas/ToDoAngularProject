import {Category} from "../model/Category";
import {Priority} from "../model/Priority";
import {Task} from "../model/Task";

export class TestData {

  static categories: Category[] = [
    {id: 1, title: 'Еда', completedCount: 0, unCompletedCount: 0},
    {id: 2, title: 'Спорт', completedCount: 0, unCompletedCount: 0},
    {id: 3, title: 'Кино', completedCount: 0, unCompletedCount: 0},
    {id: 4, title: 'Жизнь', completedCount: 0, unCompletedCount: 0},
    {id: 5, title: 'Квартира', completedCount: 0, unCompletedCount: 0},
    {id: 6, title: 'Работа', completedCount: 0, unCompletedCount: 0},
    {id: 7, title: 'Отдых', completedCount: 0, unCompletedCount: 0},
    {id: 8, title: 'Животные', completedCount: 0, unCompletedCount: 0},
  ];

  static priorities: Priority[] = [
    {id: 1, title: 'Важный', color: '#ED6E67FF'},
    {id: 2, title: 'Важный но не очень', color: '#E7975DFF'},
    {id: 3, title: 'Средний', color: '#EEE97AFF'},
    {id: 4, title: 'Низкий но не очень', color: '#79E772FF'},
    {id: 5, title: 'Низкий', color: '#65D6C9FF'},
  ];

  // static tasks: Task[] = [
  //   {
  //     id: 1,
  //     title: 'Купить пироженное1',
  //     completed: true,
  //     // priority: TestData.priorities[4],
  //     // category: TestData.categories[3],
  //     // date: new Date('2022-10-22')
  //   }, {
  //     id: 2,
  //     title: 'Постирать трусы1',
  //     completed: true,
  //     priority: TestData.priorities[2],
  //     category: TestData.categories[2],
  //     date: new Date('2022-10-21')
  //     //date: new Date('1-1-2055')
  //   }, {
  //     id: 3,
  //     title: 'Поменять масло1',
  //     completed: false,
  //     priority: TestData.priorities[1],
  //     category: TestData.categories[1],
  //     date: new Date('2022-10-23')
  //   }, {
  //     id: 4,
  //     title: 'Заехать к родным1',
  //     completed: false,
  //     priority: TestData.priorities[0],
  //     category: TestData.categories[0],
  //     date: new Date('2022-10-24')
  //   }, {
  //     id: 5,
  //     title: 'Сварить вермишель1',
  //     completed: true,
  //     priority: TestData.priorities[2],
  //     category: TestData.categories[7],
  //     date: new Date('2022-10-25')
  //   }, {
  //     id: 6,
  //     title: 'Покормит котов1',
  //     completed: true,
  //     priority: TestData.priorities[1],
  //     category: TestData.categories[6],
  //     date: new Date('2022-10-26')
  //   }, {
  //     id: 7,
  //     title: 'Позвонить на работу1',
  //     completed: false,
  //     priority: TestData.priorities[3],
  //     category: TestData.categories[5],
  //     date: new Date('2022-10-27')
  //   }, {
  //     id: 8,
  //     title: 'Подготовить задания1',
  //     completed: false,
  //     priority: TestData.priorities[3],
  //     category: TestData.categories[4],
  //     date: new Date('2022-10-28')
  //   }, {
  //     id: 9,
  //     title: 'Поменять образ жизни1',
  //     completed: true,
  //     priority: TestData.priorities[2],
  //     category: TestData.categories[3],
  //     date: new Date('2022-10-29')
  //   }, {
  //     id: 10,
  //     title: 'Не кипишевать2',
  //     completed: false,
  //     priority: TestData.priorities[0],
  //     category: TestData.categories[2],
  //     date: new Date('2022-10-30')
  //   }, {
  //     id: 1,
  //     title: 'Купить пироженное2',
  //     completed: true,
  //     // priority: TestData.priorities[4],
  //     // category: TestData.categories[3],
  //     // date: new Date('2022-10-22')
  //   }, {
  //     id: 2,
  //     title: 'Постирать трусы2',
  //     completed: true,
  //     priority: TestData.priorities[2],
  //     category: TestData.categories[2],
  //     date: new Date('2022-10-21')
  //   }, {
  //     id: 3,
  //     title: 'Поменять масло2',
  //     completed: false,
  //     priority: TestData.priorities[1],
  //     category: TestData.categories[1],
  //     date: new Date('2022-10-23')
  //   }, {
  //     id: 4,
  //     title: 'Заехать к родным2',
  //     completed: false,
  //     priority: TestData.priorities[0],
  //     category: TestData.categories[0],
  //     date: new Date('2022-10-24')
  //   }, {
  //     id: 5,
  //     title: 'Сварить вермишель2',
  //     completed: true,
  //     priority: TestData.priorities[2],
  //     category: TestData.categories[7],
  //     date: new Date('2022-10-25')
  //   }, {
  //     id: 6,
  //     title: 'Покормит котов2',
  //     completed: true,
  //     priority: TestData.priorities[1],
  //     category: TestData.categories[6],
  //     date: new Date('2022-10-26')
  //   }, {
  //     id: 7,
  //     title: 'Позвонить на работу2',
  //     completed: false,
  //     priority: TestData.priorities[3],
  //     category: TestData.categories[5],
  //     date: new Date('2022-10-27')
  //   }, {
  //     id: 8,
  //     title: 'Подготовить задания2',
  //     completed: false,
  //     priority: TestData.priorities[3],
  //     category: TestData.categories[4],
  //     date: new Date('2022-10-28')
  //   }, {
  //     id: 9,
  //     title: 'Поменять образ жизни2',
  //     completed: true,
  //     priority: TestData.priorities[2],
  //     category: TestData.categories[3],
  //     date: new Date('2022-10-29')
  //   }, {
  //     id: 10,
  //     title: 'Не кипишевать2',
  //     completed: false,
  //     priority: TestData.priorities[0],
  //     category: TestData.categories[2],
  //     date: new Date('2022-10-30')
  //   },
  // ];


}
