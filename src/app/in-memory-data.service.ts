/*
 * 取代mock-heroes模拟数据
 * */
import {Injectable} from '@angular/core';
import {Hero} from './hero';
import {InMemoryDbService} from 'angular-in-memory-web-api';

@Injectable()
export class InMemoryDataService implements InMemoryDbService {
  //实现 InMemoryDbService接口定义的抽象方法createDb 返回值是Object
  createDb() {
    const data: Hero[] = [
      {id: 0, name: 'Zero'},
      {id: 11, name: 'Mr. Nice'},
      {id: 12, name: 'Narco'},
      {id: 13, name: 'Bombasto'},
      {id: 14, name: 'Celeritas'},
      {id: 15, name: 'Magneta'},
      {id: 16, name: 'RubberMan'},
      {id: 17, name: 'Dynama'},
      {id: 18, name: 'Dr IQ'},
      {id: 19, name: 'Magma'},
      {id: 20, name: 'Tornado'}
    ];
    //return {heroes} 对象的解构赋值写法 等同于：return {heroes: heroes};
    //url必须写成/api/heroes 属性名必须和接口名保持一致

    return {heroes: {data}};
  }

  constructor() {
  }

}
