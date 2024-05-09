import { NavbarService } from './../../../services/navbar.service';
import { BookService } from './../../../services/book.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit{
  addedBooks: any[]=[]
  
  constructor(private bookSrv:BookService, private router: Router, public nav:NavbarService , private toastr: ToastrService){}
  ngOnInit(): void {
    this.fetchAddedBooks();
    this.nav.show()
  }
  fetchAddedBooks(){
    this.bookSrv.getBooks().subscribe((data:any)=>{
      this.addedBooks=data;
    })
  }

  deleteBook(id:string){
    if(window.confirm('Do you want to delete this book?')){
      this.bookSrv.deleteBook(id).subscribe((data:any)=>{
        console.log('delete')
        this.toastr.info('Book Deleted Successfully',null ,{timeOut: 3000})
        this.fetchAddedBooks();

      })
    }
   
    
  }

  editBook(id: string){
    this.router.navigate(['/edit', id]);
  }
  

  

}
