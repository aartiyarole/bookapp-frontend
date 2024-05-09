import { NavbarService } from './../../services/navbar.service';
import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl:'./about.component.scss'
})
export class AboutComponent implements OnInit{
  constructor(public nav: NavbarService){}
  
ngOnInit() {
  this.nav.show()
}

}
