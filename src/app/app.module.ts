import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { BookCardComponent } from './reusableComponents/book-card/book-card.component';
import { ErrorpgComponent } from './components/errorpg/errorpg.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AdminDashboardComponent } from './components/dashboard/admin-dashboard/admin-dashboard.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { UserFeedbacksComponent } from './components/user-feedbacks/user-feedbacks.component';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { AllbookingsComponent } from './components/allbookings/allbookings.component';
import { FooterComponent } from './components/footer/footer.component';
import{BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ContactComponent,
    HomeComponent,
    SearchComponent,
    BookCardComponent,
    ErrorpgComponent,
    ProfileComponent,
    AdminDashboardComponent,
    AddBookComponent,
    UserFeedbacksComponent,
    EditBookComponent,
    AllbookingsComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
