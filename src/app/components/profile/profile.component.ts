import { NavbarService } from './../../services/navbar.service';
import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{
  userEmail: string = '';
  userName:string='';
  userMobileNo:string='';
  bookedBooks: any = {
  "bookName": "",
  "categoryName":"",
  "checkOutDate": "",
  "returnDate": "",
  "totalRentCost": ""
  }
  

  constructor(private bookSrv: BookService,public nav:NavbarService) {
    const local = sessionStorage.getItem('BookUser');
    if (local != null) {
      this.loggedUserObj = JSON.parse(local);
      this.userEmail = this.loggedUserObj.emailId; 
      this.userName=this.loggedUserObj.name;
      this.userMobileNo=this.loggedUserObj.mobileNo;
      this.fetchBookedBooks();
    }
  }
  
ngOnInit() {
  this.nav.show()
}
  
  loggedUserObj:any;
  
  fetchBookedBooks() {
    this.bookSrv.getAllBookings().subscribe( (res: any[]) => {
      this.bookedBooks = res.filter( (booking) =>{
          return booking.userEmailId === this.loggedUserObj.emailId;
        }
    )
    console.log(this.bookedBooks)
  })
}



}

  
  

