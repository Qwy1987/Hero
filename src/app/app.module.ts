//浏览器启动模块
import {BrowserModule} from '@angular/platform-browser';
//模块装饰
import {NgModule} from '@angular/core';
//表单相关
import {FormsModule}from '@angular/forms';
//远程服务模块
import {HttpModule} from '@angular/http';

//手动安装  angular-in-memory-web-api模块
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
//自定义数据服务 作为 InMemoryWebApiModule.forRoot()的入参
import {InMemoryDataService}  from './in-memory-data.service';

/**自定义组件*****/
import {AppComponent} from './app.component';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';
import {HeroesComponent} from './heroes/heroes.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HeroSearchComponent} from './hero-search/hero-search.component';
/**自定义组件*****/

/*自定义整个项目范围的服务*/
import {HeroService} from './hero.service';
/*自定义整个项目范围的服务*/

//整个项目的路由导航配置模块
import {AppRoutingModule} from './app-routing/app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    HeroDetailComponent,
    HeroesComponent,
    DashboardComponent,
    HeroSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  providers: [
    HeroService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
