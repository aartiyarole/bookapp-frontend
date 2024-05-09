import { Router } from '@angular/router';
import { NavbarService } from './../../services/navbar.service';
import { BookService } from './../../services/book.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder,Validators} from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit{
  
  constructor(private fb:FormBuilder, private bookSrv :  BookService , public nav: NavbarService,private route:Router, private toastr: ToastrService){

  }
  
ngOnInit() {
  this.nav.show()
}

  feedbackDetails=this.fb.group({
    name:['',[Validators.required,Validators.pattern(/^[a-zA-z\s]*$/)]],
    emailId:['',[Validators.required,Validators.email]],
    message:['',[Validators.required]]
  })
  
  submitContactUs() {
    if (this.feedbackDetails.valid) {
      this.bookSrv.sendFeedBacks(this.feedbackDetails.value).subscribe(
        response => { 
          this.toastr.success("Your Message is submitted!!!",null ,{timeOut: 3000})
          console.log('Success!', response);
          this.feedbackDetails.reset()
          this.route.navigate(['/home'])
      }
      )
    }
  }
  
}
