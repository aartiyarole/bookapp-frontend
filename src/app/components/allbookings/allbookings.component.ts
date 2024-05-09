import { NavbarService } from '../../services/navbar.service';
import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-allbookings',
  templateUrl: './allbookings.component.html',
  styleUrl: './allbookings.component.scss'
})
export class AllbookingsComponent implements OnInit{
  allBookings: any = [];

  constructor(private bookSrv: BookService, public nav:NavbarService) { }

  ngOnInit() {
    this.fetchAllBookings();
    this.nav.show()
  }

  fetchAllBookings() {
    this.bookSrv.getAllBookings().subscribe((res: any[]) => {
      this.allBookings = res;
      console.log(this.allBookings);
    });
  }
}
