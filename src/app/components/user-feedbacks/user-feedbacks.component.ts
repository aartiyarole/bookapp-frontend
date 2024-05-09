import { NavbarService } from './../../services/navbar.service';
import { Component , OnInit} from '@angular/core';
import { BookService } from '../../services/book.service';
@Component({
  selector: 'app-user-feedbacks',
  templateUrl: './user-feedbacks.component.html',
  styleUrl: './user-feedbacks.component.scss'
})
export class UserFeedbacksComponent implements OnInit{
  feedbacks: any[] = [];

  constructor(private bookService: BookService , public nav:NavbarService) { }

  ngOnInit(): void {
    this.getUserFeedBacks();
    this.nav.show()
  }

  getUserFeedBacks(): void {
    this.bookService.getUserFeedBacks().subscribe(
      (data: any[]) => {
      this.feedbacks = data;
    });
  }

}