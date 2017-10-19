import {Component, OnInit} from '@angular/core';
import {Hero} from '../hero';
//导入服务
import {HeroService} from '../hero.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];  //存储列表数组数据
  //注意：选中的hero是在点击heros中的一个时才初始化 会报以下错误：
  //EXCEPTION: TypeError: Cannot read property 'name' of undefined in [null]
  //解决办法是在用到selectedHero的最外层添加*ngIf="selectedHero"
  selectedHero: Hero;

  constructor(
    private heroService: HeroService ,
    private router:Router
  ) {

  }

  ngOnInit() {
    this.heroService
      .getHeroes()
      .then(heroes => this.heroes = heroes);

    // this.heroService
    //   .getHeroesSlowly()
    //   .then(heroes => this.heroes = heroes);
  }

  //添加一条
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.create(name)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
      });
  }

  //删除一条
  delete(hero: Hero): void {
    this.heroService
      .delete(hero.id)
      .then(() => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if (this.selectedHero === hero) { this.selectedHero = null; }
      });
  }

  //选中其中一项的处理函数 设置当前选中为事件传送过来的对象
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  //按钮触发路由 参数配置和用<a  [routerLink]="['/detail', hero.id]"></a>一样设置
  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }
}
