import { Router } from '@angular/router';
import { NavbarService } from './../../services/navbar.service';
import { BookService } from './../../services/book.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder,Validators} from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
  
  constructor(private fb:FormBuilder, private bookSrv :  BookService , public nav: NavbarService, private router: Router , private toastr: ToastrService){

  }
  
  ngOnInit() {
    this.nav.show()
  }

  bookDetails=this.fb.group({
    bookName:['',[Validators.required]],
    categoryName:['',[Validators.required]],
    categoryId:['',[Validators.required]],
    price:['',[Validators.required]],
    imageUrl:['',[Validators.required]],
    availability:['',[Validators.required]]
  })
  
  submitBookDetails() {
    if (this.bookDetails.valid) {
      this.bookSrv.addBook(this.bookDetails.value).subscribe(
        response => { 
          console.log('Success!', response);
          this.toastr.success('Book Added Successfully',null ,{timeOut: 3000})
          this.router.navigate(['/admin-dashboard'])
        }
      )
    }
  }


}
