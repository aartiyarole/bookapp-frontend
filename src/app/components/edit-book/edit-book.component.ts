import { NavbarService } from './../../services/navbar.service';
import { Component,OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,FormControl , Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.scss'
})
export class EditBookComponent implements OnInit{
  bookDetails:FormGroup;
  bookId: string;

  constructor(private bookSrv: BookService, private route: ActivatedRoute , private router:Router,public nav:NavbarService , private toastr: ToastrService) { }

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('id');
    this.bookDetails = new FormGroup({
      bookName: new FormControl('',Validators.required),
      categoryName: new FormControl('',Validators.required),
      categoryId:new FormControl('',Validators.required),
      price: new FormControl('',Validators.required),
      imageUrl:new FormControl('',Validators.required),
      availability: new FormControl('')
    });
    this.fetchAddedBook();
    this.nav.show()
  }
  
  
  fetchAddedBook() {
    this.bookSrv.getBook(this.bookId).subscribe((data: any) => {
      this.bookDetails.setValue({
        bookName: data.bookName,
        categoryName: data.categoryName,
        categoryId: data.categoryId,
        price: data.price,
        imageUrl:data.imageUrl,
        availability:data.availability
      });

    });
  }

  updateBookDetails() {
    const book={
    bookName: this.bookDetails.get('bookName').value,
    categoryName: this.bookDetails.get('categoryName').value,
    categoryId: this.bookDetails.get('categoryId').value,
    price: this.bookDetails.get('price').value,
    imageUrl: this.bookDetails.get('imageUrl').value,
    availability: this.bookDetails.get('availability').value
    };
    this.bookSrv.updateBook(this.bookId, book).subscribe(() => {
      console.log('update')
      this.toastr.success('Updated Successfully!!',null ,{timeOut: 3000})
      this.router.navigate(['/admin-dashboard'])
      
    });
  }

}
