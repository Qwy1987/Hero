import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HeroDetailComponent} from '../hero-detail/hero-detail.component';
import {HeroesComponent} from '../heroes/heroes.component';
import {DashboardComponent} from '../dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',  //匹配空和/
    redirectTo: '/dashboard', //重定向到
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'heroes',
    component: HeroesComponent
  },
  {
    path: 'detail/:id',      //匹配带参数的组件
    component: HeroDetailComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
