import {Component, OnInit, Input} from '@angular/core';
import {Hero} from '../hero';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Location} from '@angular/common';
import {HeroService} from '../hero.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  //hero被定义为一个输入属性
  //hero属性就可以绑定到自己的模板里面去
  // @Input() hero: Hero;由属性传递数据改为路由来确定当前显示
  hero: Hero;

  constructor(private heroService: HeroService,
              private route: ActivatedRoute,
              private location: Location) {

  }

  ngOnInit(): void {
    //解析地址栏参数
    this.route.paramMap
      .switchMap(
        (params: ParamMap) => this.heroService.getHero(+params.get('id'))
      )
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.update(this.hero)
      .then(() => this.goBack());
  }
}
