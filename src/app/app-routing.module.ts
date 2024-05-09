import { authGuard } from './guards/auth.guard';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { UserFeedbacksComponent } from './components/user-feedbacks/user-feedbacks.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { AdminDashboardComponent } from './components/dashboard/admin-dashboard/admin-dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ErrorpgComponent } from './components/errorpg/errorpg.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { HomeComponent} from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { SearchComponent } from './components/search/search.component';
import { adminGuard } from './guards/admin.guard';
import { AllbookingsComponent } from './components/allbookings/allbookings.component';
const routes: Routes = [
  {
    path:'',redirectTo:'home',pathMatch:'full'
  },
  {
    path:'home', component:HomeComponent
  },
  {
    path:'search/:categoryId',component:SearchComponent
  },
  {
    path:'contact', component:ContactComponent
  },
  {
    path:'about', component:AboutComponent
  },
  {
    path:'user-profile', component:ProfileComponent,
    canActivate:[authGuard]
  },
  {
    path:'admin-dashboard', component:AdminDashboardComponent,
    canActivate:[authGuard,adminGuard]
  },
  {
    path:'add-book', component:AddBookComponent,
    canActivate:[authGuard,adminGuard]
  },
  {
    path:'edit/:id', component:EditBookComponent,
    canActivate:[authGuard,adminGuard]
  },
  {
    path:'all-bookings', component:AllbookingsComponent,
    canActivate:[authGuard,adminGuard]
  },
  {
    path:'user-feedbacks', component:UserFeedbacksComponent,
    canActivate:[authGuard,adminGuard]
  },
  {
    path:'**',component:ErrorpgComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
