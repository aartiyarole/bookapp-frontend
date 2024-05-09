import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class BookService {
  apiEndPoint:string ='http://localhost:8000'; //property

  constructor( private http: HttpClient) { }

  
  registerUser(obj:any){
    return this.http.post(this.apiEndPoint+'/user', obj)
  }

  getRegister(){
    return this.http.get(this.apiEndPoint+'/user') 
  }
  
  addBook(obj:any){
    return this.http.post(this.apiEndPoint+'/books', obj);
  }
  
  getBook(id: string){
    return this.http.get(this.apiEndPoint+'/books/'+id);
  }
  
  getBooks(){
    return this.http.get(this.apiEndPoint+'/books')
  }

  updateBook(id:string,book:any){
    return this.http.put(this.apiEndPoint+'/books/'+id,book)
  }
  deleteBook(id:string){
    return this.http.delete(this.apiEndPoint+'/books/'+id);
  }

  getAllCategories(){
    return this.http.get(this.apiEndPoint+'/category')
  }
  
  sendBookingDetails(obj:any){
    return this.http.post(this.apiEndPoint+'/booking', obj)
  }

  getAllBookings(){
    return this.http.get(this.apiEndPoint+'/booking')
  }

  sendFeedBacks(obj:any){
    return this.http.post(this.apiEndPoint+'/feedback', obj)
  }

  getUserFeedBacks(){
    return this.http.get(this.apiEndPoint+'/feedback')
  }


}
