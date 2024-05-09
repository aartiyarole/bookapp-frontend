import { NavbarService } from './services/navbar.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder,Validators} from '@angular/forms'
import { BookService } from './services/book.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Book-Rental-App';
  
  constructor( private bookSrv : BookService, private fb:FormBuilder ,private router: Router , public nav: NavbarService , private toastr: ToastrService){
    
    const local = sessionStorage.getItem('BookUser');
    if(local != null){
      this.loggedUserObj = JSON.parse(local);
    }  
    
  }

  registerObj=this.fb.group({
    name:['',[Validators.required,Validators.pattern(/^[a-zA-z\s]*$/)]],
    emailId:['',[Validators.required,Validators.email]],
    mobileNo:['',[Validators.required,Validators.pattern('^\\d{10}$')]],
    password:['',[Validators.required,Validators.pattern(/(?=.*\d)(?=.*[@$!%*#?&])(?=.*[a-z])(?=.*[A-Z]).{6,}/)]]
  })
  
  postRegisterObj:any;

  loginObj:any={ 
    "emailId":"", 
    "password":"" 
  }


  loggedUserObj:any;

  // Registration

  onRegister(){
    
    this.postRegisterObj=this.registerObj.value;
    this.bookSrv.getRegister().subscribe(
      (res:any)=>{
      const user = res.find((a:any)=>{
        return a.emailId===this.postRegisterObj.emailId ;
      })

      if (!user){
        this.bookSrv.registerUser(this.postRegisterObj).subscribe((res:any)=>{
          this.registerReset();
          this.closeRegister();
          this.toastr.success("Registered Successfully !!!",null ,{timeOut: 3000})
          this.openLogin();
       })
      }
      else{
        this.toastr.error("User already exist",null ,{timeOut: 3000})
        this.registerReset();
      } 
    }) 
  }

    registerReset(){
       this.registerObj.reset();
    }
  
  //Login
  onLogin(){

    this.bookSrv.getRegister().subscribe(
      (res:any)=>{
      const user = res.find((a:any)=>{
        return a.emailId===this.loginObj.emailId && a.password ===this.loginObj.password ; 
      })
      console.log('user')

      if (user){
        if(user.emailId==='admin@gmail.com' && user.password==='Admin@123'){
          user.isAdmin=true;
          this.router.navigate(['admin-dashboard'])
        }
        else{
          this.router.navigate(['home'])
        }

      sessionStorage.setItem('BookUser',JSON.stringify(user));
      this.loggedUserObj=user;
      this.closeLogin();
      this.toastr.success("Welcome Back !!!",null ,{timeOut: 3000})
   

    }
      else{
        this.toastr.error("Password doesn't match or User not Found. Please Register",null ,{timeOut: 3000})
        this.closeLogin();
      }
      this.loginReset();
    }
    )
  
  }

  loginReset(){
    this.loginObj={
      "emailId":"",      
      "password":"" 
    }
  }

  logOff(){
    sessionStorage.removeItem('BookUser');
    this.router.navigate(['home']);
    this.loggedUserObj=undefined;
    this.postRegisterObj=null;
  }

  // Register Popup
  openRegister(){
    this.closeLogin()
    const modal = document.getElementById('registerModal');
    if(modal !=null){ 
      modal.style.display = 'block';
    }
    
  }

  closeRegister(){
    const modal=document.getElementById('registerModal');
    if(modal !=null){
      modal.style.display = 'none';
    }
    this.registerReset()
  }


  // Login popup

  openLogin(){
    this.closeRegister()
    const modal = document.getElementById('loginModal');
    if(modal !=null){ 
      modal.style.display = 'block';
    }
    
  }

  closeLogin(){
    const modal=document.getElementById('loginModal');
    if(modal !=null){
      modal.style.display = 'none';
    }
    this.loginReset()
  }


  
}
