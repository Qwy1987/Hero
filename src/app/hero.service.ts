import {Injectable} from '@angular/core';
import {Hero} from './hero';
//模拟数据
//import {HEROES} from './mock-heroes';
//取代模拟数据 使用Http服务请求远程数据
//需要在核心模块中先注入HttpModule
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HeroService {
  //设置请求头
  private headers = new Headers({'Content-Type': 'application/json'});
  //请求heroes数据的路径
  private heroesUrl = 'api/heroes';

  constructor(private http: Http) {
  }

  //获取远程数据列表    get
  //异步的方式
  getHeroes(): Promise<Hero[]> {
    // return Promise.resolve(HEROES);
    return this.http.get(this.heroesUrl) //返回值类型是Observable
      .toPromise()
      .then(response => response.json().data as Hero[]) //假设返回数据对象 并含有一个data属性
      .catch(this.handleError);
  }

  //下面的方法模拟了数据请求延迟效果
  // getHeroesSlowly(): Promise<Hero[]> {
  //   return new Promise(resolve => {
  //     setTimeout(() => resolve(this.getHeroes()), 2000);
  //   });
  // }

  //按id查询单条数据    get
  getHero(id: number): Promise<Hero> {
    //反引号可以识别变量
    const url = `${this.heroesUrl}/${id}`;
    //当前传入的id在heroes中一一比对返回id相等的项
    // return this.getHeroes()
    //   .then(heroes => heroes.find(hero => hero.id === id));
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Hero)
      .catch(this.handleError);

  }

  //更新单条数据    put
  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http.put(url, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  //添加一条数据 post
  create(name: string): Promise<Hero> {
    return this.http
      .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(response => response.json().data as Hero)
      .catch(this.handleError);
  }

  //删除一条数据
  remove(id: number): Promise<void> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  //处理Promise请求error
  private handleError(error: any): Promise<any> {
    console.error('错误信息：' + error);
    return Promise.reject(error.message || error);
  }
}
