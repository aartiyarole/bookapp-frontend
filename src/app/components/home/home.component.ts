import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  
  categories:any[]=[];
  fromCategory:string="";

  
  constructor( private bookSrv: BookService , private router:Router, public nav:NavbarService){
    this.getAllCategories();
}
ngOnInit() {
  this.nav.show()
}

  getAllCategories(){
    this.bookSrv.getAllCategories().subscribe((res:any)=>{
      this.categories=res;
    })
  }

  navigateToSearchPage(event: Event){
    event.preventDefault(); // This will prevent the default form submission
    if (this.fromCategory) {
      this.router.navigate(['/search',this.fromCategory])
    }
  }

}
