import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LadderboardComponent } from './pages/ladderboard/ladderboard.component';
import { AboutComponent } from './pages/about/about.component';
import { QuestComponent } from './pages/quest/quest.component';
import { UserComponent } from './pages/user/user.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'ladderboard', component: LadderboardComponent},
  {path: 'about', component:AboutComponent},
  {path: 'quest', component:QuestComponent},
  {path: 'user' ,component:UserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
