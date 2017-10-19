import {Component, OnInit} from '@angular/core';
import {Router}            from '@angular/router';

//包装字符串
import {Observable}        from 'rxjs/Observable';
import {Subject}           from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

//为这个组件定制的服务 在当前组件内注入
import {HeroSearchService} from '../hero-search.service';
import {Hero} from '../hero';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css'],
  providers: [HeroSearchService]
})
export class HeroSearchComponent implements OnInit {
  //存储查询到的数据列表
  heroes: Observable<Hero[]>;
  //
  private searchTerms = new Subject<string>();

  constructor(private heroSearchService: HeroSearchService,
              private router: Router) {
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes = this.searchTerms
      .debounceTime(300)        // 每次按键事件等待300ms 再没有发生键盘事件才会继续
      .distinctUntilChanged()   // 如果输入跟上一次相同就忽略直接驳回 不会去请求
      .switchMap(term => term   // 直到传入一个全新的字符串才会去search
        // return the http search observable
        ? this.heroSearchService.search(term)
        // or the observable of empty heroes if there was no search term
        : Observable.of<Hero[]>([]))
      .catch(error => {
        // 更好的处理错误信息
        this.handleError(error);
        return Observable.of<Hero[]>([]);
      });
  }

  private handleError(error: any) {
    console.error('错误信息：' + error);
  }

  gotoDetail(hero: Hero): void {
    this.router.navigate(['/detail', hero.id]);
  }
}
