import { NavbarService } from './../../services/navbar.service';
import { Component } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

  ourBooks: any[] = [];
  categoryId: string;
  categories: any[] = [];

  loggedUserObj: any = undefined;

  durationSaved: boolean = false;
  durationDays: number;

  bookingDuration: any = {
    "startDate": "",
    "endDate": ""
  }

  totalCost: number;
  
  bookingDetails: any = {
    "userName": "",
    "userEmailId": "",
    "bookName": "",
    "categoryName": "",
    "categoryId": "",
    "checkOutDate": "",
    "returnDate": "",
    "readDuration": "",
    "totalRentCost": "",
    "bookPicUrl": ""
  };



  constructor(private bookSrv: BookService, private activatedRoute: ActivatedRoute, private route : Router,public nav : NavbarService , private toastr: ToastrService) {

    this.activatedRoute.params.subscribe((res) => {
      console.log(res)
      this.categoryId = res.categoryId;
      console.log(this.categoryId)
    })

  }

  ngOnInit(): void {
    this.getBooks();
    this.getAllCategories();
    this.nav.show()

  }

  getAllCategories() {
    this.bookSrv.getAllCategories().subscribe((res: any) => {
      this.categories = res;
    });

  }

  getBooks() {
          this.bookSrv.getBooks().subscribe((res: any) => {
            this.ourBooks = res.filter((book) => {
              return book.categoryId == this.categoryId
            });
            console.log(this.ourBooks)
    }
    )
  }

  saveDuration() {

    console.log(this.bookingDuration)

    if (this.bookingDuration.startDate !== "" && this.bookingDuration.endDate !== "") {

      const today = new Date();
      today.setHours(0,0,0, 0);
      console.log(today)
      const start = new Date(this.bookingDuration.startDate)
      start.setHours(0,0,0, 0);
      console.log(start)
      const end = new Date(this.bookingDuration.endDate)
      end.setHours(0,0,0, 0);
      console.log(end)

      if (start >= today && end > start) {
        const timeDifferenceMs = end.getTime() - start.getTime();
        this.durationDays = parseFloat((timeDifferenceMs / (1000 * 60 * 60 * 24)).toFixed(0));
        console.log(this.durationDays)

        if (this.durationDays >= 2) {
          this.durationSaved = true;
          this.toastr.success("Booking Duration Saved",null ,{timeOut: 3000})
        } else {
          this.toastr.warning("Minimum duration should be 2 day",null ,{timeOut: 3000})
        }

      } else {
        this.toastr.error("Date is not correct",null ,{timeOut: 3000})
      }

    } else {
      this.toastr.error("Details not filled",null ,{timeOut: 3000})
    }

  }

  

  makeBooking(book: any) {
    if (!book.availability) {
      this.toastr.info("This book is currently not available.",null ,{timeOut: 3000});
      return;
    }


    const local = sessionStorage.getItem('BookUser');
    if (local != null) {
      this.loggedUserObj = JSON.parse(local);
      
    }
    else {
      this.loggedUserObj = undefined;
    }

    console.log(book)

    

    if (this.loggedUserObj != undefined) {

      console.log("working")

      if (this.durationSaved) {
        this.bookingDetails = this.getBookingDetails(book);
        console.log(this.bookingDetails)
        this.showBookingDetails();

      } else {
        this.toastr.warning("Duration not filled",null ,{timeOut: 3000})
      }
    }

    else if (this.loggedUserObj == undefined) {
      this.toastr.warning("Please Login to Proceed",null ,{timeOut: 3000})
    }
  }


  getBookingDetails(book) {
    this.totalCost = Math.round(parseInt(book.price) * this.durationDays);

    const bookingSummary: any = {
      "userName": this.loggedUserObj.name,
      "userEmailId": this.loggedUserObj.emailId,
      "bookName": book.bookName,
      "categoryName": book.categoryName,
      "categoryId": book.categoryId,
      "checkOutDate": this.bookingDuration.startDate,
      "returnDate": this.bookingDuration.endDate,
      "readDuration": this.durationDays,
      "totalRentCost": this.totalCost,
      "bookPicUrl": book.imageUrl
    }
    return bookingSummary;
    
  }

  showBookingDetails() {
    const modal = document.getElementById("bookingModal");
    if (modal != null) {
      modal.style.display = "block";
    }
  }
  closeBookingDetails() {
    const modal = document.getElementById("bookingModal");
    if (modal != null) {
      modal.style.display = "none";
    }
  }

  paymentDone() {
    this.bookSrv.sendBookingDetails(this.bookingDetails).subscribe((res) => {
      this.toastr.success("Rental Confirmed!!!",null ,{timeOut: 3000})
      this.closeBookingDetails();
      this.route.navigate(['/user-profile'])
    })
  }


}

